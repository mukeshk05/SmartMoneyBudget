import React from "react";
import { Radio, Button, Col, Icon, Row, Select } from "antd";
import "../../../styles/index.css";
import { compose, graphql, Mutation, Query, withApollo } from "react-apollo";
import { yearEndDate, yearStartDate, durationType,mapView} from "../../common/Duration";
import moment from "moment";
import _ from "lodash";
import {USER_MONTEHLY_SPENDING} from "../../../graphql/queries/spending/SpendingQuery";
import {CREATE_SAVING} from "../../../graphql/mutation/savings/SavingsMutation";
import SpendingEditableTable from "./SpendingEditableTable";
const { Option } = Select;

class Spending extends React.Component {
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
                        query={USER_MONTEHLY_SPENDING}
                        variables={{
                            user_id: this.props.user.email,
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
                                const bills = data.billsAmounts;
                                const variableExpenseses = data.variableExpenseses;
                                const fixedExpenseses=data.fixedExpenseses;
                                let primaryTotalSalary = 0;
                                let spouseTotalSalary = 0;
                                for (let i in fixedExpenseses) {
                                    graphData1.push({
                                        topic: fixedExpenseses[i].fixed_expense_type.fixed_expense_type,
                                        month: moment(fixedExpenseses[i].transactionDate).format("MMMM"),
                                        primaryFixedExpenseses: Math.round((((fixedExpenseses[i].fixed_expense_amount)*mapView[fixedExpenseses[i].duration][fixedExpenseses[i].duration])/mapView[durationView][durationView])),
                                        spouseFixedExpenseses: Math.round((((fixedExpenseses[i].spouse_amount)*mapView[fixedExpenseses[i].spouse_duration][fixedExpenseses[i].spouse_duration])/mapView[durationView][durationView])),
                                        primaryBills:0,
                                        spouseBills:0,
                                        primaryVariableExpenseses:0,
                                        spouseVriableExpenseses:0,
                                        salary_benefit:Math.round((((fixedExpenseses[i].fixed_expense_amount)*mapView[fixedExpenseses[i].duration][fixedExpenseses[i].duration])/mapView[durationView][durationView]))+Math.round((((fixedExpenseses[i].spouse_amount)*mapView[fixedExpenseses[i].spouse_duration][fixedExpenseses[i].spouse_duration])/mapView[durationView][durationView])),
                                    });

                                    array1.push({
                                        key: fixedExpenseses[i].id,
                                        topic: fixedExpenseses[i].fixed_expense_type.fixed_expense_type,
                                        type: "fixedExpenseses",
                                        fixed_expense_type_id: fixedExpenseses[i].fixed_expense_type.id,
                                        user_id: fixedExpenseses[i].user_id,
                                        primaryduration: (
                                            <Select
                                                defaultValue={durationType[fixedExpenseses[i].duration]}
                                                onChange={e =>
                                                    this.handlePrimaryDurationChange(e, fixedExpenseses[i],"fixedExpenseses")
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
                                        primaryamount: fixedExpenseses[i].fixed_expense_amount,
                                        primaryDurationAmount:Math.round((((fixedExpenseses[i].fixed_expense_amount)*mapView[fixedExpenseses[i].duration][fixedExpenseses[i].duration])/mapView[durationView][durationView])),

                                        spouseduration: (
                                            <Select
                                                defaultValue={durationType[fixedExpenseses[i].spouse_duration]}
                                                onChange={e =>
                                                    this.handleSpouseDurationChange(e, fixedExpenseses[i],"fixedExpenseses")
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
                                        spouseamount: fixedExpenseses[i].spouse_amount,
                                        spouseDurationAmount:Math.round((((fixedExpenseses[i].spouse_amount)*mapView[fixedExpenseses[i].spouse_duration][fixedExpenseses[i].spouse_duration])/mapView[durationView][durationView]))
                                    });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((fixedExpenseses[i].fixed_expense_amount)*mapView[fixedExpenseses[i].duration][fixedExpenseses[i].duration])/mapView[durationView][durationView]));
                                    spouseTotalSalary =
                                        spouseTotalSalary + Math.round((((fixedExpenseses[i].spouse_amount)*mapView[fixedExpenseses[i].spouse_duration][fixedExpenseses[i].spouse_duration])/mapView[durationView][durationView]));
                                }
                                for (let i in bills) {
                                    graphData1.push({
                                        topic: bills[i].bill_type.bills_type,
                                        month: moment(bills[i].transactionDate).format("MMMM"),
                                        primaryBills: Math.round((((bills[i].bill_amount)*mapView[bills[i].duration][bills[i].duration])/mapView[durationView][durationView])),
                                        spouseBills: Math.round((((bills[i].spouse_amount)*mapView[bills[i].spouse_duration][bills[i].spouse_duration])/mapView[durationView][durationView])),
                                        primaryFixedExpenseses:0,
                                        spouseFixedExpenseses:0,
                                        primaryVariableExpenseses:0,
                                        spouseVriableExpenseses:0,
                                        salary_benefit:Math.round((((bills[i].bill_amount)*mapView[bills[i].duration][bills[i].duration])/mapView[durationView][durationView]))+Math.round((((bills[i].spouse_amount)*mapView[bills[i].spouse_duration][bills[i].spouse_duration])/mapView[durationView][durationView])),
                                    });

                                    array1.push({
                                        key: bills[i].id,
                                        topic: bills[i].bill_type.bills_type,
                                        type: "bills",
                                        bill_type_id: bills[i].bill_type.id,
                                        user_id: bills[i].user_id,
                                        primaryduration: (
                                            <Select
                                                defaultValue={durationType[bills[i].duration]}
                                                onChange={e =>
                                                    this.handlePrimaryDurationChange(e, bills[i],"bills")
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
                                        primaryamount: bills[i].bill_amount,
                                        primaryDurationAmount:Math.round((((bills[i].bill_amount)*mapView[bills[i].duration][bills[i].duration])/mapView[durationView][durationView])),

                                        spouseduration: (
                                            <Select
                                                defaultValue={durationType[bills[i].spouse_duration]}
                                                onChange={e =>
                                                    this.handleSpouseDurationChange(e, bills[i],"bills")
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
                                        spouseamount: bills[i].spouse_amount,
                                        spouseDurationAmount:Math.round((((bills[i].spouse_amount)*mapView[bills[i].spouse_duration][bills[i].spouse_duration])/mapView[durationView][durationView]))
                                    });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((bills[i].bill_amount)*mapView[bills[i].duration][bills[i].duration])/mapView[durationView][durationView]));
                                    spouseTotalSalary =
                                        spouseTotalSalary + Math.round((((bills[i].spouse_amount)*mapView[bills[i].spouse_duration][bills[i].spouse_duration])/mapView[durationView][durationView]));
                                }
                                for (let i in variableExpenseses) {
                                    graphData1.push({
                                        topic: variableExpenseses[i].variable_expense_type.variable_expense_type,
                                        month: moment(variableExpenseses[i].transactionDate).format("MMMM"),
                                        primaryVariableExpenseses:Math.round((((variableExpenseses[i].variable_expense_amount)*mapView[variableExpenseses[i].duration][variableExpenseses[i].duration])/mapView[durationView][durationView])),
                                        spouseVriableExpenseses:Math.round(( ((variableExpenseses[i].spouse_amount)*mapView[variableExpenseses[i].spouse_duration][variableExpenseses[i].spouse_duration])/mapView[durationView][durationView])),
                                        primaryFixedExpenseses:0,
                                        spouseFixedExpenseses:0,
                                        primaryBills:0,
                                        spouseBills:0,
                                        salary_benefit:Math.round((((variableExpenseses[i].variable_expense_amount)*mapView[variableExpenseses[i].duration][variableExpenseses[i].duration])/mapView[durationView][durationView]))+Math.round(( ((variableExpenseses[i].spouse_amount)*mapView[variableExpenseses[i].spouse_duration][variableExpenseses[i].spouse_duration])/mapView[durationView][durationView]))
                                    });

                                    array1.push({
                                        key: variableExpenseses[i].id,
                                        topic: variableExpenseses[i].variable_expense_type.variable_expense_type,
                                        variable_expense_type_id: variableExpenseses[i].variable_expense_type.id,
                                        user_id: variableExpenseses[i].user_id,
                                        type: "variableExpenseses",
                                        primaryduration: (
                                            <Select
                                                defaultValue={durationType[variableExpenseses[i].duration]}
                                                onChange={e =>
                                                    this.handlePrimaryDurationChange(e, variableExpenseses[i],"variableExpenseses")
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
                                        primaryamount: variableExpenseses[i].variable_expense_amount,
                                        primaryDurationAmount:Math.round((((variableExpenseses[i].variable_expense_amount)*mapView[variableExpenseses[i].duration][variableExpenseses[i].duration])/mapView[durationView][durationView])),
                                        spouseduration: (
                                            <Select
                                                defaultValue={
                                                    durationType[variableExpenseses[i].spouse_duration]
                                                }
                                                onChange={e =>
                                                    this.handleSpouseDurationChange(e, variableExpenseses[i],"variableExpenseses")
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
                                        spouseamount: variableExpenseses[i].spouse_amount,
                                        spouseDurationAmount:Math.round(( ((variableExpenseses[i].spouse_amount)*mapView[variableExpenseses[i].spouse_duration][variableExpenseses[i].spouse_duration])/mapView[durationView][durationView]))
                                    });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((variableExpenseses[i].variable_expense_amount)*mapView[variableExpenseses[i].duration][variableExpenseses[i].duration])/mapView[durationView][durationView]));
                                    spouseTotalSalary =
                                        spouseTotalSalary + Math.round(( ((variableExpenseses[i].spouse_amount)*mapView[variableExpenseses[i].spouse_duration][variableExpenseses[i].spouse_duration])/mapView[durationView][durationView]));
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
                                       if(temp12>0){
                                           chartData12.push({
                                               name:result1[i].name[j],
                                               data:temp12
                                           })
                                       }
                                    }
                                }
                                const labels=[];
                                const series=[];
                                _(chartData12).groupBy('name').map(function(item,name){
                                    if(item[0].data>0){
                                        console.log("Hello"+name);
                                        labels.push(name);
                                        series.push(item[0].data.reduce((a, b) => a + b, 0));
                                    }

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
                                    <SpendingEditableTable
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
                                        user={this.props.user}
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
)(withApollo(Spending));