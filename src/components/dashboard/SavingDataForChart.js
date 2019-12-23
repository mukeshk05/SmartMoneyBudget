import React from "react";
import { Radio, Icon,  Select, Layout } from "antd";
import "../../styles/index.css";
import { compose, graphql, Query, withApollo } from "react-apollo";
import DashBoard from "./DashBoard";
import { CREATE_SAVING } from "../../graphql/mutation/savings/SavingsMutation";
import { yearEndDate, yearStartDate } from "../common/Duration";
import { USER_ALL_MONTHELY_SAVINGS } from "../../graphql/queries/savings/SavingsQuery";
import { savingChartData} from "../common/PrepareData";
import HeaderRes from "../header/Header";
const { Content } = Layout;

class SavingDataForChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durationView: 0,
      startDate: yearStartDate,
      endDate: yearEndDate
    };
  }

  render() {
    const durationView = this.state.durationView;

    return (
      <div className="ant-layout">
        <Layout className="app">
          <HeaderRes user={this.props.user} />
          <Content className="content">
            <Layout style={{ padding: "0px 0px" }}>
              <Radio.Group
                defaultValue="0"
                buttonStyle="solid"
                onChange={e => {
                  this.setState({ durationView: e.target.value });
                }}
              >
                <Radio.Button value="0">Annually</Radio.Button>
                <Radio.Button value="1">Quarterly</Radio.Button>
                <Radio.Button value="2">Monthly</Radio.Button>
                <Radio.Button value="3">Weekly</Radio.Button>
                <Radio.Button value="4">Fortnightly</Radio.Button>
              </Radio.Group>
              {
                <Query
                  query={USER_ALL_MONTHELY_SAVINGS}
                  variables={{
                    tranaction_start_date: this.state.endDate,
                    transaction_end_date: this.state.startDate
                  }}
                  fetchPolicy={"network-only"}
                >
                  {({ loading, error, data }) => {
                    if (loading)
                      return (
                        <div style={{ align: "center" }}>
                          <Icon type="loading" />
                        </div>
                      );
                    if (error) return <div>Error</div>;

                    if (data != null) {
                      const {
                        chartData12,
                        month,
                        paiChartData,
                        labels,
                        series,
                        paiChartLabels,
                        primaryTotalSaving,spouseTotalSaving ,primaryExtraTotalSaving,spouseExtraTotalSaving
                      } = savingChartData(data, durationView);

                      return (
                        <DashBoard
                          onRef={ref => (this.child = ref)}
                          chartData={chartData12}
                          month={month}
                          paiChartData={paiChartData}
                          durationView={durationView}
                          spendingTypeChartLavel={labels}
                          spendingTypeChartSeries={series}
                          paiChartLabels={paiChartLabels}
                          primaryTotalSaving={primaryTotalSaving}
                          spouseTotalSaving={spouseTotalSaving} primaryExtraTotalSaving={primaryExtraTotalSaving} spouseExtraTotalSaving={spouseExtraTotalSaving}
                          user={this.props.user}
                        />
                      );
                    }
                  }}
                </Query>
              }
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default compose(
  graphql(CREATE_SAVING, { name: "createSavingsMutation" })
)(withApollo(SavingDataForChart));
