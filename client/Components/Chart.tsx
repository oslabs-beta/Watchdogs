import React from 'react';

import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import  'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
)

const Chart = (props: any) => {
 
  const { name, data } = props;
  

  const labels = data.map((e: any) => e.date)
  const values = data.map((e: any) => e.value)
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
              unit: "day",
            
            }
          }
        }
      }}
        />
    </div>
  )
}

export default Chart