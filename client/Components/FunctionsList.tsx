// React Imports
import React, { useState } from 'react';

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

// Main Function
function FunctionsList(props: UserProps) {
  const functions = [];

  for (let i = 0; i < 5; i++) {
    functions.push(<Function key={i}></Function>);
  }

  return <div id="functions-list">{functions}</div>;
}

export default FunctionsList;
