
import React from "react";
import Chart from 'react-apexcharts';

class SavingTypeChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                legend: {
                    position: 'bottom',
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
        this.setState({ chartData: this.props.spendingTypeChartSeries });
    }

    render() {
        return (

            <Chart options={this.state.options} series={this.props.spendingTypeChartSeries} type="pie"  height="240"  width="350" />



        );
    }
}

export default SavingTypeChart;