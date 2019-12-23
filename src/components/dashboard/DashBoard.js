import React from "react";
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
const { Option } = Select;
const { Content } = Layout;
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      salaryData: [],
      durationView: 0
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    return (
      <Layout className="app">
        <HeaderRes user={this.props.user} />
        <Content className="content">
            <div style={{ background: "#ECECEC", padding: "30px" }}>
              <div className="flex-row">
                <div className="flex-col">
                  {" "}
                  <Card title="Monthly Saving " bordered={false} headStyle={{background:"#00a0e9"}}>
                    <SavingsChart
                      onRef={ref => (this.child = ref)}
                      chartData={this.props.chartData}
                      month={this.props.month}
                    />
                  </Card>
                </div>
                <div className="flex-col">
                  {" "}
                  <Card title="Saving By Category" bordered={false} headStyle={{background:"#00a0e9"}}>
                    <SavingTypeChart  style={{height:"580"}}
                      onRef={ref => (this.child = ref)}
                      spendingTypeChartLavel={this.props.spendingTypeChartLavel}
                      spendingTypeChartSeries={
                        this.props.spendingTypeChartSeries
                      }
                    />
                  </Card>
                </div>
                <div className="flex-col">
                  {" "}
                  <Card title="Saving By Individual " bordered={false} headStyle={{background:"#00a0e9"}}>
                    <SavingPaiChart
                      onRef={ref => (this.child = ref)}
                      paiChartData={this.props.paiChartData}
                      paiChartLabels={this.props.paiChartLabels}
                    />
                  </Card>
                </div>
              </div>
                <div className="flex-row">
                    <div className="flex-col">
                        <Card title="Total Saving By Individual " bordered={false} headStyle={{background:"#00a0e9"}}>
                            <Statistic
                                title="Primary Total Saving"
                                value={this.props.primaryTotalSaving}
                                precision={2}
                                valueStyle={{ color: '#00a0e9' }}
                                suffix={<Icon type="dollar" theme="twoTone" />}
                            />
                            <Statistic
                                title="Spouse Total Saving"
                                value={this.props.spouseTotalSaving}
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
                                value={this.props.primaryExtraTotalSaving}
                                precision={2}
                                valueStyle={{ color: '#28cf20' }}
                                suffix={<Icon type="dollar" theme="twoTone" />}

                            />
                            <Statistic
                                title="Spouse Total Extra Retirement Saving"
                                value={this.props.spouseExtraTotalSaving}
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
