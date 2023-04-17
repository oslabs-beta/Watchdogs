// React Imports
import React, { useEffect, useState } from 'react';
import Chart from './Chart';

type FunctionProps = {
  functionName: string;
  functionData: {
    [metric: string]: {
      timestamps: Array<string>;
      values: Array<number>;
    };
  };
};

// Main Function
function Function(props: FunctionProps) {
  const { functionData, functionName } = props;
  // console.log(functionData)
  //if i console log the functionData, I should see an object containing name: string, data: object
  // console.log(functionData.name)//should give a string name
  // console.log(functionData.data)//should give an object

  const charts = [];
  for (const metric in functionData) {
    charts.push(<Chart key={metric} name={metric} data={functionData[metric]} />);
  }


  return (
    <>
      <div className="function">
        <div id="function" className="function-info">
          <h2>Function: &quot;{functionName}&quot;</h2>
          <div>{charts}</div>
        </div>
      </div>
    </>
  );
}

export default Function;
