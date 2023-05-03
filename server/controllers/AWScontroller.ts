// Imports
import { Express, Request, Response, NextFunction } from 'express';
import AWS from 'aws-sdk';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import * as dotenv from 'dotenv';

// Types Imports
import { CredentialsInterface, LogGroupsInterface, ParamsInterface, Metrics, MetricDataResponse, ErrorParamsInterface, ErrorData, MetricDataQueriesInterface } from '../types.js';

dotenv.config();

//TYPING FOR ENV FILE
declare let process: {
  env: {
    accessKeyId: string;
    secretAccessKey: string;
    mongoKey: string;
  };
};

// OUR PROJECT'S AWS USER CREDENTIALS
const credentials = new AWS.Credentials({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

// STS CLIENT TO ASSUME ROLE
const client = new STSClient({ region: 'us-east-2', credentials: credentials }); 

// GET METRICS MIDDLEWARE
const getMetrics = async (req: Request, res: Response, next: NextFunction) => {
  const { region, arn } = res.locals.user;
  const { timeframe, increment } = req.params;
  let period: number;

  // Period is dynamic for input timeframe/increment
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

  let userCredentials;
  let cloudwatchlogs: any;
  
  try {
    const input = {
      RoleArn: arn, // required
      RoleSessionName: 'test', // required
      DurationSeconds: 900,
    };

    // Assumes a role for access to AWS
    const command = new AssumeRoleCommand(input);
    const {Credentials: {AccessKeyId, SecretAccessKey, SessionToken}} = (await client.send(command)) as CredentialsInterface;
    
    // Updates Credentials using response from AWS
    userCredentials = new AWS.Credentials({
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretAccessKey,
      sessionToken: SessionToken,
    });

    // Ensure that the user is able to connect to their Cloudwatch service
    cloudwatchlogs = new AWS.CloudWatchLogs({
      region: region,
      credentials: userCredentials,
    });

  } catch (err) {
    // If ARN is invalid, badArn : true is sent as server response 
    res.locals.badArn = true;
    return res.json(res.locals);
  }

  // Get names of all existing Lambda functions
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

  const params = {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    MetricDataQueries: new Array(), // Will hold array of query objects for each function 
    StartTime: new Date(Date.now() - Number(timeframe)), //date.now() - timeframe(in milliseconds)
    EndTime: new Date(),
    ScanBy: 'TimestampAscending',
    MaxDatapoints: 10,
  };

  const addQuery = (func: string) => {
    const metricStats = { // Format of statistics to be gathered from Cloudwatch
      Invocations: 'Sum',
      Duration: 'Average',
      Errors: 'Sum',
      Throttles: 'Sum'
    }

    // For each function, the following query will be added for as many stats as we need
    for (const [metric, stat] of Object.entries(metricStats)) {
      params.MetricDataQueries.push({
        Id: metric.toLowerCase() + func.replace(/[^A-Za-z0-9]/g, ""),
        Label: `${func} ${metric}`,

        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: metric,
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func,
              },
            ],
          },
          Period: period, //period// seconds
          Stat: stat,
        } ,
      } as MetricDataQueriesInterface)
    }
  };

  const metrics = {} as Metrics; // Will hold the metrics info to return to frontend

  // Return nofunc to front-end if account/ARN has no functions
  if (functions.length === 0) {
    res.locals.nofunc = true;
    return res.json(res.locals);
  }
  functions.forEach((el: string) => {
    addQuery(el); // See helper function above
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

    // Parsing and inserting metric data into Metrics object
    MetricDataResults.forEach((el) => {
      if (el.Values.length) {
        const func = el.Label.split(' ')[0];
        const metric = el.Label.split(' ')[1];

        metrics[func][metric].values = [...metrics[func][metric].values, ...el.Values];
        metrics[func][metric].timestamps = [...metrics[func][metric].timestamps, ...el.Timestamps];
      }
    });

    if (NextToken) { //If there is more data to be collected, NextToken is returned and therefore we recursively call getMetricData until there is no more data to collect
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

  const input = {
    RoleArn: arn, // required
    RoleSessionName: 'test', // required
    DurationSeconds: 900,
  };
  // Assumes a role for access to AWS
  const command = new AssumeRoleCommand(input);
  const {Credentials : { AccessKeyId, SecretAccessKey, SessionToken }} = (await client.send(command)) as CredentialsInterface;

  const userCredentials = new AWS.Credentials({
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretAccessKey,
    sessionToken: SessionToken,
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
