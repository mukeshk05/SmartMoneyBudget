import React, {useEffect, useRef, useState} from "react";
import {
    Table,
    Input,
    Popconfirm,
    Form,
    Statistic,
    Select,
    Row,
    Col,
    Divider,
    Layout,
    Card, Icon
} from "antd";
import BudgetFooter from "../footer/Footer";
import SavingsChart from "../budget/savings/SavingsChart";
import SavingTypeChart from "../budget/savings/SavingsTypeChart";
import SavingPaiChart from "../budget/savings/SavingsPaiChart";
import HeaderRes from "../header/Header";
import {useDispatch} from "react-redux";
import CURRENT_COMPONENT from "../../reducers/types";
const { Option } = Select;
const { Content } = Layout;
const DashBoard = props =>{

    const [collapsed, onCollapse] = useState(false);
    const inputRef = useRef();
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch({
                type: CURRENT_COMPONENT,
                payload: { component: "dashboard", sideBarMenuKey: "dashboard" }
            });
        },
        [dispatch]
    );

    {
    return (
      <Layout className="app">
        <HeaderRes user={props.user} />
        <Content className="content">

            <div style={{ background: "#ECECEC", padding: "30px" }}>
                <div className="flex-row">
                    <div className="flex-col">
                        {" "}
                        <Card title="Monthly Saving " bordered={false} headStyle={{background:"#00a0e9"}}>
                            <SavingsChart
                                 chartData={props.chartData}
                                month={props.month}
                            />
                        </Card>
                    </div>
                    <div className="flex-col">
                        {" "}
                        <Card title="Saving By Category" bordered={false} headStyle={{background:"#00a0e9"}}>
                            <SavingTypeChart  style={{height:"580"}}
                                              spendingTypeChartLavel={props.spendingTypeChartLavel}
                                              spendingTypeChartSeries={
                                                  props.spendingTypeChartSeries
                                              }
                            />
                        </Card>
                    </div>
                    <div className="flex-col">
                        {" "}
                        <Card title="Saving By Individual " bordered={false} headStyle={{background:"#00a0e9"}}>
                            <SavingPaiChart
                                paiChartData={props.paiChartData}
                                paiChartLabels={props.paiChartLabels}
                            />
                        </Card>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="flex-col">
                        <Card title="Total Saving By Individual " bordered={false} headStyle={{background:"#00a0e9"}}>
                            <Statistic
                                title="Primary Total Saving"
                                value={props.primaryTotalSaving}
                                precision={2}
                                valueStyle={{ color: '#00a0e9' }}
                                suffix={<Icon type="dollar" theme="twoTone" />}
                            />
                            <Statistic
                                title="Spouse Total Saving"
                                value={props.spouseTotalSaving}
                                precision={2}
                                valueStyle={{ color: '#00a0e9' }}
                                suffix={<Icon type="dollar" theme="twoTone" />}
                            />
                        </Card>
                    </div>
                    <div className="flex-col">
                        <Card title="Total Extra Retirement Saving By Individual" bordered={false} headStyle={{background:"#00a0e9"}}>
                            <Statistic
                                title="Primary Total Extra Retirement Saving"
                                value={props.primaryExtraTotalSaving}
                                precision={2}
                                valueStyle={{ color: '#28cf20' }}
                                suffix={<Icon type="dollar" theme="twoTone" />}

                            />
                            <Statistic
                                title="Spouse Total Extra Retirement Saving"
                                value={props.spouseExtraTotalSaving}
                                precision={2}
                                valueStyle={{ color: '#28cf20' }}
                                suffix={<Icon type="dollar"  theme="twoTone"/>}

                            />
                        </Card>
                    </div>
                    <div className="flex-col">

                    </div>
                </div>
            </div>
        </Content>
        <BudgetFooter />
      </Layout>
    );
  }
}

export default (DashBoard);
