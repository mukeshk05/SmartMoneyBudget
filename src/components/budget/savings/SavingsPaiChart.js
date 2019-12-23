
import React from "react";
import Chart from 'react-apexcharts';

class SavingPaiChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            paiChartData:[],
            options: {
                labels: this.props.paiChartLabels,
                legend: {
                    position: 'left'
                },
                responsive: [{
                    breakpoint: 580,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'top'
                        }
                    }
                }]
            },

        }
    }

    componentDidMount() {
        this.setState({ chartData: this.props.chartData });
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.props.paiChartData} type="pie"  height="309" width="450" />
        );
    }
}

export default SavingPaiChart;