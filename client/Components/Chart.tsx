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
  const { data } = props;
  const labels = data.Invocations.timestamps;

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
              borderColor: '#9985B8',
              backgroundColor: '#9985B8',
            },
            {
              label: 'Duration',
              data: data.Duration.values,
              borderColor: '#28A49E',
              backgroundColor: '#28A49E',
              yAxisID: 'y1',
            },
            {
              label: 'Throttles',
              data: data.Throttles.values,
              borderColor: '#983628',
              backgroundColor: '#983628',
            },
            {
              label: 'Errors',
              data: data.Errors.values,
              borderColor: '#ff0000ed',
              backgroundColor: '#ff0000ed',
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#e09034',
              },
            },
          },

          scales: {
            x: {
              ticks: {
                color: '#a6a6a6',
                stepSize: 15,
                // interval: time.minute.every(15),
              },
              type: 'time',
              time: {
                unit: 'minute',
              },
              min: new Date(Math.ceil(Date.now() / 900000) * 900000 - 10800000).toISOString(),
              max: new Date(Math.ceil(Date.now() / 900000) * 900000).toISOString(),
              grid: {
                color: '#a6a6a6',
                display: false,
              },
            },

            y: {
              ticks: {
                color: '#a6a6a6',
              },
              title: {
                display: true,
                text: 'Value',
                color: '#a6a6a6',
              },
              min: 0,
              suggestedMax: 50,
              grid: {
                color: '#a6a6a6',
                display: false,
              },
            },

            y1: {
              ticks: {
                color: '#a6a6a6',
              },
              title: {
                display: true,
                text: 'Time (ms)',
                color: '#a6a6a6',
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
