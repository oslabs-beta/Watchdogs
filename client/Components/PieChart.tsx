// React Imports
import React, { useEffect } from 'react';

import { Chart, ArcElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';


import { PieChartProps } from '../types';

Chart.register(Title);
Chart.register(ArcElement);

function PieChart (props: PieChartProps) {
    const { metrics, loading, timeframe, setIncrement, setTimeframe, incrementOptions } = props;

    useEffect(() => {
        const loadingSection = document.getElementById('loading-section') as HTMLDivElement;
        const pielist = document.querySelector('.pielist') as HTMLDivElement;
    
        if (loading) {
          loadingSection.style.display = '';
          pielist.style.display = 'none';
        } else {
          loadingSection.style.display = 'none';
          pielist.style.display = '';
        }
      });

    const labels = Object.keys(metrics);
    const invocationValues = labels.map(label => {
        return metrics[label].Invocations.values.reduce((accum, curr) => accum+curr);
    })
    const errorValues = labels.map(label => {
        return metrics[label].Errors.values.reduce((accum, curr) => accum+curr);
    })
    const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'cyan']

    const invocationData = {
        labels: labels,
        datasets: [{
            label: 'Invocations',
            data: invocationValues,
            backgroundColor: colors,
            hoverOffset: 4
        }]
    };
    const errorData = {
        labels: labels,
        datasets: [{
            label: 'Errors',
            data: errorValues,
            backgroundColor: colors,
            hoverOffset: 4
        }]
    }

    return (
        <div className='pielist'>
            <select
                name="Select Timeframe"
                id="timeframe-selector"
                defaultValue={timeframe}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                console.log('changing timeframe')
                setTimeframe(e.target.value);
                const x = document.getElementById('increment-selector') as HTMLSelectElement
                x.selectedIndex = 0;
                }}
            >
                <option value={"10800000"}>3hr</option>
                <option value={"43200000"}>12hr</option>
                <option value={"86400000"}>1d</option>
                <option value={"604800000"}>1wk</option>
                <option value={"2629800000"}>1mo</option>
            </select>
            <select
                name="Select Increment"
                id="increment-selector"
                defaultValue={incrementOptions[0]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                console.log('changing increment')
                setIncrement(e.target.value);
                }}
                style={{display:'none'}}
            >
                <option value={incrementOptions[0]}>{incrementOptions[0]}</option>
                {incrementOptions[1] ? (
                <option value={incrementOptions[1]}>{incrementOptions[1]}</option>
                ) : null}
                {incrementOptions[2] ? (
                <option value={incrementOptions[2]}>{incrementOptions[2]}</option>
                ) : null}
            </select>
            <div className='pie'>
                <div>
                    <Pie 
                    data = {invocationData}
                    options={{
                        plugins: {
                        title: {
                            display: true,
                            text: 'Invocations',
                            position: 'top'
                        },
                        legend: {
                            position: 'top'
                        }
                        }
                    }}
                    ></Pie>
                </div>
                <div>
                    <Pie 
                    data = {errorData}
                    options={{
                        plugins: {
                        title: {
                            display: true,
                            text: 'Errors',
                            position: 'top'
                        },
                        legend: {
                            position: 'top'
                        }
                        }
                    }}
                    ></Pie>
                </div>
            </div>
        </div>
    )
}

export default PieChart;