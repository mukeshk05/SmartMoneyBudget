
import React from "react";
import Chart from 'react-apexcharts';

class IncomePaiChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            paiChartData:[],
            options: {
                labels: ['Primary Salary', 'Spouse Salary', 'Primary Benefits', 'Spouse Benefits'],
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

                <Chart options={this.state.options} series={this.props.paiChartData} type="pie"  height="270"  width="550" />



        );
    }
}

export default IncomePaiChart;