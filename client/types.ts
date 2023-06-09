// Props
export type FunctionsListProps = {
  user: UserDataType;
  metrics: MetricType;
  loading: boolean;
  timeframe: string;
  refreshMetrics: () => void;
  setIncrement: (arg0: string) => void;
  setTimeframe: (arg0: string) => void;
  incrementOptions: string[];
  period: number;
  unit: false | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | undefined;
  nofunc: boolean;
  dropdownOptions: SelectedFuncs[];
};

export type FunctionProps = {
  id: string;
  functionName: string;
  functionData: {
    [metric: string]: {
      timestamps: Array<string>;
      values: Array<number>;
    };
  };
  user: UserDataType;
  timeframe: string;
  period: number;
  unit: false | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | undefined;
};

export type ChartProps = {
  functionName: string;
  data: {
    [metric: string]: {
      timestamps: Array<string>;
      values: Array<number>;
    };
  };
  timeframe: string;
  period: number;
  unit: false | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | undefined;
};

export type PieChartProps = {
  metrics: MetricType;
  nofunc: boolean;
};

export type UserInfoProps = {
  user: UserDataType;
  loading: boolean;
  setUser: (arg0: { arn: string; region: string; password: string; username: string; __v: number; _id: string }) => void;
  setLoading: (arg0: boolean) => void;
  setMetrics: (arg0: MetricType) => void;
};

//User Data
export type UserDataType = {
  arn: string;
  region: string;
  password: string;
  username: string;
  __v: number;
  _id: string;
};

// Metric
export type MetricType = {
  [func: string]: {
    [metric: string]: {
      timestamps: Array<string>;
      values: Array<number>;
    };
  };
};

// Request Bodies
export type LoginBodyType = {
  password: string;
  username: string;
};

export type SignupBodyType = {
  arn: string;
  region: string;
  password: string;
  username: string;
};

export type ArnBodyUpdateType = {
  arn: string;
  region: string;
  username: string;
};

export type ErrorBodyType = {
  region: string;
  arn: string;
  func: string;
};

//Responses
export type ResponseDataType = {
  user: UserDataType;
  metrics: MetricType;
  badArn?: boolean;
  nofunc?: boolean;
};

export type LoginResponseType = {
  user: UserDataType;
  match: boolean;
};

// Signup Error
export type SignupErrorType = {
  code: number;
  index: number;
  keyPattern: {
    username: number;
  };
  keyValue: {
    username: string;
  };
};

//Error Log Response
export type ErrorData = {
  logStreamName?: string;
  timestamp?: number;
  message?: string;
  ingestionTime?: number;
  eventId?: string;
}

export type SelectedFuncs = {
  value: string;
  label: string;
};

