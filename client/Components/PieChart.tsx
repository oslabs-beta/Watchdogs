// React Imports
import React from 'react';

// Component Imports
import NoFunc from './NoFunc';

// Type Imports
import { PieChartProps } from '../types';

// Chart.js Imports
import { Chart, ArcElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(Title, ArcElement);

function PieChart({ metrics, nofunc }: PieChartProps) {

  if (nofunc) {
    return (
      <>
        <NoFunc />
      </>
    );
  }

  const labels = Object.keys(metrics).length > 0 ? Object.keys(metrics) : ['']; // Creates array of function names
  // Invocation Values
  const invocationValues =
    labels[0] !== ''
      ? labels.map((label) => { // Returns array of total invocations for each function
          return metrics[label].Invocations.values.reduce((accum, curr) => accum + curr, 0); 
        })
      : [0];
  // Error Values
  const errorValues =
    labels[0] !== ''
      ? labels.map((label) => { // Returns array of total errors for each function
          return metrics[label].Errors.values.reduce((accum, curr) => accum + curr, 0);
        })
      : [0];

  // Random label colors
  const colors = labels.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)); 
  
  // Invocation and Error Data to pass into Chart.js
  const invocationData = {
    labels: labels, // Function names
    datasets: [
      {
        label: 'Invocations',
        data: invocationValues, // Array of values corresponding to functions
        backgroundColor: colors,
        hoverOffset: 4,
        borderColor: colors,
      },
    ],
  };
  
  const errorData = {
    labels: labels, // Function names
    datasets: [
      {
        label: 'Errors',
        data: errorValues, // Array of errors corresponding to functions
        backgroundColor: colors,
        hoverOffset: 4,
        borderColor: colors,
      },
    ],
  };

  return (
    <div id="pielist">
      <div className="pie">
        <div>
          <Pie
            data={invocationData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Invocations',
                  position: 'top',
                  font: {
                    size: 30,
                  },
                  color: '#e09034',
                },
                legend: {
                  position: 'top',
                  labels: {
                    color: '#e09034',
                  },
                },
              },
            }}></Pie>
        </div>
        <div>
          <Pie
            data={errorData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Errors',
                  position: 'top',
                  font: {
                    size: 30,
                  },
                  color: '#e09034',
                },
                legend: {
                  position: 'top',
                  labels: {
                    color: '#e09034',
                  },
                },
              },
            }}></Pie>
        </div>
      </div>
    </div>
  );
}

export default PieChart;
