import React from "react";
import ReactEcharts from "echarts-for-react";
import {spendingCategory} from "../../common/Duration";

class SpendingTrackerVsActualChart extends React.Component {

    render()

    {

        const emphasisStyle = {
            itemStyle: {
                barBorderWidth: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0.5)'
            }
        };

        const option = {
            legend: {
                data: ['Actual Budget','Spending'],
                bottom: 'bottom'
            },
            brush: {
                toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                xAxisIndex: 0
            },
            toolbox: {
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {}
                }
            },
            title: {
                text: "Spending",
                subtext: "Spending Vs Actual",
                left: "center"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                data: spendingCategory,
                name: 'X Axis',
                axisLine: {onZero: true},
                splitLine: {show: false},
                splitArea: {show: false}
            },
            yAxis: {
                inverse: false,
                splitArea: {show: false}
            },
            grid: {
                left: 100
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'top',
                feature: {
                    magicType: {show: true, type: ['line','bar','stack'],title: 'Convert'},
                    saveAsImage: {show: true,title: 'Save As picture'},
                    restore:{show:false},
                    dataZoom:{show:false},
                    dataView:{show:false},
                    brush:{show:false}

                }
            },

            series: [
                {
                    name: 'Actual Budget',
                    type: 'bar',
                    stack: 'one',
                    emphasis: emphasisStyle,
                    data: this.props.actualBudgetData
                },
                {
                    name: 'Spending',
                    type: 'bar',
                    stack: 'one',
                    emphasis: emphasisStyle,
                    data: this.props.actualTrackerData
                }
            ]
        };


        return <ReactEcharts option={option} theme={"light"} style={{ height: "50vh",width: "30vw" }} />;
    }
}

export default SpendingTrackerVsActualChart;