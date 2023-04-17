// React Imports
import React from 'react';

// Chart.js Imports
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import  'chartjs-adapter-date-fns';
import { generateKey } from 'crypto';

ChartJS.register(
  TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
)

// Type Declarations
type ChartProps = {
  data: {
    [metric: string]: {
      timestamps: Array<string>;
      values: Array<number>;
    };
  };
};

// Main Function
const Chart = (props: ChartProps) => {
//  
  // Destructure Props 
  const { data } = props;
  const labels = data.Invocations.timestamps;

  // Render Component
  return (
    <div style={{ width: '90%', height: '50vh', margin: '20px'}}>
      <Line 
      data={{
        labels: labels,
        datasets: [
          {
            label: "Invocations",
            data: data.Invocations.values, 
            borderColor: 'green',
            backgroundColor: 'green',
            
          },
          {
            label: "Errors",
            data: data.Errors.values, 
            borderColor: 'red',
            backgroundColor: 'red'
          },
          {
            label: "Throttles",
            data: data.Throttles.values, 
            borderColor: '#e09034',
            backgroundColor: '#e09034'
          },
          {
            label: "Duration",
            data: data.Duration.values, 
            borderColor: 'blue',
            backgroundColor: 'blue',
            yAxisID: 'y1',
          }
        ],
        // lineTension: 
      }}
      
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
                color: '#e6e6e6',
            }
          },
        },
          
        scales: {
          x: {
            ticks: {
              color: '#e6e6e6'
            },
            type: 'time',
            time: {
              unit: "minute",
            },
            min: (new Date(Date.now() - 10800000)).toISOString(),
            max: (new Date().toISOString()),
            grid: {
              // color: 'gray'
              // display: false
            }
          },

          y: {
            ticks: {
              color: '#e6e6e6'
            },
            title: {
              display: true,
              text: "Value",
              color: '#e6e6e6',
            },
            min: 0,
            suggestedMax: 50,
            grid: {
              color: 'gray'
              // display: false
            }
          },

          y1: {
            ticks: {
              color: '#e6e6e6'
            },
            title: {
              display: true,
              text: "Time (ms)",
              color: '#e6e6e6'
            },
            position: "right",
            min: 0,
            suggestedMax: 50,
          }
        },
        
        layout: {
          padding: 10,
        }
      }}
        />
    </div>
  )
}

export default Chart