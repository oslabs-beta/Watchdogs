// React Imports
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

// Component Imports
import Function from './Function';
import NoFunc from './NoFunc';
// Type Imports
import { FunctionsListProps, SelectedFuncs } from '../types';

// Asset Imports
import refresh from '../assets/Reload-100s-200px.png';


// Main Function
function FunctionsList(props: FunctionsListProps) {
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
    dropdownOptions,
  } = props;
  
  const [selectedFuncs, setSelectedFuncs] = useState([] as SelectedFuncs[]);



  
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
      if(functionsList){
        functionsList.style.display = '';
      }
    }

    
  });

  useEffect(() => {
    const allFuncs = Array.from(document.getElementsByClassName('function') as HTMLCollectionOf<HTMLElement>)
    allFuncs.forEach(func => {
      func.style.display = 'none'
    })
    selectedFuncs.forEach((el: SelectedFuncs) => {
      const displayFunc = document.getElementById(el.value)
      if (displayFunc){
        displayFunc.style.display = 'flex'
      }
      
    })

  }, [selectedFuncs])

  
  useEffect(() => {
     setSelectedFuncs(dropdownOptions.slice(1))
    }, [])
  
    if (nofunc){
      return (
          <>
              <NoFunc nofunc={nofunc}/>
          </>
      )
  } 
  
  const functions = [];
  
  for (const func in metrics) {
    functions.push(<Function id={func} key={func} user={user} functionName={func} functionData={metrics[func]} timeframe={timeframe} period={period} unit={unit}></Function>);
  }


  
  return (
    <>
      <div id="functions-list">
        <div id='functions-list-filters'>
          <div id='function-filter'>
            <p>Filter results:</p>
            <Select            
            isMulti
            defaultValue={{ label: "Select All", value: "all" }}
            name="functions"
            options={dropdownOptions}
            className="basic-multi-select"
            classNamePrefix="select" 
            onChange={(selectedOptions: any): void => {              
              if (selectedOptions.length && selectedOptions.find((option: SelectedFuncs) => option.value === 'all')){
                setSelectedFuncs(dropdownOptions.slice(1))
              }
                else setSelectedFuncs(selectedOptions)
            }}
            />
          </div>
          <div id="refresh-area">
            <label>Timeframe:</label>
            <select
              name="Select Timeframe"
              id="timeframe-selector"
              defaultValue={timeframe}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setTimeframe(e.target.value);
                const x = document.getElementById('increment-selector') as HTMLSelectElement
                x.selectedIndex = 0;
              }}
              >
              <option value={"10800000"}>3hr</option>
              <option value={"43200000"}>12hr</option>
              <option value={"86400000"}>1d</option>
              <option value={"604800000"}>1wk</option>
              <option value={"2629800000"}>1mo</option>
            </select>
            <label>Interval:</label>
            <select
              name="Select Increment"
              id="increment-selector"
              defaultValue={incrementOptions[0]}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
        </div>
     
        { functions }
      </div>
    </>
  );
}

export default FunctionsList;
