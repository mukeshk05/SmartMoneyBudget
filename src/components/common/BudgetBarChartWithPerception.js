import React from "react";
import ReactEcharts from "echarts-for-react";

class BudgetBarChartWithPerception extends React.Component {

    render()

    {
        const eChartData=this.props.eChartDataByMonth[0];
        const option = {
            title: {
                text: eChartData.title,
                subtext: eChartData.subTitle,
                left: "center"
              },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            
                    type: 'shadow'      
                }
            },
            legend: {
                type: 'scroll',
                bottom:'bottom',
                data: eChartData.legendData
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '13%',
                containLabel: true
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
            xAxis: [
                {
                    type: 'category',
                    data: eChartData.xAxis
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series:eChartData.seriesData
        };

        return <ReactEcharts option={option} theme={"light"} style={{ height: "50vh",  width: "45vw"}} />;
    }
}

export default BudgetBarChartWithPerception;