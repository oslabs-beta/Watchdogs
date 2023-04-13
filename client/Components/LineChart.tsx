import React, { ReactNode, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { rootCertificates } from 'tls';
import * as Plot from '@observablehq/plot';

import { Chart } from '../assets/chart-template.js';

// function Chart(
//   data,
//   {
//     x = ([x]) => x, // given d in data, returns the (temporal) x-value
//     y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
//     defined, // for gaps in data
//     curve = d3.curveLinear, // method of interpolation between points
//     marginTop = 20, // top margin, in pixels
//     marginRight = 30, // right margin, in pixels
//     marginBottom = 30, // bottom margin, in pixels
//     marginLeft = 40, // left margin, in pixels
//     width = 640, // outer width, in pixels
//     height = 400, // outer height, in pixels
//     xType = d3.scaleUtc, // the x-scale type
//     xDomain, // [xmin, xmax]
//     xRange = [marginLeft, width - marginRight], // [left, right]
//     yType = d3.scaleLinear, // the y-scale type
//     yDomain, // [ymin, ymax]
//     yRange = [height - marginBottom, marginTop], // [bottom, top]
//     yFormat, // a format specifier string for the y-axis
//     yLabel, // a label for the y-axis
//     color = 'currentColor', // stroke color of line
//     strokeLinecap = 'round', // stroke line cap of the line
//     strokeLinejoin = 'round', // stroke line join of the line
//     strokeWidth = 1.5, // stroke width of line, in pixels
//     strokeOpacity = 1, // stroke opacity of line
//   } = {},
// ) {
//   // Compute values.
//   const X = d3.map(data, x);
//   const Y = d3.map(data, y);
//   const I = d3.range(X.length);
//   if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
//   const D = d3.map(data, defined);

//   // Compute default domains.
//   if (xDomain === undefined) xDomain = d3.extent(X);
//   if (yDomain === undefined) yDomain = [0, d3.max(Y)];

//   // Construct scales and axes.
//   const xScale = xType(xDomain, xRange);
//   const yScale = yType(yDomain, yRange);
//   const xAxis = d3
//     .axisBottom(xScale)
//     .ticks(width / 80)
//     .tickSizeOuter(0);
//   const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

//   // Construct a line generator.
//   const line = d3
//     .line()
//     .defined((i) => D[i])
//     .curve(curve)
//     .x((i) => xScale(X[i]))
//     .y((i) => yScale(Y[i]));

//   const svg = d3
//     .create('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .attr('viewBox', [0, 0, width, height])
//     .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

//   svg
//     .append('g')
//     .attr('transform', `translate(0,${height - marginBottom})`)
//     .call(xAxis);

//   svg
//     .append('g')
//     .attr('transform', `translate(${marginLeft},0)`)
//     .call(yAxis)
//     .call((g) => g.select('.domain').remove())
//     .call((g) =>
//       g
//         .selectAll('.tick line')
//         .clone()
//         .attr('x2', width - marginLeft - marginRight)
//         .attr('stroke-opacity', 0.1)
//     )
//     .call((g) =>
//       g
//         .append('text')
//         .attr('x', -marginLeft)
//         .attr('y', 10)
//         .attr('fill', 'currentColor')
//         .attr('text-anchor', 'start')
//         .text(yLabel)
//     );

//   svg
//     .append('path')
//     .attr('fill', 'none')
//     .attr('stroke', color)
//     .attr('stroke-width', strokeWidth)
//     .attr('stroke-linecap', strokeLinecap)
//     .attr('stroke-linejoin', strokeLinejoin)
//     .attr('stroke-opacity', strokeOpacity)
//     .attr('d', line(I));

//   return svg.node();
// }
//   const chart = Chart(test, {
//     x: (d) => d.date,
//     y: (d) => d.close,
//     yLabel: '↑ Daily close ($)',
//     width,
//     height: 500,
//     color: 'steelblue',
//   });

function LineChart() {
  const divRef = useRef<HTMLInputElement>(null);
  // ref!: SVGSVGElement;
  const test: object[] = [
    { date: '2007-04-23', close: 93.24 },
    { date: '2007-04-24', close: 95.35 },
    { date: '2007-04-25', close: 98.84 },
    { date: '2007-04-26', close: 99.92 },
    { date: '2007-04-29', close: 99.8 },
    { date: '2007-05-01', close: 99.47 },
    { date: '2007-05-02', close: 100.39 },
  ];

  // const chart = Plot.plot({
  //   grid: true,
  //   style: {
  //     background: 'transparent',
  //     color: 'rgb(224, 144, 52)',
  //   },

  //   marks: [Plot.line(test, { x: 'date', y: 'close' })],
  // });
  // const chart = Chart(test, {
  //       x: (d) => d.date,
  //       y: (d) => d.close,
  //       yLabel: '↑ Daily close ($)',
  //       width,
  //       height: 500,
  //       color: 'steelblue',
  //     });

  useEffect(() => {
    divRef.current?.append(chart);
    return function cleanup() {
      divRef.current?.removeChild(chart);
    };
  }, []);

  console.log(chart);
  return (
    <>
      <div style={{ width: '500px' }} ref={divRef}></div>
    </>
  );
}

export default LineChart;

// class LineChart extends React.Component {
//   ref!: SVGSVGElement;

//   private buildGraph(data: Array<number>) {
//     const width = 200,
//       scaleFactor = 10,
//       barHeight = 20;

//     const graph = d3
//       .select(this.ref)
//       .attr('width', width)
//       .attr('height', barHeight * data.length);

//     const bar = graph
//       .selectAll('g')
//       .data(data)
//       .enter()
//       .append('g')
//       .attr('transform', function (d, i) {
//         return 'translate(0,' + i * barHeight + ')';
//       });

//     bar
//       .append('rect')
//       .attr('width', function (d) {
//         return d * scaleFactor;
//       })
//       .attr('height', barHeight - 1);

//     bar
//       .append('text')
//       .attr('x', function (d) {
//         return d * scaleFactor;
//       })
//       .attr('y', barHeight / 2)
//       .attr('dy', '.35em')
//       .text(function (d) {
//         return d;
//       });
//   }

//   componentDidMount() {
//     // activate
//     this.buildGraph([5, 10, 12]);
//   }

//   render() {
//     return (
//       <div className="svg">
//         <svg
//           className="container"
//           ref={(ref: SVGSVGElement) => (this.ref = ref)}
//           width="100"
//           height="100"
//         ></svg>
//       </div>
//     );
//   }
// }

// export default LineChart;
