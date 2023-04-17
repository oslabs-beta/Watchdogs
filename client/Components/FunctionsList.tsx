// React Imports
import React, { useState, useEffect } from 'react';

// Component Imports
import Function from './Function';

//Asset Imports
import refresh from '../assets/Reload-100s-200px.png';

// Type Declarations
type UserProps = {
  user: {
    username: string;
    arn: string;
    _id: string;
  };
  metrics: {
    [func: string]: {
      [metric: string]: {
        timestamps: Array<string>;
        values: Array<number>;
      };
    };
  };
  loading: boolean;
  getUserInfo: () => void;
};

// Main Function
function FunctionsList(props: UserProps) {
  const functions = [];
  const { loading } = props;

  // Show/Hide Loading Display
  useEffect(() => {
    const loadingSection = document.getElementById('loading-section') as HTMLDivElement;
    const functionsList = document.getElementById('functions-list') as HTMLDivElement;

    if (loading) {
      loadingSection.style.display = '';
      functionsList.style.display = 'none';
    } else {
      loadingSection.style.display = 'none';
      functionsList.style.display = '';
    }
  });

  for (const func in props.metrics) {
    functions.push(<Function key={func} functionName={func} functionData={props.metrics[func]}></Function>);
  }

  return (
    <>
      <div id="functions-list">
        <div id="refresh-area">
          <button id="refresh-button" onClick={props.getUserInfo}>
            Refresh
            <img id="refresh-img" src={refresh}></img>
          </button>
        </div>
        {functions}
      </div>
    </>
  );
}

export default FunctionsList;
