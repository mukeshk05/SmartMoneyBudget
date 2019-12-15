import React from "react";
import { Radio, Button, Col, Icon, Row, Select } from "antd";
import "../../../styles/index.css";
import { compose, graphql, Mutation, Query, withApollo } from "react-apollo";
import { yearEndDate, yearStartDate, durationType,mapView} from "../../common/Duration";
import moment from "moment";
import _ from "lodash";
import {CREATE_SAVING} from "../../../graphql/mutation/savings/SavingsMutation";
import {USER_ALL_MONTHELY_SAVINGS} from "../../../graphql/queries/savings/SavingsQuery";
import SavingsEditableTable from "../budgetplanner/savings/SavingsEditableTable";
const { Option } = Select;

class Saving extends React.Component {
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
                            const array1 = [];
                            let graphData1 = [];

                            if (data != null) {
                                const savings = data.savings;
                                const extraRetirementSavingses = data.extraRetirementSavingses;
                                let primaryTotalSalary = 0;
                                let spouseTotalSalary = 0;
                                for (let i in savings) {
                                    graphData1.push({
                                        topic: savings[i].saving_type.saving_type,
                                        month: moment(savings[i].transactionDate).format("MMMM"),
                                        primarySavings: Math.round((((savings[i].saving_amount)*mapView[savings[i].duration][savings[i].duration])/mapView[durationView][durationView])),
                                        spouseSavings: Math.round((((savings[i].spouse_amount)*mapView[savings[i].spouse_duration][savings[i].spouse_duration])/mapView[durationView][durationView])),
                                        primaryExtraRetirementSavingses:0,
                                        spouseExtraRetirementSavingses:0,
                                        salary_benefit:Math.round((((savings[i].saving_amount)*mapView[savings[i].duration][savings[i].duration])/mapView[durationView][durationView]))+Math.round((((savings[i].spouse_amount)*mapView[savings[i].spouse_duration][savings[i].spouse_duration])/mapView[durationView][durationView])),
                                    });

                                    array1.push({
                                        key: savings[i].id,
                                        topic: savings[i].saving_type.saving_type,
                                        type: "savings",
                                        fixed_expense_type_id: savings[i].saving_type.id,
                                        user_id: savings[i].user_id,
                                        primaryduration: (
                                            <Select
                                                defaultValue={durationType[savings[i].duration]}
                                                onChange={e =>
                                                    this.handlePrimaryDurationChange(e, savings[i],"savings")
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
                                        primaryamount: savings[i].saving_amount,
                                        primaryDurationAmount:Math.round((((savings[i].saving_amount)*mapView[savings[i].duration][savings[i].duration])/mapView[durationView][durationView])),

                                        spouseduration: (
                                            <Select
                                                defaultValue={durationType[savings[i].spouse_duration]}
                                                onChange={e =>
                                                    this.handleSpouseDurationChange(e, savings[i],"savings")
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
                                        spouseamount: savings[i].spouse_amount,
                                        spouseDurationAmount:Math.round((((savings[i].spouse_amount)*mapView[savings[i].spouse_duration][savings[i].spouse_duration])/mapView[durationView][durationView]))
                                    });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((savings[i].spouse_amount)*mapView[savings[i].duration][savings[i].duration])/mapView[durationView][durationView]));
                                    spouseTotalSalary =
                                        spouseTotalSalary + Math.round((((savings[i].spouse_amount)*mapView[savings[i].spouse_duration][savings[i].spouse_duration])/mapView[durationView][durationView]));
                                }
                                for (let i in extraRetirementSavingses) {
                                    graphData1.push({
                                        topic: extraRetirementSavingses[i].extra_retirement_saving_type.extra_retirement_saving_type,
                                        month: moment(extraRetirementSavingses[i].transactionDate).format("MMMM"),
                                        primaryExtraRetirementSavingses: Math.round((((extraRetirementSavingses[i].extra_retirement_saving_amount)*mapView[extraRetirementSavingses[i].duration][extraRetirementSavingses[i].duration])/mapView[durationView][durationView])),
                                        spouseExtraRetirementSavingses: Math.round((((extraRetirementSavingses[i].spouse_amount)*mapView[extraRetirementSavingses[i].spouse_duration][extraRetirementSavingses[i].spouse_duration])/mapView[durationView][durationView])),
                                        primarySavings:0,
                                        spouseSavings:0,
                                        salary_benefit:Math.round((((extraRetirementSavingses[i].extra_retirement_saving_amount)*mapView[extraRetirementSavingses[i].duration][extraRetirementSavingses[i].duration])/mapView[durationView][durationView]))+Math.round((((extraRetirementSavingses[i].spouse_amount)*mapView[extraRetirementSavingses[i].spouse_duration][extraRetirementSavingses[i].spouse_duration])/mapView[durationView][durationView])),
                                    });

                                    array1.push({
                                        key: extraRetirementSavingses[i].id,
                                        topic: extraRetirementSavingses[i].extra_retirement_saving_type.extra_retirement_saving_type,
                                        type: "extraRetirementSavingses",
                                        bill_type_id: extraRetirementSavingses[i].extra_retirement_saving_type.id,
                                        user_id: extraRetirementSavingses[i].user_id,
                                        primaryduration: (
                                            <Select
                                                defaultValue={durationType[extraRetirementSavingses[i].duration]}
                                                onChange={e =>
                                                    this.handlePrimaryDurationChange(e, extraRetirementSavingses[i],"extraRetirementSavingses")
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
                                        primaryamount: extraRetirementSavingses[i].extra_retirement_saving_amount,
                                        primaryDurationAmount:Math.round((((extraRetirementSavingses[i].extra_retirement_saving_amount)*mapView[extraRetirementSavingses[i].duration][extraRetirementSavingses[i].duration])/mapView[durationView][durationView])),

                                        spouseduration: (
                                            <Select
                                                defaultValue={durationType[extraRetirementSavingses[i].spouse_duration]}
                                                onChange={e =>
                                                    this.handleSpouseDurationChange(e, extraRetirementSavingses[i],"extraRetirementSavingses")
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
                                        spouseamount: extraRetirementSavingses[i].spouse_amount,
                                        spouseDurationAmount:Math.round((((extraRetirementSavingses[i].spouse_amount)*mapView[extraRetirementSavingses[i].spouse_duration][extraRetirementSavingses[i].spouse_duration])/mapView[durationView][durationView]))
                                    });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((extraRetirementSavingses[i].bill_amount)*mapView[extraRetirementSavingses[i].duration][extraRetirementSavingses[i].duration])/mapView[durationView][durationView]));
                                    spouseTotalSalary =
                                        spouseTotalSalary + Math.round((((extraRetirementSavingses[i].spouse_amount)*mapView[extraRetirementSavingses[i].spouse_duration][extraRetirementSavingses[i].spouse_duration])/mapView[durationView][durationView]));
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
                                const labels=[];
                                const series=[];
                                _(chartData12).groupBy('name').map(function(item,name){
                                    labels.push(name);
                                    series.push(item[0].data.reduce((a, b) => a + b, 0));
                                }).value();

                                let primaryFixedExpenseses = 0;
                                let spouseFixedExpenseses = 0;
                                let primaryBills = 0;
                                let spouseBills = 0;
                                let primaryVariableExpenseses = 0;
                                let spouseVriableExpenseses = 0;

                                graphData1.filter(value => {
                                    primaryFixedExpenseses = primaryFixedExpenseses + value.primaryFixedExpenseses;
                                    spouseFixedExpenseses = spouseFixedExpenseses + value.spouseFixedExpenseses;
                                    primaryBills = primaryBills + value.primaryBills;
                                    spouseBills = spouseBills + value.spouseBills;
                                    primaryVariableExpenseses = primaryVariableExpenseses + value.primaryVariableExpenseses;
                                    spouseVriableExpenseses = spouseVriableExpenseses + value.spouseVriableExpenseses;
                                });

                                let paiChartData = [
                                    primaryFixedExpenseses,
                                    spouseFixedExpenseses,
                                    primaryBills,
                                    spouseBills,
                                    primaryVariableExpenseses,
                                    spouseVriableExpenseses
                                ];
                                const  paiChartLabels= ['Primary Fixed Expenses','Spouse Fixed Expenses','Primary Bills','Spouse Bills','Primary Variable Expenses','Spouse Variable Expenses' ];
                                return (
                                    <SavingsEditableTable
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
                                        spendingTypeChartLavel={labels}
                                        spendingTypeChartSeries={series}
                                        paiChartLabels={paiChartLabels}
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
)(withApollo(Saving));