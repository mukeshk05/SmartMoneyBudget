
import React from "react";
import Chart from 'react-apexcharts';

class SpendingTypeChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: 0,
                    offsetY: 5
                },
                labels: this.props.spendingTypeChartLavel,
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
        this.setState({ chartData: this.props.spendingTypeChartSeries });
    }

    render() {
        return (

            <Chart options={this.state.options} series={this.props.spendingTypeChartSeries} type="pie"  height="300"  width="400" />



        );
    }
}

export default SpendingTypeChart;