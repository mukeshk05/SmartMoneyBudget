
import React from "react";
import Chart from 'react-apexcharts';

class SpendingPaiChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            paiChartData:[],
            options: {
                labels: this.props.paiChartLabels,
                legend: {
                    position: 'bottom',
                    offsetX: 0,
                    offsetY: 5
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
        this.props.onRef(this);
        this.setState({ chartData: this.props.chartData });
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.props.paiChartData} type="pie"  height="300"  width="400" />
        );
    }
}

export default SpendingPaiChart;