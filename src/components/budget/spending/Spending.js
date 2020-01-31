import React from "react";
import {Radio, Button, Col, Icon, Row, Select, DatePicker} from "antd";
import "../../../styles/index.css";
import { compose, graphql, Mutation, Query, withApollo } from "react-apollo";
import {
    yearEndDate,
    yearStartDate,
    durationType,
    mapView,
    selectedDate,
    TrackerCategory,
    spendingCategory
} from "../../common/Duration";
import moment from "moment";
import _ from "lodash";
import {USER_MONTEHLY_SPENDING} from "../../../graphql/queries/spending/SpendingQuery";
import {CREATE_SAVING} from "../../../graphql/mutation/savings/SavingsMutation";
import SpendingEditableTable from "./SpendingEditableTable";
import {
    actualBudgetData,
    getActualBudgetBarChartDataByMonth,
    getActualBudgetData,
    getTrackerBarChartDataByMonth
} from "../../common/PrepareData";
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


    convertMinus=(number)=>{
        return  (number)*(-1)
    };


    render() {
        const currentDate=selectedDate.format("YYYY-MM-DD");
        const yearEndDate = moment(this.state.currentDate)
        .subtract( 1, "year")
        .format("YYYY-MM-DD");
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
                            tranaction_start_date:yearEndDate ,
                            transaction_end_date:currentDate
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
                            const trackersData = [];

                            if (data != null) {
                                const bills = data.billsAmounts;
                                const variableExpenseses = data.variableExpenseses;
                                const fixedExpenseses=data.fixedExpenseses;
                                let primaryTotalSalary = 0;
                                const trackers = data.trackers;
                                for (let i in fixedExpenseses) {
                                    array1.push({
                                        key: fixedExpenseses[i].id,
                                        subCategoryName:fixedExpenseses[i].fixed_expense_type.fixed_expense_type,
                                        topic: fixedExpenseses[i].fixed_expense_type.fixed_expense_type,
                                        categoryName: "Fixed Expenses",
                                        fixed_expense_type_id: fixedExpenseses[i].fixed_expense_type.id,
                                        user_id: fixedExpenseses[i].user_id,
                                        trackerAmount: fixedExpenseses[i].fixed_expense_amount,
                                        trackerMonth: moment(fixedExpenseses[i].transactionDate).format("MMMM"),
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
                                        primaryDurationAmount:Math.round((((fixedExpenseses[i].fixed_expense_amount)*mapView[fixedExpenseses[i].duration][fixedExpenseses[i].duration])/mapView[durationView][durationView])),
                                    });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((fixedExpenseses[i].fixed_expense_amount)*mapView[fixedExpenseses[i].duration][fixedExpenseses[i].duration])/mapView[durationView][durationView]));
                                    }
                                for (let i in bills) {
                                     array1.push({
                                        key: bills[i].id,
                                        subCategoryName:bills[i].bill_type.bills_type,
                                        topic: bills[i].bill_type.bills_type,
                                        categoryName: "Bills",
                                        bill_type_id: bills[i].bill_type.id,
                                        user_id: bills[i].user_id,
                                         trackerAmount: bills[i].bill_amount,
                                         trackerMonth: moment(bills[i].transactionDate).format("MMMM"),
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
                                        primaryDurationAmount:Math.round((((bills[i].bill_amount)*mapView[bills[i].duration][bills[i].duration])/mapView[durationView][durationView])),
                                        });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((bills[i].bill_amount)*mapView[bills[i].duration][bills[i].duration])/mapView[durationView][durationView]));
                                    }
                                for (let i in variableExpenseses) {
                                     array1.push({
                                        key: variableExpenseses[i].id,
                                        subCategoryName:variableExpenseses[i].variable_expense_type.variable_expense_type,
                                        topic: variableExpenseses[i].variable_expense_type.variable_expense_type,
                                        variable_expense_type_id: variableExpenseses[i].variable_expense_type.id,
                                        user_id: variableExpenseses[i].user_id,
                                         categoryName: "Variable Expenses",
                                         trackerAmount: variableExpenseses[i].variable_expense_amount,
                                         trackerMonth: moment(variableExpenseses[i].transactionDate).format("MMMM"),
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
                                        primaryDurationAmount:Math.round((((variableExpenseses[i].variable_expense_amount)*mapView[variableExpenseses[i].duration][variableExpenseses[i].duration])/mapView[durationView][durationView])),
                                     });
                                    primaryTotalSalary =
                                        primaryTotalSalary + Math.round((((variableExpenseses[i].variable_expense_amount)*mapView[variableExpenseses[i].duration][variableExpenseses[i].duration])/mapView[durationView][durationView]));
                                    }
                                for (let i in trackers) {
                                    if(trackers[i].duration in spendingCategory){
                                        trackersData.push(
                                            {
                                                key: trackers[i].id,
                                                user_id: trackers[i].user_id,
                                                categoryName:TrackerCategory[trackers[i].duration],
                                                description: trackers[i].description,
                                                trackerAmount:trackers[i].Amount,
                                                subCategoryName:trackers[i].Category.tracker_type.split("|")[1],
                                                trackerMonth: moment(trackers[i].tracker_date).format("MMMM")
                                            }

                                        );
                                    }


                                }
                                const eChartDataByMonth=getActualBudgetBarChartDataByMonth(array1,"Actual Budget","Actual Budget by Category","categoryType","trackerAmount");
                                const eChartTrackerDataByMonth=getTrackerBarChartDataByMonth(trackersData,"Monthly Category Tracker","Monthly Tracker by Category","categoryType","trackerAmount");
                                console.log(eChartDataByMonth);
                                const actualBudgetData=getActualBudgetData(array1);
                                const actualTrackerData=getActualBudgetData(trackersData);
                                const finalResultData=_.map(actualTrackerData,this.convertMinus);
                                return (
                                    <SpendingEditableTable
                                        salaryData={array1}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onRef={ref => (this.child = ref)}
                                        user={this.props.user}
                                        actualBudgetData={actualBudgetData}
                                        actualTrackerData={finalResultData}
                                        eChartDataByMonth={eChartDataByMonth}
                                        eChartTrackerDataByMonth={eChartTrackerDataByMonth}
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