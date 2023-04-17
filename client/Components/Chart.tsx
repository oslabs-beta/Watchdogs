import React from 'react';

import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import  'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
)

const Chart = (props: any) => {
 
  const { name, data } = props;

  const labels = data.timestamps;
  const values = data.values;  

  return (
    <div style={{background: 'white', width: '45vw', margin: '5px'}}>
      <Line 
      data={{
        labels: labels,
        datasets: [
          {
            label: name,
            data: values, 
            borderColor: 'orange',
            backgroundColor: 'orange'
          }
        ]
      }}
      height = {300}
      width={500}
      options={{
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: "minute",
            },
            min: (new Date(Date.now() - 10800000)).toISOString(),
          },
          y: {
            title: {
              display: true,
              text: name == 'Duration'? 'Time (ms)': 'Value'
            },
            min: 0,
            suggestedMax: 100,
            // max: Math.ceil(Math.max(values)),
            // max: 100,
            // ticks: {
            //   stepSize: 1
            // }
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