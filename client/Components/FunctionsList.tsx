// React Imports
import React, { useEffect } from 'react';

// Component Imports
import Function from './Function';

// Type Imports
import { FunctionsListProps } from '../types';

// Asset Imports
import refresh from '../assets/Reload-100s-200px.png';

// Main Function
function FunctionsList(props: FunctionsListProps) {
  // Destructure Props
  const { loading, refreshInfo, metrics, user } = props;

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

  const functions = [];
  for (const func in metrics) {
    functions.push(<Function key={func} user={user} functionName={func} functionData={metrics[func]}></Function>);
  }

  return (
    <>
      <div id="functions-list">
        <div id="refresh-area">
          <button id="refresh-button" onClick={refreshInfo}>
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
