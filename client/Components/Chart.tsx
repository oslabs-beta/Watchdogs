import React from 'react';
import * as d3 from 'd3'
// import {Legend} from "@d3/color-legend"

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
interface Line {
    date: Date ;
    value: number;
}


const margin = ({top: 20, right: 30, bottom: 30, left: 40})

const height = 500
const width = 800

const line = ():any =>  {
    d3.line<Line>()
    .curve(d3.curveStep)
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value)) 
}

const extendValue = ():any => {
    return d3.extent(data, d => d.value)
}
const extendDate = ():any => {
    return d3.extent(data, d => d.date)
}
const y = d3.scaleLinear()
    .domain(extendValue()).nice()
    .range([height - margin.bottom, margin.top])

const x = d3.scaleUtc()
    .domain(extendDate())
    .range([margin.left, width - margin.right])

const yAxis = (g:any) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call((g:any ) => g.select(".domain").remove())
    // .call((g:any) => g.select(".tick:last-of-type text").append("tspan").text(data.value))


const xAxis = (g:any) => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    .call((g:any) => g.select(".domain").remove())

const color = d3.scaleSequential(y.domain(), d3.interpolateTurbo)




const chart = () => {
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

//   const gradient = DOM.uid();

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("linearGradient")
    //   .attr("id", gradient.id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height - margin.bottom)
      .attr("x2", 0)
      .attr("y2", margin.top)
    .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
    .join("stop")
      .attr("offset", d => d)
      .attr("stop-color", color.interpolator());

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
    //   .attr("stroke", gradient)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  return svg.node();
}
const output = chart()


function Chart() {
  return (
    <>
      {output}
    </>
  )
}

export default Chart