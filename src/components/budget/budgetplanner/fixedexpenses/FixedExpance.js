import React from "react";
import {Button, Col, Icon, Popconfirm, Result, Row, Select} from "antd";
import "../../../../styles/index.css";
import {compose, graphql, Mutation, Query, withApollo} from "react-apollo";
import {
    USER_FIXED_EXPENSES_QUERY,
    USER_MONTEHLY_FIXED_EXPENSESG
} from "../../../../graphql/queries/fixedexpenses/FixedExpensesQuery";
import {CREATE_FIXED_EXPENSES} from "../../../../graphql/mutation/fixedexpenses/FixedExpensesMutation";
import FixedExpancesEditableTable from "./FixedExpancesEditableTable";
import AddAttributeForm from "../../../paystub/manual/manualfntryforms/AddAttributeForm";
import {durationType} from "../../../common/Duration";
import StartBudget from "../../../common/StartBudget";
import {
    HashRouter as Router,
    NavLink, Redirect,
    Route,
    withRouter
} from "react-router-dom";
import {getEChartData} from "../../../common/PrepareData";

const { Option } = Select;

class FixedExpance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intialData: [],
            salary_type: ""
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

    handlePrimaryDurationChange = (select, slId) => {
        this.child.handlePrimaryDurationChange(select, slId);
    };

    handleSpouseDurationChange = (select, slId) => {
        this.child.handleSpouseDurationChange(select, slId);
    };

    render() {
         return (
            <div className="ant-layout">
                <Router>
               <Row>
                    <Col span={5}>
                        <div>
                            {
                                <Button type="primary" onClick={this.showModal}>
                                    Add New Fixed Expenses Type
                                </Button>
                            }
                            <div>
                                <AddAttributeForm
                                    wrappedComponentRef={this.saveFormRef}
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    onCreate={e => {
                                        e.preventDefault();
                                        const { form } = this.formRef.props;
                                        form.validateFields((err, values) => {
                                            this.props.createFixedExpenseMutation({
                                                variables: {
                                                    fixed_expense_type: values.title,
                                                    transactionDate:(this.props.currentDate),
                                                    user_id: this.props.user.email
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: USER_MONTEHLY_FIXED_EXPENSESG,
                                                        variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                                                    }
                                                ]
                                            });
                                            form.resetFields();
                                            this.setState({ visible: false });
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Query query={USER_MONTEHLY_FIXED_EXPENSESG} variables={{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}} notifyOnNetworkStatusChange={true} fetchPolicy={"cache-and-network"}>
                    {({ loading, error, data }) => {
                        if (loading)
                            return (
                                <div style={{ align: "center" }}>
                                    <Icon type="loading" />
                                </div>
                            );
                        if (error) return <div>Error</div>;
                        const array1 = [];
                       if (data != null && data.fixedExpenseses.length>0) {
                            const tempData = data.fixedExpenseses;
                            let primaryTotalSalary = 0;
                            let spouseTotalSalary = 0;
                            for (let i in tempData) {
                                array1.push({
                                    key: tempData[i].id,
                                    topic: tempData[i].fixed_expense_type.fixed_expense_type,
                                    fixed_expense_type_id: tempData[i].fixed_expense_type.id,
                                    user_id: tempData[i].user_id,
                                    primaryduration: (
                                        <Select
                                            defaultValue={durationType[tempData[i].duration]}
                                            onChange={e =>
                                                this.handlePrimaryDurationChange(e, tempData[i])
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
                                    primaryamount: tempData[i].fixed_expense_amount,
                                });
                                primaryTotalSalary =
                                    primaryTotalSalary + tempData[i].fixed_expense_amount;
                            }

                            const eChartData=getEChartData(tempData,"Fixed Expenses","Fixed Expenses by Category");
                            return (
                                <FixedExpancesEditableTable
                                    startDate={this.props.startDate} endDate={this.props.endDate}
                                    salaryData={array1}
                                    primaryTotalSalary={primaryTotalSalary}
                                    spouseTotalSalary={spouseTotalSalary}
                                    onRef={ref => (this.child = ref)}
                                    user={this.props.user}
                                    eChartData={eChartData}
                                />
                            );
                        }
                        else{
                           return (

                             <StartBudget
                                 user={this.props.user}
                                 startDate={this.props.startDate}
                                 onRef={ref => (this.child = ref)}
                             />

                               );


                        }
                    }}
                </Query>
                </Router>
            </div>

        );
    }
}
export default compose(
    graphql(CREATE_FIXED_EXPENSES, { name: "createFixedExpenseMutation" })
)(withApollo(FixedExpance));