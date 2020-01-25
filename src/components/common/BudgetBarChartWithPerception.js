import React from "react";
import ReactEcharts from "echarts-for-react";

class BudgetBarChartWithPerception extends React.Component {

    render()

    {
        const option = {
            title: {
                text: "eChartData.title",
                subtext: "eChartData.subTitle",
                left: "center"
              },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            
                    type: 'shadow'      
                }
            },
            legend: {
                bottom:"bottom",
                data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '13%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
               
                {
                    name: 'A',
                    type: 'bar',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'B',
                    type: 'bar',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'C',
                    type: 'bar',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'D',
                    type: 'bar',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'E',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine: {
                        lineStyle: {
                            type: 'dashed'
                        },
                        data: [
                            [{type: 'min'}, {type: 'max'}]
                        ]
                    }
                },
                {
                    name: 'F',
                    type: 'bar',
                    barWidth: 5,
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name: 'G',
                    type: 'bar',
                    data: [120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name: 'H',
                    type: 'bar',

                    data: [60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name: 'I',
                    type: 'bar',

                    data: [62, 82, 91, 84, 109, 110, 120]
                }
            ]
        };

        return <ReactEcharts option={option} theme={"light"} style={{ height: "50vh",  width: "45vw"}} />;
    }
}

export default BudgetBarChartWithPerception;