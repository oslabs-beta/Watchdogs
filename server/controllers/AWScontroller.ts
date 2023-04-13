// Imports
import AWS from 'aws-sdk'
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts'

// Interfaces
interface CredentialsInterface {
  Credentials: {
    AccessKeyId: string
    SecretAccessKey: string
    SessionToken: string
  }
}

interface LogGroupsInterface {
  logGroups: Array<LogGroup>
}

interface LogGroup {
  logGroupName: string
}

interface ParamsInterface {
  MetricDataQueries: Array<MetricDataQueriesInterface>
  StartTime: Date
  EndTime: Date
  ScanBy: string
  MaxDatapoints: number
  NextToken?: string
}

interface MetricDataQueriesInterface {
  Id: string
  MetricStat: {
    Metric: {
      Namespace: string
      MetricName: string
      Dimensions: [
        {
          Name: string,
          Value: string
        }
      ]
    }
    Period: number
    Stat: string
  }
}

interface Metrics {
  [key: string] : {
    [key: string]: MetricValues
  }
}

interface MetricValues {
  values: Array<number> 
  timestamps: Array<string>
}

interface MetricDataResponse {
  MetricDataResults: Array<MetricData>
  NextToken: string
}

interface MetricData{
      Id: string,
      Label: string
      Timestamps: Array<string>,
      Values: Array<number>,
      StatusCode: string
      Messages: Array<string>
}

//CLIENT'S REGION
const REGION = "us-east-2";
//OUR PROJECT'S AWS USER CREDENTIALS
const credentials = new AWS.Credentials({
  accessKeyId: 'AKIAXA4JSMQSTQ35WVVW',
  secretAccessKey: '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'
});
//STS CLIENT TO ASSUME ROLE
const client = new STSClient({ region: REGION, credentials: credentials });

const doStuff = async () => {
  const input = {
    RoleArn: "arn:aws:iam::482935464997:role/test_role", // required
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
    region: REGION, 
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
    region: REGION, 
    credentials: userCredentials,
  });

  const addQuery = (func: string) => {
    params.MetricDataQueries.push(
      { 
        Id: `${func}Invocations`, 

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
        Id: `${func}Duration`,

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
        Id: `${func}Errors`,

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
        Id: `${func}Throttles`,

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

  return await getMetricData(params);
}

// async function main() {
//   const allMetrics = await doStuff();
//   console.log(JSON.stringify(allMetrics, null, 2));
// }
// main();

export {doStuff}
