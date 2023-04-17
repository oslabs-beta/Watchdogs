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
