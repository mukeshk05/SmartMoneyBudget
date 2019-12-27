import React from "react";
import Chart from 'react-apexcharts';
class MonthelySpendingChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chartData:[],
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'flat',
                        barHeight: '100%',
                    },
                },
                dataLabels: {
                    enabled: true
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                responsive: [{
                    breakpoint: 580,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                xaxis: {
                    categories: this.props.month,
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'bottom',
                    offsetX: 0,
                    offsetY: 5

                }
            },
        }
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setState({ chartData: this.props.chartData });
    }



    render() {
        return (
            <Chart options={this.state.options} series={this.props.chartData} type="bar" height="300"  width="400" />
        );
    }
}

export default MonthelySpendingChart;