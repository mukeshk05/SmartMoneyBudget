import React from "react";
import Chart from 'react-apexcharts';
class SavingsChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            chartData:[],
            options: {
                chart: {
                    stacked: true,
                    stackType: '100%'
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
                    position: 'left',
                    offsetX: 0,
                    offsetY: 50

                },
                tooltip: {
                    style: {
                        fontSize: '12px',
                        background: "#00a0e9"

                    }
                }
            },
        }
    }

    componentDidMount() {
        this.setState({ chartData: this.props.chartData });
    }



    render() {
        return (
            <Chart options={this.state.options} series={this.props.chartData} type="bar" height="270"  width="450" />
        );
    }
}

export default SavingsChart;