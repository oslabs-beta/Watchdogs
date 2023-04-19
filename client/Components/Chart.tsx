// React Imports
import React from 'react';

// Type Imports
import { ChartProps } from '../types';

// Chart.js Imports
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Main Function
const Chart = (props: ChartProps) => {
  // Destructure Props
  const { data} = props;
  const labels = data.Invocations.timestamps;
  console.log(data);

  // Render Component
  return (
    <div className="chart">
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Invocations',
              data: data.Invocations.values,
              borderColor: 'green',
              backgroundColor: 'green',
            },
            {
              label: 'Errors',
              data: data.Errors.values,
              borderColor: 'red',
              backgroundColor: 'red',
            },
            {
              label: 'Throttles',
              data: data.Throttles.values,
              borderColor: '#e09034',
              backgroundColor: '#e09034',
            },
            {
              label: 'Duration',
              data: data.Duration.values,
              borderColor: 'blue',
              backgroundColor: 'blue',
              yAxisID: 'y1',
            },
          ],
          // lineTension:
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#e6e6e6',
              },
            },
          },

          scales: {
            x: {
              ticks: {
                color: '#e6e6e6',
                stepSize: 15,
              },
              type: 'time',
              time: {
                unit: 'minute',
              },
              min: new Date(Date.now() - 10800000).toISOString(),
              max: new Date().toISOString(),
            },

            y: {
              ticks: {
                color: '#e6e6e6',
              },
              title: {
                display: true,
                text: 'Value',
                color: '#e6e6e6',
              },
              min: 0,
              suggestedMax: 50,
              grid: {
                color: 'gray',
              },
            },

            y1: {
              ticks: {
                color: '#e6e6e6',
              },
              title: {
                display: true,
                text: 'Time (ms)',
                color: '#e6e6e6',
              },
              position: 'right',
              min: 0,
              suggestedMax: 50,
            },
          },

          layout: {
            padding: 10,
          },
        }}
      />
    </div>
  );
};

export default Chart;
