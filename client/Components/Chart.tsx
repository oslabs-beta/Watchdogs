import React from 'react';

import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import  'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
)

const Chart = (props: any) => {
 
  const { name, data } = props;
  

  const labels = data.timestamps
  const values = data.values
  return (
    <div style={{background: 'white', width: '80vw'}}>
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
            
            }
          }
        }
      }}
        />
    </div>
  )
}

export default Chart