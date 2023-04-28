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

// Main Function
function FunctionsList(props: FunctionsListProps) {
  // Destructure Props
  const { loading, refreshInfo, metrics, user, timeframe, period, unit, setIncrement, setTimeframe, incrementOptions, nofunc, dropdownOptions } = props;

  const [selectedFuncs, setSelectedFuncs] = useState([] as SelectedFuncs[]);
  const [view, setView] = useState(true as boolean);

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

  useEffect(() => {
    setSelectedFuncs(dropdownOptions.slice(1));
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (nofunc) {
    return (
      <>
        <NoFunc nofunc={nofunc} />
      </>
    );
  }

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
              <Select
                isMulti
                defaultValue={{ label: 'All Functions', value: 'all' }}
                name="functions"
                options={dropdownOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions: any): void => {
                  if (selectedOptions.length && selectedOptions.find((option: SelectedFuncs) => option.value === 'all')) {
                    setSelectedFuncs(dropdownOptions.slice(1));
                  } else setSelectedFuncs(selectedOptions);
                }}
              />
            </div>
          </div>
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
            <button id="refresh-button" onClick={refreshInfo}>
              Refresh
              <img id="refresh-img" src={refresh}></img>
            </button>
            <div id="timeframe-interval">
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
                <option value={incrementOptions[0]}>{incrementOptions[0]}</option>
                {incrementOptions[1] ? <option value={incrementOptions[1]}>{incrementOptions[1]}</option> : null}
                {incrementOptions[2] ? <option value={incrementOptions[2]}>{incrementOptions[2]}</option> : null}
              </select>

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
                <option value={'10800000'}>3hr</option>
                <option value={'43200000'}>12hr</option>
                <option value={'86400000'}>1d</option>
                <option value={'604800000'}>1wk</option>
                <option value={'2629800000'}>1mo</option>
              </select>
            </div>
          </div>
        </div>
        {!view && <PieChart metrics={metrics} nofunc={nofunc} />}
        {view && functions}
      </div>
    </>
  );
}

export default FunctionsList;
