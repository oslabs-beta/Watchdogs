import React from 'react';

import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"

ChartJS.register(
  LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
)

const Chart = () => {
  const data = [{date: "2011-10-01", value: 62.7},
   {date: "2011-10-02", value: 59.9},
   {date: "2011-10-03", value: 59.1},
   {date: "2011-10-04", value: 58.8},
   {date: "2011-10-05", value: 58.7},
   {date: "2011-10-06", value: 57},
   {date: "2011-10-07", value: 56.7},
   {date:"2011-10-08", value: 56.8},
   {date: "2011-10-09", value: 56.7},
   {date: "2011-10-10", value: 60.1},
     {date: '2011-10-11', value: 61.1},
     {date: '2011-10-12', value: 61.5},
     {date: '2011-10-13', value: 64.3},
     {date: '2011-10-14', value: 67.1},
     {date: '2011-10-15', value: 64.6},
     {date: '2011-10-16', value: 61.6},
     {date: '2011-10-17', value: 61.1},
     {date: '2011-10-18', value: 59.2},
     {date: '2011-10-19', value: 58.9},
     {date: '2011-10-20', value: 57.2},
     {date: '2011-10-21', value: 56.4},
     {date: '2011-10-22', value: 60.7},
     {date: '2011-10-23', value: 65.1},
     {date: '2011-10-24', value: 60.9},
     {date: '2011-10-25', value: 56.1},
     {date: '2011-10-26', value: 54.6},
     {date: '2011-10-27', value: 56.1},
     {date: '2011-10-28', value: 58.1},
     {date: '2011-10-29', value: 57.5},
     {date: '2011-10-30', value: 57.7},
     {date: '2011-10-31', value: 55.1},
     {date: '2011-11-01', value: 57.9},
     {date: '2011-11-02', value: 64.6},
  ]
  const labels = data.map(e => e.date)
  const values = data.map(e => e.value)
  return (
    <div style={{background: 'white', width: '80vw'}}>
      <Line 
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Weekdays',
            data: values, 
            borderColor: 'orange',
            backgroundColor: 'orange'
          }
        ]
      }}
      height = {400}
      width={600}
      options={{
        maintainAspectRatio: false
      }}
        />
    </div>
  )
}

export default Chart