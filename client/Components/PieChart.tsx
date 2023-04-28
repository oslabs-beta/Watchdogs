// React Imports
import React from 'react';

import { Chart, ArcElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import NoFunc from './NoFunc';

import { PieChartProps } from '../types';

Chart.register(Title);
Chart.register(ArcElement);

function PieChart(props: PieChartProps) {
  const { metrics, nofunc } = props;

  if (nofunc) {
    return (
      <>
        <NoFunc nofunc={nofunc} />
      </>
    );
  }

  const labels = Object.keys(metrics).length > 0 ? Object.keys(metrics) : [''];
  const invocationValues =
    labels[0] !== ''
      ? labels.map((label) => {
          return metrics[label].Invocations.values.reduce((accum, curr) => accum + curr, 0);
        })
      : [0];
  const errorValues =
    labels[0] !== ''
      ? labels.map((label) => {
          return metrics[label].Errors.values.reduce((accum, curr) => accum + curr, 0);
        })
      : [0];

  const colors = labels.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16));

  const invocationData = {
    labels: labels,
    datasets: [
      {
        label: 'Invocations',
        data: invocationValues,
        backgroundColor: colors,
        hoverOffset: 4,
        borderColor: colors,
      },
    ],
  };
  const errorData = {
    labels: labels,
    datasets: [
      {
        label: 'Errors',
        data: errorValues,
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
