// Props
export type FunctionsListProps = {
  user: UserDataType;
  metrics: MetricType;
  loading: boolean;
  getUserInfo: () => void;
  refreshInfo: () => void;
};

export type FunctionProps = {
  functionName: string;
  functionData: {
    [metric: string]: {
      timestamps: Array<string>;
      values: Array<number>;
    };
  };
  user: UserDataType;
};

export type ChartProps = {
  data: {
    [metric: string]: {
      timestamps: Array<string>;
      values: Array<number>;
    };
  };
};

export type UserInfoProps = {
  user: UserDataType;
  loading: boolean;
  setUser: (arg0: { arn: string; region: string; password: string; username: string; __v: number; _id: string }) => void;
  setLoading: (arg0: boolean) => void;
  setMetrics: (arg0: any) => void;
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
}

//Responses
export type ResponseDataType = {
  user: UserDataType;
  metrics: MetricType;
  badArn?: boolean;
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
export interface ErrorData {
  logStreamName?: string
  timestamp?: number
  message?: string
  ingestionTime?: number
  eventId?: string
}

// Particle
// type Particle = {
//     number: {
//         value: number;
//         density: {
//         enable: boolean;
//         value_area: number;
//         };
//     };
//     color: {
//         value: string;
//     };
//     shape: {
//         type: string;
//         stroke: {
//         width: number;
//         color: string;
//         };
//         polygon: {
//         nb_sides: number;
//         };
//         image: {
//         src: string;
//         width: number;
//         height: number;
//         };
//     };
//     opacity: {
//         value: number;
//         random: boolean;
//         anim: {
//         enable: boolean;
//         speed: number;
//         opacity_min: number;
//         sync: boolean;
//         };
//     };
//     size: {
//         value: number;
//         random: boolean;
//         anim: {
//         enable: boolean;
//         speed: number;
//         size_min: number;
//         sync: boolean;
//         };
//     };
//     line_linked: {
//         enable: boolean;
//         distance: number;
//         color: string;
//         opacity: number;
//         width: number;
//     };
//     move: {
//         enable: boolean;
//         speed: number;
//         direction: string;
//         random: boolean;
//         straight: boolean;
//         out_mode: string;
//         bounce: boolean;
//         attract: {
//         enable: boolean;
//         rotateX: number;
//         rotateY: number;
//         };
//     };
// }

// type Interactivity = {
//     detect_on: string;
//     events: {
//         onhover: {
//         enable: boolean;
//         mode: string;
//         };
//         onclick: {
//         enable: boolean;
//         mode: string;
//         };
//         resize: boolean;
//     };
//     modes: {
//         grab: {
//         distance: number;
//         line_linked: {
//             opacity: number;
//         };
//         };
//         bubble: {
//         distance: number;
//         size: number;
//         duration: number;
//         opacity: number;
//         speed: number;
//         };
//         repulse: {
//         distance: number;
//         duration: number;
//         };
//         push: {
//         particles_nb: number;
//         };
//         remove: {
//         particles_nb: number;
//         };
//     };
// }

// export type TSParticles = {
//     particles: Particle;
//     interactivity: Interactivity;
//     retina_detect: boolean;
// }
