// React Imports
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

// Component Imports
import Function from './Function';
import NoFunc from './NoFunc';
import PieChart from './PieChart';
import Loading from './Loading';

// Type Imports
import { FunctionsListProps, SelectedFuncs } from '../types';

// Asset Imports
import refresh from '../assets/Reload-100s-200px.png';

function FunctionsList({ loading, refreshMetrics, metrics, user, timeframe, period, unit, setIncrement, setTimeframe, incrementOptions, nofunc, dropdownOptions }: FunctionsListProps) {
 
  const [selectedFuncs, setSelectedFuncs] = useState([] as SelectedFuncs[]); // Functions currently selected by dropdown filter
  const [view, setView] = useState(true as boolean); // Displays the functions view(line charts)/true or the overview(pie charts)/false

  // Only display functions in selectedFuncs
  useEffect(() => {
    const allFuncs = Array.from(document.getElementsByClassName('function') as HTMLCollectionOf<HTMLElement>);
    allFuncs.forEach((func) => {
      func.style.display = 'none';
    });
    selectedFuncs.forEach((el: SelectedFuncs) => {
      const displayFunc = document.getElementById(el.value);
      if (displayFunc) {
        displayFunc.style.display = 'flex';
      }
    });
  }, [selectedFuncs]);

  // Default display all functions
  useEffect(() => {
    setSelectedFuncs(dropdownOptions.slice(1));
  }, []);

  // If page is loading, render Loading component instead of FunctionsList
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // If no functions present, render 'NoFunc' component instead of FunctionsList
  if (nofunc) {
    return (
      <>
        <NoFunc/>
      </>
    );
  }

  // Parse through dataset of metrics and create Function component for each
  const functions = [];
  for (const func in metrics) {
    functions.push(<Function id={func} key={func} user={user} functionName={func} functionData={metrics[func]} timeframe={timeframe} period={period} unit={unit}></Function>);
  }

  return (
    <>
      <div id="functions-list"> 
        <div id="functions-list-filters">
          <div id="function-filter">
            <div style={{ display: view ? 'block' : 'none' }}>
              {/* Dropdown menu to select which functions to view */}
              <Select
                isMulti
                defaultValue={{ label: 'All Functions', value: 'all' }}
                name="functions"
                options={dropdownOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                // Handle dropdown selection change events:
                onChange={(selectedOptions: any): void => {
                  if (selectedOptions.length && selectedOptions.find((option: SelectedFuncs) => option.value === 'all')) {
                    setSelectedFuncs(dropdownOptions.slice(1));
                  } else setSelectedFuncs(selectedOptions);
                }}
              />
            </div>
          </div>
          
          {/* Render buttons to choose between line charts and pie charts */}
          <div id="buttons-area">
            <button
              id="list"
              className={view ? 'selected' : ''}
              onClick={() => {
                setView(true);
              }}>
              List
            </button>
            <button
              id="pie"
              className={!view ? 'selected' : ''}
              onClick={() => {
                setView(false);
              }}>
              Overview
            </button>
          </div>
          
          <div id="refresh-timeframe">
            
            {/* Refresh button resets metrics on page and flushes/updates redis cache for the selected timeframe and increment */}
            <button id="refresh-button" onClick={refreshMetrics}>
              Refresh
              <img id="refresh-img" src={refresh}></img>
            </button>
            
            {/* Options to choose timeframe and increment view for metrics display */}
            <div id="timeframe-interval">
              <div>
                <label htmlFor="Select Increment" style={{ display: view ? 'inline' : 'none' }}>
                  Interval:
                </label>
                <select
                  style={{ display: view ? 'inline' : 'none' }}
                  name="Select Increment"
                  id="increment-selector"
                  defaultValue={incrementOptions[0]}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setIncrement(e.target.value);
                  }}>
                  {/* Make increment options dependent on which timeframe is selected */}
                  <option value={incrementOptions[0]}>{incrementOptions[0]}</option>
                  {incrementOptions[1] ? <option value={incrementOptions[1]}>{incrementOptions[1]}</option> : null}
                  {incrementOptions[2] ? <option value={incrementOptions[2]}>{incrementOptions[2]}</option> : null}
                </select>
              </div>
              
              <div>
                <label htmlFor="Select Timeframe">Timeframe:</label>
                <select
                  name="Select Timeframe"
                  id="timeframe-selector"
                  defaultValue={timeframe}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setTimeframe(e.target.value);
                    const x = document.getElementById('increment-selector') as HTMLSelectElement;
                    x.selectedIndex = 0;
                  }}>
                  {/* Values in milliseconds */}
                  <option value={'10800000'}>3hr</option>
                  <option value={'43200000'}>12hr</option>
                  <option value={'86400000'}>1d</option>
                  <option value={'604800000'}>1wk</option>
                  <option value={'2629800000'}>1mo</option>
                </select>
              </div>

            </div>
          </div>
        </div>
        {/* React inline if-else with conditional operator to display line charts or pie charts */}
        {view ? functions : <PieChart metrics={metrics} nofunc={nofunc}/>}
      </div>
    </>
  );
}

export default FunctionsList;
