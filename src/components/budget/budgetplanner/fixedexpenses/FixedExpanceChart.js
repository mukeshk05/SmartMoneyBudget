import React from "react";
import ReactEcharts from 'echarts-for-react';



class FixedExpanceChart extends React.Component {
  render() {
    const option = {
      title: {
          text: 'New',
          subtext: 'New1',
          left: 'center'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['A', 'B', 'C', 'D', 'E']
      },
      series: [
          {
              name: 'F',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '60%'],
              data: [
                  {value: 335, name: 'A'},
                  {value: 310, name: 'B'},
                  {value: 234, name: 'C'},
                  {value: 135, name: 'D'},
                  {value: 1548, name: 'E'}
              ],
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };
    return (
      <ReactEcharts option={option} />   
    );
  }
}

export default FixedExpanceChart;