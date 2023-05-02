import {ObjectId} from 'mongoose'

// Interfaces
export type CredentialsInterface = {
    Credentials: {
        AccessKeyId: string;
        SecretAccessKey: string;
        SessionToken: string;
    };
}
  
export type LogGroupsInterface = {
    logGroups: LogGroup[];
}

export type LogGroup = {
    logGroupName: string;
}

export type ParamsInterface = {
    MetricDataQueries: MetricDataQueriesInterface[];
    StartTime: Date;
    EndTime: Date;
    ScanBy: string;
    MaxDatapoints: number;
    NextToken?: string;
}

export type ErrorParamsInterface = {
    logGroupName: string;
    filterPattern: string;
    startTime: number;
    endTime: number;
    nextToken?: string;
}

export type MetricDataQueriesInterface = {
    Id: string;
    MetricStat: {
        Metric: {
            Namespace: string;
            MetricName: string;
            Dimensions: [
                    {
                    Name: string;
                    Value: string;
                    }
                ]
        }
        Period: number;
        Stat: string;
    };
}

export type Metrics = {
    [key: string] : {
        [key: string]: MetricValues
    };
}

export type MetricValues = {
    values: number[];
    timestamps: string[];
}

export type MetricDataResponse = {
    MetricDataResults: MetricData[];
    NextToken: string;
}
  
export type MetricData = {
    Id: string;
    Label: string;
    Timestamps: string[];
    Values: number[];
    StatusCode: string;
    Messages: string[];
}

export type ErrorData = {
    logStreamName?: string;
    timestamp?: number;
    message?: string;
    ingestionTime?: number;
    eventId?: string;
}

export type GlobalErrorType = {
    log: string;
    status: number;
    message: {
        err: string
    };
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