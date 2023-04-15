// Imports
import AWS from 'aws-sdk';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import * as dotenv from 'dotenv';
import {Express, Request, Response, NextFunction} from 'express';

import { CredentialsInterface, LogGroupsInterface, ParamsInterface, Metrics, MetricDataResponse } from './types.js';

dotenv.config();

//TYPING FOR ENV FILE
declare let process : {
  env: {
      accessKeyId: string
      secretAccessKey: string
  }
}

//OUR PROJECT'S AWS USER CREDENTIALS

const credentials = new AWS.Credentials({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});

//STS CLIENT TO ASSUME ROLE
const client = new STSClient({ region: 'us-east-2', credentials: credentials });

const getMetrics = async (req: Request, res: Response, next: NextFunction) => {

  const { region, arn } = res.locals.user

  const input = {
    RoleArn: arn, // required
    RoleSessionName: "test", // required
    DurationSeconds: 900,
  };

  const command = new AssumeRoleCommand(input);

  const response = await client.send(command) as CredentialsInterface;

  const userCredentials = new AWS.Credentials({
    accessKeyId: response.Credentials.AccessKeyId,
    secretAccessKey: response.Credentials.SecretAccessKey,
    sessionToken: response.Credentials.SessionToken,
  })

  const cloudwatchlogs = new AWS.CloudWatchLogs({ 
    region: region, 
    credentials: userCredentials,
  });

  async function getFunctions() {
    const { logGroups } = await cloudwatchlogs.describeLogGroups({logGroupNamePrefix:'/aws/lambda'}).promise() as LogGroupsInterface;
    const lambdaFunctions = logGroups.map(el => el.logGroupName.replace('/aws/lambda/', ''));
    return lambdaFunctions;
  }

  const functions = await getFunctions();
  console.log(functions);

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
            Namespace: "AWS/Lambda",
            MetricName: "Invocations",
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func
              },
            ]
          },
          Period: 60, // seconds
          Stat: "Sum", 
        },
      },
      {
        Id: `duration` + func.replaceAll('-', ''),
        Label: `${func} Duration`,

        MetricStat: {
          Metric: {
            Namespace: "AWS/Lambda",
            MetricName: "Duration",
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func
              },
            ]
          },
          Period: 60, // seconds
          Stat: "Average",
        },
      },
      {
        Id: `errors` + func.replaceAll('-', ''),
        Label: `${func} Errors`,

        MetricStat: {
          Metric: {
            Namespace: "AWS/Lambda",
            MetricName: "Errors",
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func
              },
            ]
          },
          Period: 60, // seconds
          Stat: "Sum", 
        },
      },
      {
        Id: `throttles` + func.replaceAll('-', ''),
        Label: `${func} Throttles`,

        MetricStat: {
          Metric: {
            Namespace: "AWS/Lambda",
            MetricName: "Throttles",
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: func
              },
            ]
          },
          Period: 60, // seconds
          Stat: "Sum", 
        },
      }
    )
  }

  const params = {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    MetricDataQueries: new Array(),
    StartTime: new Date(Date.now() - 1200000), //milliseconds
    EndTime: new Date(),
    ScanBy: "TimestampAscending",
    MaxDatapoints: Number("10"),
  };

  const metrics = {} as Metrics

  functions.forEach((el: string) => {
    addQuery(el);
    metrics[el] = {
      Invocations: {
        values: [], timestamps: []
      },
      Duration: {
        values: [], timestamps: []
      },
      Errors: {
        values: [], timestamps: []
      },
      Throttles: {
        values: [], timestamps: []
      }
    };
  })

  async function getMetricData(params: ParamsInterface) {
    const {MetricDataResults, NextToken} = await cloudwatch.getMetricData(params).promise() as unknown as MetricDataResponse;

    MetricDataResults.forEach(el => {
      if (el.Values.length) {
        const func = el.Label.split(' ')[0];
        const metric = el.Label.split(' ')[1];

        metrics[func][metric].values = [...metrics[func][metric].values, ...el.Values];
        metrics[func][metric].timestamps = [...metrics[func][metric].timestamps, ...el.Timestamps];
      }
    })

    if (NextToken) {
        params.NextToken = NextToken;
        await getMetricData(params);
    }
    return metrics;
  }

  res.locals.metrics = await getMetricData(params);
  return next();
}


export {getMetrics}
