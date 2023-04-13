// React Imports
import React, { useState } from 'react';
import LineChart from './LineChart';
// import LineChart from '../assets/chart-template.js';

// Main Function
function Function() {
  // const chart = LineChart(test, {
  //   x: (d) => d.date,
  //   y: (d) => d.close,
  //   yLabel: '↑ Daily close ($)',
  //   width,
  //   height: 500,
  //   color: 'steelblue',
  // });

  return (
    <>
      <div className="function">
        <div className="function-info">
          <p>Function name</p>
        </div>
        <div>
          <LineChart />
        </div>
      </div>
    </>
  );
}

export default Function;
