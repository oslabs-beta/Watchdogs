// React Imports
import React, { useState, useEffect } from 'react';

// Component Imports
import Function from './Function';

// Type Declarations
type UserProps = {
  user: {
    username: string;
    arn: string;
    _id: string;
  };
};
/*
-For testing, create a nested object to reflect aws data and then parse/prop drill the 'functions' to
their own function component
-
*/
const testResponse = {
  function1: {
      invocationsData: [
        {date: "2011-10-01", value: 62.7},
        {date: "2011-10-02", value: 59.9},
        {date: "2011-10-03", value: 59.1},
        {date: "2011-10-04", value: 58.8},
        {date: "2011-10-05", value: 58.7},
        {date: "2011-10-06", value: 57},
        {date: "2011-10-30", value: 65}
      ],

      durationsData: [
        {date: "2011-10-07", value: 56.7},
        {date:"2011-10-08", value: 56.8},
        {date: "2011-10-09", value: 56.7},
        {date: "2011-10-10", value: 60.1},
        {date: '2011-10-11', value: 61.1},
        {date: '2011-10-12', value: 61.5},
        {date: '2011-10-13', value: 64.3},
        {date: '2011-10-14', value: 67.1},
        {date: '2011-10-15', value: 64.6},
      ],

      errorsData:[
        {date: '2011-10-16', value: 61.6},
        {date: '2011-10-17', value: 61.1},
        {date: '2011-10-18', value: 59.2},
        {date: '2011-10-19', value: 58.9},
        {date: '2011-10-20', value: 57.2},
        {date: '2011-10-21', value: 56.4},
        {date: '2011-10-22', value: 60.7},
        {date: '2011-10-23', value: 65.1},
        {date: '2011-10-24', value: 60.9},
      ],  

      throttlesData:[
        {date: '2011-10-25', value: 56.1},
        {date: '2011-10-26', value: 54.6},
        {date: '2011-10-27', value: 56.1},
        {date: '2011-10-28', value: 58.1},
        {date: '2011-10-29', value: 57.5},
        {date: '2011-10-30', value: 57.7},
        {date: '2011-10-31', value: 55.1},
        {date: '2011-11-01', value: 57.9},
        {date: '2011-11-02', value: 64.6},

      ]
     
  },
  function2: {
      invocationsData: [
        {date: "2011-10-01", value: 62.7},
        {date: "2011-10-02", value: 59.9},
        {date: "2011-10-03", value: 59.1},
        {date: "2011-10-04", value: 58.8},
        {date: "2011-10-05", value: 58.7},
        {date: "2011-10-06", value: 57},
        {date: "2011-10-30", value: 65}
      ],

      durationsData: [
        {date: "2011-10-07", value: 56.7},
        {date:"2011-10-08", value: 56.8},
        {date: "2011-10-09", value: 56.7},
        {date: "2011-10-10", value: 60.1},
        {date: '2011-10-11', value: 61.1},
        {date: '2011-10-12', value: 61.5},
        {date: '2011-10-13', value: 64.3},
        {date: '2011-10-14', value: 67.1},
        {date: '2011-10-15', value: 64.6},
      ],

      errorsData:[
        {date: '2011-10-16', value: 61.6},
        {date: '2011-10-17', value: 61.1},
        {date: '2011-10-18', value: 59.2},
        {date: '2011-10-19', value: 58.9},
        {date: '2011-10-20', value: 57.2},
        {date: '2011-10-21', value: 56.4},
        {date: '2011-10-22', value: 60.7},
        {date: '2011-10-23', value: 65.1},
        {date: '2011-10-24', value: 60.9},
      ],  

      throttlesData:[
        {date: '2011-10-25', value: 56.1},
        {date: '2011-10-26', value: 54.6},
        {date: '2011-10-27', value: 56.1},
        {date: '2011-10-28', value: 58.1},
        {date: '2011-10-29', value: 57.5},
        {date: '2011-10-30', value: 57.7},
        {date: '2011-10-31', value: 55.1},
        {date: '2011-11-01', value: 57.9},
        {date: '2011-11-02', value: 64.6},

      ]
    
  },
  function3: {
    
      invocationsData: [
        {date: "2011-10-01", value: 62.7},
        {date: "2011-10-02", value: 59.9},
        {date: "2011-10-03", value: 59.1},
        {date: "2011-10-04", value: 58.8},
        {date: "2011-10-05", value: 58.7},
        {date: "2011-10-06", value: 57},
        {date: "2011-10-30", value: 65}
      ],

      durationsData: [
        {date: "2011-10-07", value: 56.7},
        {date:"2011-10-08", value: 56.8},
        {date: "2011-10-09", value: 56.7},
        {date: "2011-10-10", value: 60.1},
        {date: '2011-10-11', value: 61.1},
        {date: '2011-10-12', value: 61.5},
        {date: '2011-10-13', value: 64.3},
        {date: '2011-10-14', value: 67.1},
        {date: '2011-10-15', value: 64.6},
      ],

      errorsData:[
        {date: '2011-10-16', value: 61.6},
        {date: '2011-10-17', value: 61.1},
        {date: '2011-10-18', value: 59.2},
        {date: '2011-10-19', value: 58.9},
        {date: '2011-10-20', value: 57.2},
        {date: '2011-10-21', value: 56.4},
        {date: '2011-10-22', value: 60.7},
        {date: '2011-10-23', value: 65.1},
        {date: '2011-10-24', value: 60.9},
      ],  

      throttlesData:[
        {date: '2011-10-25', value: 56.1},
        {date: '2011-10-26', value: 54.6},
        {date: '2011-10-27', value: 56.1},
        {date: '2011-10-28', value: 58.1},
        {date: '2011-10-29', value: 57.5},
        {date: '2011-10-30', value: 57.7},
        {date: '2011-10-31', value: 55.1},
        {date: '2011-11-01', value: 57.9},
        {date: '2011-11-02', value: 64.6},

      ]
    
  },
  function4: {
    
      invocationsData: [
        {date: "2011-10-01", value: 62.7},
        {date: "2011-10-02", value: 59.9},
        {date: "2011-10-03", value: 59.1},
        {date: "2011-10-04", value: 58.8},
        {date: "2011-10-05", value: 58.7},
        {date: "2011-10-06", value: 57},
        {date: "2011-10-30", value: 65}
      ],

      durationsData: [
        {date: "2011-10-07", value: 56.7},
        {date:"2011-10-08", value: 56.8},
        {date: "2011-10-09", value: 56.7},
        {date: "2011-10-10", value: 60.1},
        {date: '2011-10-11', value: 61.1},
        {date: '2011-10-12', value: 61.5},
        {date: '2011-10-13', value: 64.3},
        {date: '2011-10-14', value: 67.1},
        {date: '2011-10-15', value: 64.6},
      ],

      errorsData:[
        {date: '2011-10-16', value: 61.6},
        {date: '2011-10-17', value: 61.1},
        {date: '2011-10-18', value: 59.2},
        {date: '2011-10-19', value: 58.9},
        {date: '2011-10-20', value: 57.2},
        {date: '2011-10-21', value: 56.4},
        {date: '2011-10-22', value: 60.7},
        {date: '2011-10-23', value: 65.1},
        {date: '2011-10-24', value: 60.9},
      ],  

      throttlesData:[
        {date: '2011-10-25', value: 56.1},
        {date: '2011-10-26', value: 54.6},
        {date: '2011-10-27', value: 56.1},
        {date: '2011-10-28', value: 58.1},
        {date: '2011-10-29', value: 57.5},
        {date: '2011-10-30', value: 57.7},
        {date: '2011-10-31', value: 55.1},
        {date: '2011-11-01', value: 57.9},
        {date: '2011-11-02', value: 64.6},

      ]
    
  },
  function5:{
  
      invocationsData: [
        {date: "2011-10-01", value: 62.7},
        {date: "2011-10-02", value: 59.9},
        {date: "2011-10-03", value: 59.1},
        {date: "2011-10-04", value: 58.8},
        {date: "2011-10-05", value: 58.7},
        {date: "2011-10-06", value: 57},
        {date: "2011-10-30", value: 65}
      ],

      durationsData: [
        {date: "2011-10-07", value: 56.7},
        {date:"2011-10-08", value: 56.8},
        {date: "2011-10-09", value: 56.7},
        {date: "2011-10-10", value: 60.1},
        {date: '2011-10-11', value: 61.1},
        {date: '2011-10-12', value: 61.5},
        {date: '2011-10-13', value: 64.3},
        {date: '2011-10-14', value: 67.1},
        {date: '2011-10-15', value: 64.6},
      ],

      errorsData:[
        {date: '2011-10-16', value: 61.6},
        {date: '2011-10-17', value: 61.1},
        {date: '2011-10-18', value: 59.2},
        {date: '2011-10-19', value: 58.9},
        {date: '2011-10-20', value: 57.2},
        {date: '2011-10-21', value: 56.4},
        {date: '2011-10-22', value: 60.7},
        {date: '2011-10-23', value: 65.1},
        {date: '2011-10-24', value: 60.9},
      ],  

      throttlesData:[
        {date: '2011-10-25', value: 56.1},
        {date: '2011-10-26', value: 54.6},
        {date: '2011-10-27', value: 56.1},
        {date: '2011-10-28', value: 58.1},
        {date: '2011-10-29', value: 57.5},
        {date: '2011-10-30', value: 57.7},
        {date: '2011-10-31', value: 55.1},
        {date: '2011-11-01', value: 57.9},
        {date: '2011-11-02', value: 64.6},

      ]
  }
}

// Main Function
function FunctionsList(props: UserProps) {
  const [data, setData] =useState({});

  // useEffect(() => fetch('/', {//get data from AWS fetch request

  // }))


  const functions = [];

  for (const element in testResponse) {
    functions.push(<Function key={element} functionName={element} functionData={testResponse[element]}></Function>);
  }

  return (
  <>
  <button>Click me to get all functions data</button>
  <div id="functions-list">{functions}</div>
  </>
  );
}

export default FunctionsList;

