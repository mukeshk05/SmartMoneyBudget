import React from "react";
import { Radio, Button, Col, Icon, Row, Select } from "antd";
import "../../../styles/index.css";
import { compose, graphql, Mutation, Query, withApollo } from "react-apollo";
import IncomeEditableTable from "./IncomeEditableTable";
import { USER_MONTEHLY_INCOME } from "../../../graphql/queries/income/IncomeQuery";
import { CREATE_SAVING } from "../../../graphql/mutation/savings/SavingsMutation";
import { yearEndDate, yearStartDate, durationType,mapView} from "../../common/Duration";
import moment from "moment";
import _ from "lodash";
const { Option } = Select;

class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durationView:0,
      startDate: yearStartDate,
      endDate: yearEndDate,
      disabled: [],
      chartColors: {
        primaryBenefit: "#e96d8d",
        spouseBenefit: "#40ee86",
        primarySalary: "#67d6c0",
        spouseSalary: "#127197"
      }
    };
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
    this.setState({ formRef: formRef });
  };

  handlePrimaryDurationChange = (select, slId,type) => {
    this.child.handlePrimaryDurationChange(select, slId,type);
  };

  handleSpouseDurationChange = (select, slId,type) => {
    this.child.handleSpouseDurationChange(select, slId,type);
  };



  render() {
    const durationView=this.state.durationView;
    return (
        <div className="ant-layout">




          <Radio.Group defaultValue="0" buttonStyle="solid" onChange={e=>{
            this.setState({durationView:e.target.value})
          }}>
            <Radio.Button value="0">Annually</Radio.Button>
            <Radio.Button value="1">Quarterly</Radio.Button>
            <Radio.Button value="2">Monthly</Radio.Button>
            <Radio.Button value="3">Weekly</Radio.Button>
            <Radio.Button value="4">Fortnightly</Radio.Button>
          </Radio.Group>




          {
            <Query
                query={USER_MONTEHLY_INCOME}
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
                const array1 = [];
                let graphData1 = [];

                if (data != null) {
                  const salaries = data.salaries;
                  const benefitses = data.benefitses;

                  let primaryTotalSalary = 0;
                  let spouseTotalSalary = 0;
                  let series = [];
                  for (let i in salaries) {
                    graphData1.push({
                      topic: salaries[i].salary_category_id.salary_type_name,
                      month: moment(benefitses[i].transactionDate).format("MMMM"),
                      primarySalary: Math.round((((salaries[i].salary_amount)*mapView[salaries[i].duration][salaries[i].duration])/mapView[durationView][durationView])),
                      spouseSalary: Math.round((((salaries[i].spouse_salary)*mapView[salaries[i].spouse_duration][salaries[i].spouse_duration])/mapView[durationView][durationView])),
                      salary_benefit:Math.round((((salaries[i].salary_amount)*mapView[salaries[i].duration][salaries[i].duration])/mapView[durationView][durationView]))+Math.round((((salaries[i].spouse_salary)*mapView[salaries[i].spouse_duration][salaries[i].spouse_duration])/mapView[durationView][durationView])),
                      primaryBenefit: 0,
                      spouseBenefit: 0
                    });

                    array1.push({
                      key: salaries[i].id,
                      topic: salaries[i].salary_category_id.salary_type_name,
                      type: "Salary",
                      salary_category_id: salaries[i].salary_category_id.id,
                      user_id: salaries[i].user_id,
                      primaryduration: (
                          <Select
                              defaultValue={durationType[salaries[i].duration]}
                              onChange={e =>
                                  this.handlePrimaryDurationChange(e, salaries[i],"Salary")
                              }
                              showSearch
                              style={{ width: 100 }}
                              placeholder="Select a type"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                  option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                              }
                          >
                            {durationType.map(duration => (
                                <Option key={duration} value={duration}>
                                  {duration}
                                </Option>
                            ))}
                          </Select>
                      ),
                      primaryamount: salaries[i].salary_amount,
                      primaryDurationAmount:Math.round((((salaries[i].salary_amount)*mapView[salaries[i].duration][salaries[i].duration])/mapView[durationView][durationView])),

                      spouseduration: (
                          <Select
                              defaultValue={durationType[salaries[i].spouse_duration]}
                              onChange={e =>
                                  this.handleSpouseDurationChange(e, salaries[i],"Salary")
                              }
                              showSearch
                              style={{ width: 100 }}
                              placeholder="Select a type"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                  option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                              }
                          >
                            {durationType.map(duration => (
                                <Option key={duration} value={duration}>
                                  {duration}
                                </Option>
                            ))}
                          </Select>
                      ),
                      spouseamount: salaries[i].spouse_salary,
                      spouseDurationAmount:Math.round((((salaries[i].spouse_salary)*mapView[salaries[i].spouse_duration][salaries[i].spouse_duration])/mapView[durationView][durationView]))
                    });
                    primaryTotalSalary =
                        primaryTotalSalary + Math.round((((salaries[i].salary_amount)*mapView[salaries[i].duration][salaries[i].duration])/mapView[durationView][durationView]));
                    spouseTotalSalary =
                        spouseTotalSalary + Math.round((((salaries[i].spouse_salary)*mapView[salaries[i].spouse_duration][salaries[i].spouse_duration])/mapView[durationView][durationView]));
                  }

                  for (let i in benefitses) {
                    graphData1.push({
                      topic: benefitses[i].benefit_type.benefit_type,
                      month: moment(benefitses[i].transactionDate).format("MMMM"),
                      primarySalary: 0,
                      spouseSalary: 0,
                      primaryBenefit:Math.round((((benefitses[i].salary_amount)*mapView[benefitses[i].duration][benefitses[i].duration])/mapView[durationView][durationView])),
                      spouseBenefit:Math.round(( ((benefitses[i].spouse_amount)*mapView[benefitses[i].spouse_duration][benefitses[i].spouse_duration])/mapView[durationView][durationView])),
                      salary_benefit:Math.round((((benefitses[i].salary_amount)*mapView[benefitses[i].duration][benefitses[i].duration])/mapView[durationView][durationView]))+Math.round(( ((benefitses[i].spouse_amount)*mapView[benefitses[i].spouse_duration][benefitses[i].spouse_duration])/mapView[durationView][durationView]))
                    });

                    array1.push({
                      key: benefitses[i].id,
                      topic: benefitses[i].benefit_type.benefit_type,
                      benefit_type_id: benefitses[i].benefit_type.id,
                      user_id: benefitses[i].user_id,
                      type: "Benefit",
                      primaryduration: (
                          <Select
                              defaultValue={durationType[benefitses[i].duration]}
                              onChange={e =>
                                  this.handlePrimaryDurationChange(e, benefitses[i],"Benefit")
                              }
                              showSearch
                              style={{ width: 100 }}
                              placeholder="Select a type"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                  option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                              }
                          >
                            {durationType.map(duration => (
                                <Option key={duration} value={duration}>
                                  {duration}
                                </Option>
                            ))}
                          </Select>
                      ),
                      primaryamount: benefitses[i].salary_amount,
                      primaryDurationAmount:Math.round((((benefitses[i].salary_amount)*mapView[benefitses[i].duration][benefitses[i].duration])/mapView[durationView][durationView])),
                      spouseduration: (
                          <Select
                              defaultValue={
                                durationType[benefitses[i].spouse_duration]
                              }
                              onChange={e =>
                                  this.handleSpouseDurationChange(e, benefitses[i],"Benefit")
                              }
                              showSearch
                              style={{ width: 100 }}
                              placeholder="Select a type"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                  option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                              }
                          >
                            {durationType.map(duration => (
                                <Option key={duration} value={duration}>
                                  {duration}
                                </Option>
                            ))}
                          </Select>
                      ),
                      spouseamount: benefitses[i].spouse_amount,
                      spouseDurationAmount:Math.round(( ((benefitses[i].spouse_amount)*mapView[benefitses[i].spouse_duration][benefitses[i].spouse_duration])/mapView[durationView][durationView]))
                    });
                    primaryTotalSalary =
                        primaryTotalSalary + Math.round((((benefitses[i].salary_amount)*mapView[benefitses[i].duration][benefitses[i].duration])/mapView[durationView][durationView]));
                    spouseTotalSalary =
                        spouseTotalSalary + Math.round(( ((benefitses[i].spouse_amount)*mapView[benefitses[i].spouse_duration][benefitses[i].spouse_duration])/mapView[durationView][durationView]));
                  }
                  const month = [];




                  let chartData12=[];
                  const result1 = _(graphData1)
                      .groupBy('month')
                      .map(function(items, month) {
                        return {
                          month: month,
                          name:_.map(items, 'topic'),
                          data: _.map(items, 'salary_benefit')
                        };
                      }).value();

                  for(let i in result1){
                    month.push(result1[i].month);
                    for(let j in result1[i].name){
                      let temp12=[...Array(result1.length)].map(x=>0);
                      temp12.splice(i,1,result1[i].data[j]);
                      chartData12.push({
                        name:result1[i].name[j],
                        data:temp12
                      })
                    }
                  }

                  let primarySalaryPai = 0;
                  let spouseSalaryPai = 0;
                  let primaryBenfitsPai = 0;
                  let spouseBenfitsPai = 0;

                  graphData1.filter(value => {
                    primarySalaryPai = primarySalaryPai + value.primarySalary;
                    spouseSalaryPai = spouseSalaryPai + value.spouseSalary;
                    primaryBenfitsPai = primaryBenfitsPai + value.primaryBenefit;
                    spouseBenfitsPai = spouseBenfitsPai + value.spouseBenefit;
                  });

                  let paiChartData = [
                    primarySalaryPai,
                    spouseSalaryPai,
                    primaryBenfitsPai,
                    spouseBenfitsPai
                  ];
                 let incomePaiChartLavels= ['Primary Salary', 'Spouse Salary', 'Primary Benefits', 'Spouse Benefits'];

                  return (
                      <IncomeEditableTable
                          startDate={this.state.startDate}
                          endDate={this.state.endDate}
                          salaryData={array1}
                          primaryTotalSalary={primaryTotalSalary}
                          spouseTotalSalary={spouseTotalSalary}
                          onRef={ref => (this.child = ref)}
                          chartData={chartData12}
                          month={month}
                          paiChartData={paiChartData}
                          durationView={durationView}
                          incomePaiChartLavels={incomePaiChartLavels}
                      />
                  );
                }
              }}
            </Query>
          }
        </div>
    );
  }
}
export default compose(
    graphql(CREATE_SAVING, { name: "createSavingsMutation" })
)(withApollo(Income));