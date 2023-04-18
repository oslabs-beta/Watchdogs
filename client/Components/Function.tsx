// React Imports
import React from 'react';
import Chart from './Chart';

// Type Imports
import { FunctionProps } from '../types';
//region, arn, function name
// Main Function
function Function(props: FunctionProps) {
  // Destructure Props
  const { functionData, functionName } = props;

  // Render Component
  return (
    <>
      <div className="function">
        <h2>&quot;{functionName}&quot;</h2>
        <Chart key={functionName} data={functionData} />
      </div>
    </>
  );
}

export default Function;
