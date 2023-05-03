// React Imports
import React from 'react';

// Type Imports
import { ChartProps } from '../types';

// Chart.js Imports
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = ({ data, timeframe, period, unit, functionName }: ChartProps) => {
  
  // Render Component
  return (
    <div className="chart" id={functionName + '-chart'}>
      <Line
        data={{
          labels: data.Invocations.timestamps, // x-axis values
          datasets: [
            {
              label: 'Invocations',
              data: data.Invocations.values, // y-axis values
              pointRadius: 1,
              borderColor: '#9985B8',
              backgroundColor: '#9985B8',
            },
            {
              label: 'Duration',
              data: data.Duration.values, // y1-axis values
              pointRadius: 1,
              borderColor: '#28A49E',
              backgroundColor: '#28A49E',
              yAxisID: 'y1',
            },
            {
              label: 'Throttles',
              data: data.Throttles.values, // y-axis values
              pointRadius: 1,
              borderColor: '#983628',
              backgroundColor: '#983628',
            },
            {
              label: 'Errors',
              data: data.Errors.values, // y-axis values
              pointRadius: 1,
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
                stepSize: period, // Makes chart increments responsive to props passed as timeframe filter
              },
              type: 'time',
              time: {
                unit: unit, // Makes chart increments responsive to props passed as timeframe filter
              },
              min: new Date(Math.ceil(Date.now() / 600000) * 600000 - Number(timeframe)).toISOString(), // Overall timeframe of chart, responsive to timeframe prop
              max: new Date(Math.ceil(Date.now() / 600000) * 600000).toISOString(), // Current time rounding up to 10 minutes
              grid: {
                color: '#a6a6a6',
                display: false,
              },
            },
            // Axis for numeric values
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
              suggestedMax: 50, // Default max y-tick
              grid: {
                color: '#a6a6a6',
                display: false,
              },
            },
            // Axis for time values
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
              suggestedMax: 50, // Default max y1-tick
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
