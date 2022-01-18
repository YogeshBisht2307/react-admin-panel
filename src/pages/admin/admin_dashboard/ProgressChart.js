import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ProgressChart= () => {
    var getDaysArray = function(start, end) {
        var arr=[];
        for(var dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(`${dt.getDate()}-${dt.getMonth()+1}-${dt.getFullYear()}`);
        }
        return arr;
    };
    const lineChart = (
        <Line
            data = {{
                    labels:  getDaysArray(new Date("2022-01-01"),new Date("2022-01-6")),
                    datasets:[
                        {
                            label: 'DataSet One',
                            data: [65, 59, 80, 81, 56, 55],
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: 'DataSet Second',
                            data: [10, 16, 40, 48, 21, 29],
                            fill: false,
                            borderColor: 'rgb(192, 75, 75)',
                            tension: 0.1
                    }
                ],
            }}
        />
    )
    return (
        <div className="progress_chart_container">
            <h1 className="heading">Chart Data</h1>
            <div className="progress_chart">
                {lineChart}
            </div>
        </div>
    )
}

export default ProgressChart;