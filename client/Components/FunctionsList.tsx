// React Imports
import React, { useEffect, useState } from 'react';

// Component Imports
import Function from './Function';
import NoFunc from './NoFunc';

// Type Imports
import { FunctionsListProps } from '../types';

// Asset Imports
import refresh from '../assets/Reload-100s-200px.png';

// Main Function
function FunctionsList(props: FunctionsListProps) {
  // const [nofunc, setNofunc] = useState(false);

  // Destructure Props
  const {
    loading,
    refreshInfo,
    metrics,
    user,
    timeframe,
    period,
    unit,
    setIncrement,
    setTimeframe,
    incrementOptions,
    nofunc,
  } = props;

  // if (!metrics.func) {
  //   setNofunc(true);
  // }
  // Show/Hide Loading Display
  useEffect(() => {
    const loadingSection = document.getElementById(
      'loading-section'
    ) as HTMLDivElement;
    const functionsList = document.getElementById(
      'functions-list'
    ) as HTMLDivElement;

    if (loading) {
      loadingSection.style.display = '';
      functionsList.style.display = 'none';
    } else {
      loadingSection.style.display = 'none';
      functionsList.style.display = '';
    }

    if (nofunc) {
      functionsList.style.display = 'none';
    }
  });

  const functions = [];
  for (const func in metrics) {
    functions.push(
      <Function
        key={func}
        user={user}
        functionName={func}
        functionData={metrics[func]}
        timeframe={timeframe}
        period={period}
        unit={unit}
      ></Function>
    );
  }

  return (
    <>
      <div id="functions-list">
        <div id="refresh-area">
          <select
            name="Select Timeframe"
            id="timeframe-selector"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              console.log('changing timeframe');
              setTimeframe(e.target.value);
              const x = document.getElementById(
                'increment-selector'
              ) as HTMLSelectElement;
              x.selectedIndex = 0;
            }}
          >
            <option value={'10800000'}>3hr</option>
            <option value={'43200000'}>12hr</option>
            <option value={'86400000'}>1d</option>
            <option value={'604800000'}>1wk</option>
            <option value={'2629800000'}>1mo</option>
          </select>
          <select
            name="Select Increment"
            id="increment-selector"
            defaultValue={incrementOptions[0]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              console.log('changing increment');
              setIncrement(e.target.value);
            }}
          >
            <option value={incrementOptions[0]}>{incrementOptions[0]}</option>
            {incrementOptions[1] ? (
              <option value={incrementOptions[1]}>{incrementOptions[1]}</option>
            ) : null}
            {incrementOptions[2] ? (
              <option value={incrementOptions[2]}>{incrementOptions[2]}</option>
            ) : null}
          </select>
          <button id="refresh-button" onClick={refreshInfo}>
            Refresh
            <img id="refresh-img" src={refresh}></img>
          </button>
        </div>
        {functions}
        {/* <NoFunc nofunc={nofunc} /> */}
      </div>
    </>
  );
}

export default FunctionsList;
