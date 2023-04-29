// Imports
import AWS from 'aws-sdk';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import * as dotenv from 'dotenv';
import { Express, Request, Response, NextFunction } from 'express';

import { CredentialsInterface, LogGroupsInterface, ParamsInterface, Metrics, MetricDataResponse, ErrorParamsInterface, ErrorData } from './types.js';

dotenv.config();

//TYPING FOR ENV FILE
declare let process: {
  env: {
    accessKeyId: string;
    secretAccessKey: string;
    mongoKey: string;
  };
};

//OUR PROJECT'S AWS USER CREDENTIALS

const credentials = new AWS.Credentials({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

//STS CLIENT TO ASSUME ROLE
const client = new STSClient({ region: 'us-east-2', credentials: credentials });

// GET METRICS MIDDLEWARE
const getMetrics = async (req: Request, res: Response, next: NextFunction) => {
  console.log('getting metrics');
  const { region, arn } = res.locals.user;
  const { timeframe, increment } = req.params;
  let period: number;

  switch (increment) {
    case '10min':
      period = 600;
      break;
    case '30min':
      period = 1800;
      break;
    case '1hr':
      period = 3600;
      break;
    case '3hr':
      period = 10800;
      break;
    case '6hr':
      period = 21600;
      break;
    case '12hr':
      period = 43200;
      break;
    case '1d':
      period = 86400;
      break;
  }

  // switch (timeframe) {
  //   case 'three-hour':
  //     timeframems = 10800000;
  //     break;
  //   case 'twelve-hour':
  //     timeframems = 43200000;
  //     break;
  //   case 'one-day':
  //     timeframems = 86400000;
  //     break;
  //   case 'one-week':
  //     timeframems = 604800000;
  //     break;
  //   case 'one-month':
  //     timeframems = 2628000000;
  //     break;
  // }

  const input = {
    RoleArn: arn, // required
    RoleSessionName: 'test', // required
    DurationSeconds: 900,
  };

  let userCredentials;
  let cloudwatchlogs: any;

  try {
    const command = new AssumeRoleCommand(input);

    const response = (await client.send(command)) as CredentialsInterface;

    userCredentials = new AWS.Credentials({
      accessKeyId: response.Credentials.AccessKeyId,
      secretAccessKey: response.Credentials.SecretAccessKey,
      sessionToken: response.Credentials.SessionToken,
    });

    cloudwatchlogs = new AWS.CloudWatchLogs({
      region: region,
      credentials: userCredentials,
    });
  } catch (err) {
    res.locals.badArn = true;
    return res.json(res.locals);
  }

  async function getFunctions() {
    const { logGroups } = (await cloudwatchlogs.describeLogGroups({ logGroupNamePrefix: '/aws/lambda' }).promise()) as LogGroupsInterface;
    const lambdaFunctions = logGroups.map((el) => el.logGroupName.replace('/aws/lambda/', ''));
    return lambdaFunctions;
  }

  const functions = await getFunctions();

  const cloudwatch = new AWS.CloudWatch({
    region: region,
    credentials: userCredentials,
  });

  const addQuery = (func: string) => {
    params.MetricDataQueries.push(
      {
        Id: `invocations` + func.replaceAll('-', ''),
        Label: `${func} Invocations`,

        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Invocations',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func,
              },
            ],
          },
          Period: period, //period// seconds
          Stat: 'Sum',
        },
      },
      {
        Id: `duration` + func.replaceAll('-', ''),
        Label: `${func} Duration`,

        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Duration',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func,
              },
            ],
          },
          Period: period, // seconds
          Stat: 'Average',
        },
      },
      {
        Id: `errors` + func.replaceAll('-', ''),
        Label: `${func} Errors`,

        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Errors',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func,
              },
            ],
          },
          Period: period, // seconds
          Stat: 'Sum',
        },
      },
      {
        Id: `throttles` + func.replaceAll('-', ''),
        Label: `${func} Throttles`,

        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Throttles',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func,
              },
            ],
          },
          Period: period, // seconds
          Stat: 'Sum',
        },
      }
    );
  };

  const params = {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    MetricDataQueries: new Array(),
    StartTime: new Date(Date.now() - Number(timeframe)), //date.now() - timeframe(in milliseconds)
    EndTime: new Date(),
    ScanBy: 'TimestampAscending',
    MaxDatapoints: 10,
  };

  const metrics = {} as Metrics;

  if (functions.length === 0) {
    res.locals.nofunc = true;
    return res.json(res.locals);
  }
  functions.forEach((el: string) => {
    addQuery(el);
    metrics[el] = {
      Invocations: {
        values: [],
        timestamps: [],
      },
      Duration: {
        values: [],
        timestamps: [],
      },
      Errors: {
        values: [],
        timestamps: [],
      },
      Throttles: {
        values: [],
        timestamps: [],
      },
    };
  });

  async function getMetricData(params: ParamsInterface) {
    const { MetricDataResults, NextToken } = (await cloudwatch.getMetricData(params).promise()) as unknown as MetricDataResponse;

    MetricDataResults.forEach((el) => {
      if (el.Values.length) {
        const func = el.Label.split(' ')[0];
        const metric = el.Label.split(' ')[1];

        metrics[func][metric].values = [...metrics[func][metric].values, ...el.Values];
        metrics[func][metric].timestamps = [...metrics[func][metric].timestamps, ...el.Timestamps];
      }
    });

    if (NextToken) {
      params.NextToken = NextToken;
      await getMetricData(params);
    }
    return metrics;
  }
  try {
    res.locals.metrics = await getMetricData(params);
    return next();
  } catch (err) {
    return next({
      log: 'Error in AWSController getMetrics middleware.',
      status: 500,
      message: err,
    });
  }
};

