import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ActivityChart= () => {
    console.log(Chart);
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
                            label: 'Activity Count',
                            data: [5, 7, 3, 6, 0, 4],
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: 'Visitor Count',
                            data: [3, 1, 2, 5, 0, 7],
                            fill: false,
                            borderColor: 'rgb(192, 75, 75)',
                            tension: 0.1
                    }
                ],
            }}
            options = {{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                }
            }}
        />
    )
    return (
        <div className="activity_chart_container">
            <h1 className="dashboard-header">Activity Data</h1>
            <div className="activity_chart">
                {lineChart}
            </div>
        </div>
    )
}

export default ActivityChart;