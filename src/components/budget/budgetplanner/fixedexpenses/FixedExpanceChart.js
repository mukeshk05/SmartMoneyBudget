import React from "react";
import ReactEcharts from "echarts-for-react";

class FixedExpanceChart extends React.Component {

  render()

  {
    const eChartData=this.props.eChartData[0];
    const option = {
      title: {
        text: eChartData.title,
        subtext: eChartData.subTitle,
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient : 'vertical',
          left: 'right',
          bottom:"35%",
          data: eChartData.data
      },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
      series: [
        {
          name: eChartData.seriesName,
          type: "pie",
          radius: ["30%", "70%"],
          center: ["35%", "65%"],
          data: eChartData.seriesData,
            animation: true,
            label: {
                position: 'outer',
                alignTo: 'labelLine',
                bleedMargin: 5
            },
            left: 0,
            right:110,
            top: '0%',
            bottom: 0,
          emphasis: {
            itemStyle: {
              shadowBlur: 50,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
                label: {
                    show: true
                }
            }
          }
        }
      ]
    };
    return <ReactEcharts option={option} theme={"light"}  />;
  }
}

export default FixedExpanceChart;