//GET ERRORS MIDDLEWARE
const getErrors = async (req: Request, res: Response, next: NextFunction) => {
  const { region, arn, func, timeframe } = req.body;

  // let timeframems: number;
  // if (timeframe==='three-hour') return timeframems = 10800000;
  // else if (timeframe==='twelve-hour') return timeframems = 43200000;
  // else if (timeframe==='one-day') return timeframems = 86400000;
  // else if (timeframe==='one-week') return timeframems = 604800000;
  // else if (timeframe==='one-month') return timeframems = 2628000000;

  // let timeframems: number;

  // switch (timeframe) {
  //   case 'three-hour':
  //     timeframems = 600;
  //     break;
  //   case 'twelve-hour':
  //     timeframems = 43200000;
  //     break;
  //   case 'one-day':
  //     timeframems = 86400000;
  //     break;
  //   case 'one-week':
  //     timeframems = 604800000;
  //     break;
  //   case 'one-month':
  //     timeframems = 2628000000;
  //     break;
  // }

  const input = {
    RoleArn: arn, // required
    RoleSessionName: 'test', // required
    DurationSeconds: 900,
  };

  const command = new AssumeRoleCommand(input);
  const response = (await client.send(command)) as CredentialsInterface;

  const userCredentials = new AWS.Credentials({
    accessKeyId: response.Credentials.AccessKeyId,
    secretAccessKey: response.Credentials.SecretAccessKey,
    sessionToken: response.Credentials.SessionToken,
  });

  const cloudwatchlogs = new AWS.CloudWatchLogs({
    region: region,
    credentials: userCredentials,
  });

  const errorParams = {
    logGroupName: `/aws/lambda/${func}`,
    filterPattern: 'ERROR',
    startTime: Date.now() - Number(timeframe), //this is in milliseconds
    endTime: Date.now(),
  };

  const errorList: ErrorData[] = [];

  async function getErrorLogs(params: ErrorParamsInterface) {
    const errors = await cloudwatchlogs.filterLogEvents(params).promise();
    errors.events?.forEach((event) => errorList.push(event));

    if (errors.nextToken) {
      params.nextToken = errors.nextToken;
      await getErrorLogs(params);
    }
    return errorList;
  }
  try {
    res.locals.errors = await getErrorLogs(errorParams);
    return next();
  } catch (err) {
    return next({
      log: 'Error in AWSController getErrors middleware.',
      status: 500,
      message: err,
    });
  }
};

export { getMetrics, getErrors };
