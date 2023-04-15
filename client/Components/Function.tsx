// React Imports
import React, { useEffect, useState } from 'react';
import Chart from './Chart'



// Main Function
function Function(props: any) {
  const { functionData, functionName } = props;
  // console.log(functionData)
  //if i console log the functionData, I should see an object containing name: string, data: object
  // console.log(functionData.name)//should give a string name
  // console.log(functionData.data)//should give an object
 

  const charts = [];
  for (const element in functionData) {
    charts.push(<Chart key={element} name={element} data={functionData[element]}/>)
  }
 
  return (
    <>
      <div className="function">
        <div id="function" className="function-info">
          <h2>{functionName}</h2>
          <button>OR click me to refresh data for each function</button>
          <div>
            {charts}
          </div>
        </div>
      
      </div>
    </>
  );
}


export default Function;
