import {ObjectId} from 'mongoose'

// Interfaces
export interface CredentialsInterface {
    Credentials: {
      AccessKeyId: string
      SecretAccessKey: string
      SessionToken: string
    }
}
  
export interface LogGroupsInterface {
logGroups: Array<LogGroup>
}

export interface LogGroup {
logGroupName: string
}

export interface ParamsInterface {
MetricDataQueries: Array<MetricDataQueriesInterface>
StartTime: Date
EndTime: Date
ScanBy: string
MaxDatapoints: number
NextToken?: string
}

export interface ErrorParamsInterface {
    logGroupName: string
    filterPattern: string
    startTime: number
    endTime: number
    nextToken?: string
}

export interface MetricDataQueriesInterface {
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

export interface Metrics {
[key: string] : {
    [key: string]: MetricValues
}
}

export interface MetricValues {
values: Array<number> 
timestamps: Array<string>
}

export interface MetricDataResponse {
MetricDataResults: Array<MetricData>
NextToken: string
}
  
export interface MetricData{
    Id: string,
    Label: string
    Timestamps: Array<string>,
    Values: Array<number>,
    StatusCode: string
    Messages: Array<string>
}

export interface ErrorData {
    logStreamName?: string
    timestamp?: number
    message?: string
    ingestionTime?: number
    eventId?: string
}

export interface GlobalErrorType {
    log: string,
    status: number,
    message: {
        err: string
    }
}

export type UserDataType = {
  arn: string;
  region: string;
  password: string;
  username: string;
  __v?: number | undefined;
  ObjectId?: ObjectId;
};

export type ReqDataType = {
    arn: string;
    region: string;
    password: string;
    username: string;
  };