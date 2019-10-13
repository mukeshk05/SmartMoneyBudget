import React from "react";
import {Tabs, Row, Col, Icon} from "antd";
import './css/Editabletable.css';
import Chart from "react-apexcharts";
import { StickyContainer } from 'react-sticky';
import EditableTable from "./EditableCell";
const TabPane = Tabs.TabPane;

const temp={
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
};


const Tracket = props => {

    return (
        <div className="gutter-example">
            <Row gutter={16}>
                <Col className="gutter-row" span={15}>
                    <div >
                        <EditableTable/>
                    </div>
                </Col>
                <Col  span={6}>
                    <Tabs defaultActiveKey="2" tabPosition={"bottom"}>
                        <TabPane
                            tab={
                                <span>
          <Icon type="apple" />
         Month
        </span>
                            }
                            key="1"
                        >
                            <Chart options={temp.options} series={temp.series} type="donut" width="380" height={"300"} />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
          <Icon type="android" />
          Year
        </span>
                            }
                            key="2"
                        >
                            <Chart options={temp.options} series={temp.series} type="donut" width="380" height={"300"} />
                        </TabPane>
                        <TabPane
                            tab={
                                <span>
          <Icon type="android" />
          Quarter
        </span>
                            }
                            key="3"
                        >
                            <Chart options={temp.options} series={temp.series} type="donut" width="380" height={"300"} />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Row type="flex">
                <Col span={6} order={1}>
                </Col>
                <Col span={6} order={2}>
                </Col>
                <Col span={6} order={4}>
                    <StickyContainer>

                    </StickyContainer>
                </Col>
            </Row>
     </div>
    );
};

export default Tracket;