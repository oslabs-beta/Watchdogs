// React Imports
import React, { useEffect, useState, useLayoutEffect } from 'react';
import Select from 'react-select';

// Component Imports
import Function from './Function';

// Type Imports
import { FunctionsListProps } from '../types';

// Asset Imports
import refresh from '../assets/Reload-100s-200px.png';

type SelectedFuncs = {
  value: string
  label: string
}
// Main Function
function FunctionsList(props: FunctionsListProps) {
  
  const [selectedFuncs, setSelectedFuncs] = useState([] as SelectedFuncs[]);
  const [funcOptions, setFuncOptions] = useState([] as SelectedFuncs[])
  const [options, setOptions] = useState([] as SelectedFuncs[])

  // Destructure Props
  const { loading, refreshInfo, metrics, user, timeframe, period, unit, setIncrement, setTimeframe, incrementOptions } = props;

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
  
  useEffect(() => {
    const array = []
    for (const func in metrics){
    array.push({label: func, value: func})
  }
      setOptions(array)
  }, [])


  useEffect(() => {
    const allFuncs = Array.from(document.getElementsByClassName('function') as HTMLCollectionOf<HTMLElement>)
    allFuncs.forEach(func => {
      func.style.display = 'none'
    })
    selectedFuncs.forEach(el => {
      const displayFunc = document.getElementById(el.value)
      if (displayFunc){
        displayFunc.style.display = 'flex'
      }
      
    })

  }, [selectedFuncs])

  
    // setFuncOptions(array)
    // setSelectedFuncs(array)
  //   useLayoutEffect(() => {
  //   setSelectedFuncs([{label: 'js', value: 'js'}])  

  // },[])

  // useEffect(()=> {
  //   setFuncOptions(array)
  // }, [])

  return (
    <>
      <div id="functions-list">
        
       <Select
        defaultValue={options}
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select" 
        onChange={(selectedOptions: any): any => {
          setSelectedFuncs(selectedOptions)
          console.log('SELECTED FUNCS ---> ', selectedFuncs);
        }}
      />
     
        <div id="refresh-area">
          <label>Timeframe:</label>
          <select
            name="Select Timeframe"
            id="timeframe-selector"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              console.log('changing timeframe')
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
              console.log('changing increment')
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
        { Object.keys(metrics).map((func) => {
          return <Function key={func} user={user} functionName={func} functionData={metrics[func]} timeframe={timeframe} period={period} unit={unit}></Function>
        }) }
      </div>
    </>
  );
}

export default FunctionsList;
