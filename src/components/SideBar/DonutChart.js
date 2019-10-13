import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = props => {


       const temp={
            options: {},
            series: [44, 55, 41, 17, 15],
            labels: ['A', 'B', 'C', 'D', 'E']
        };

        return (
            <div >
                <Chart options={temp.options} series={temp.series} type="donut" width="380" />
            </div>
        );
};

export default DonutChart;