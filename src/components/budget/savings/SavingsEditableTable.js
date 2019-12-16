import React from "react";
import {
    Table,
    Input,
    Popconfirm,
    Form,
    Statistic,
    Select,
    Row,
    Col, Divider
} from "antd";
import "../css/Editabletable.css";
import { compose, Mutation, withApollo, graphql } from "react-apollo";
import { USER_MONTEHLY_SAVING } from "../../../graphql/queries/savings/SavingsQuery";
import EditableFormRow from "../../common/EditableFormRow";
import EditableCell from "../../common/EditableTableRow";
import {USER_MONTEHLY_INCOME} from "../../../graphql/queries/income/IncomeQuery";
import {durationType, mapView} from "../../common/Duration";
import {
    DELETE_FIXED_EXPENSES,
    UPDATE_FIXED_EXPENSES
} from "../../../graphql/mutation/fixedexpenses/FixedExpensesMutation";
import {
    DELETE_VARIABLE_EXPENSES,
    UPDATE_VARIABLE_EXPENSES
} from "../../../graphql/mutation/variableexpenses/VariableExpensesMutation";
import {DELETE_BILL, UPDATE_BILL} from "../../../graphql/mutation/bills/BillsMutation";
import {USER_MONTEHLY_SPENDING} from "../../../graphql/queries/spending/SpendingQuery";
import SavingsChart from "./SavingsChart";
import SavingTypeChart from "./SavingsTypeChart";
import SavingPaiChart from "./SavingsPaiChart";
import {DELETE_SAVING, UPDATE_SAVING} from "../../../graphql/mutation/savings/SavingsMutation";
import {
    DELETE_EXTRA_RET_SAVING,
    UPDATE_EXTRA_RET_SAVING
} from "../../../graphql/mutation/extraretirementsavings/ExtraRetirementSavingsMutation";
const { Option } = Select;

class SavingsEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            salaryData: [],
            durationView:0
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setState({ salaryData: this.props.salaryData });
        this.setState({durationView:this.props.durationView})
    }

    componentWillReceiveProps(newProps) {
        this.setState({ salaryData: newProps.salaryData });
    }

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width
            };
            return { columns: nextColumns };
        });
    };

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter
        });
    };

    handleDelete = key => {
        this.props.deleteSavingMutation({
            variables: {
                id: key
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_SAVING,
                    variables: {
                        tranaction_start_date: this.props.startDate,
                        transaction_end_date: this.props.endDate
                    }
                }
            ]
        });
        //const salaryData = [...this.state.salaryData];
        //this.setState({ salaryData: salaryData.filter(item => item.key !== key) });
    };

    handleSave = row => {
        const newData = [...this.state.salaryData];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });

        let primaryDuration = durationType.findIndex(
            item => row.primaryduration.props.defaultValue === item
        );
        let spouseDuration = durationType.findIndex(
            item => row.spouseduration.props.defaultValue === item
        );

        if (row.type === "bills") {
            this.props.updateBillMutation({
                variables: {
                    user_id: row.user_id,
                    duration: primaryDuration,
                    bill_amount: parseFloat(row.primaryamount),
                    bill_type: row.bill_type_id,
                    id: row.key,
                    spouse_amount: parseFloat(row.spouseamount),
                    spouse_duration: spouseDuration
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables: {
                            tranaction_start_date: this.props.endDate,
                            transaction_end_date: this.props.startDate
                        }
                    }
                ]
            });
        } else if(row.type === "variableExpenseses") {
            this.props.updateVariableExpansesMutation({
                variables: {
                    user_id: row.user_id,
                    duration: primaryDuration,
                    variable_expense_amount: parseFloat(row.primaryamount),
                    variable_expense_type: row.variable_expense_type_id,
                    id: row.key,
                    spouse_amount: parseFloat(row.spouseamount),
                    spouse_duration: spouseDuration
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables: {
                            tranaction_start_date: this.props.endDate,
                            transaction_end_date: this.props.startDate
                        }
                    }
                ]
            });
        }
        else{
            this.props.updateFixedExpansesMutation({
                variables: {
                    user_id: row.user_id,
                    duration: primaryDuration,
                    fixed_expense_amount: parseFloat(row.primaryamount),
                    fixed_expense_type: row.fixed_expense_type_id,
                    id: row.key,
                    spouse_amount: parseFloat(row.spouseamount),
                    spouse_duration: spouseDuration
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables: {
                            tranaction_start_date: this.props.endDate,
                            transaction_end_date: this.props.startDate
                        }
                    }
                ]
            });
        }
        this.setState({ salaryData: newData });
    };

    handlePrimaryDurationChange = (value, slId,type) => {
        let primaryDuration = durationType.findIndex(item => value === item);
        if (type === "bills"){
            this.props.updateBillMutation({
                variables: {
                    user_id: slId.user_id,
                    duration: primaryDuration,
                    bill_type: slId.bill_type.id,
                    id: slId.id
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables: {
                            tranaction_start_date: this.props.endDate,
                            transaction_end_date: this.props.startDate
                        }
                    }
                ]
            });
        }
       else if(type === "variableExpenseses") {
            this.props.updateVariableExpansesMutation({
                variables: {
                    user_id: slId.user_id,
                    duration: primaryDuration,
                    variable_expense_type: slId.variable_expense_type.id,
                    id: slId.id
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables: {
                            tranaction_start_date: this.props.endDate,
                            transaction_end_date: this.props.startDate
                        }
                    }
                ]
            });

        }else{
            this.props.updateFixedExpansesMutation({
                variables: {
                    user_id: slId.user_id,
                    duration: primaryDuration,
                    fixed_expense_type: slId.fixed_expense_type.id,
                    id: slId.id
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables: {
                            tranaction_start_date: this.props.endDate,
                            transaction_end_date: this.props.startDate
                        }
                    }
                ]
            });
        }

    };

    handleSpouseDurationChange = (value, slId,type) => {
        let spouseDuration = durationType.findIndex(item => value === item);
        if (type === "bills"){
            this.props.updateBillMutation({
                variables: {
                    user_id: slId.user_id,
                    spouse_duration: spouseDuration,
                    bill_type: slId.bill_type.id,
                    id: slId.id
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables:{tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                    }
                ]
            });
        }
        else if(type === "variableExpenseses") {
            this.props.updateVariableExpansesMutation({
                variables: {
                    user_id: slId.user_id,
                    spouse_duration: spouseDuration,
                    variable_expense_type: slId.variable_expense_type.id,
                    id: slId.id
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables:{tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                    }
                ]
            });

        }else{
            this.props.updateFixedExpansesMutation({
                variables: {
                    user_id: slId.user_id,
                    spouse_duration: spouseDuration,
                    fixed_expense_type: slId.fixed_expense_type.id,
                    id: slId.id
                },
                refetchQueries: [
                    {
                        query: USER_MONTEHLY_SPENDING,
                        variables:{tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                    }
                ]
            });
        }
    };

    render() {
        let { sortedInfo, filteredInfo,durationView } = this.state;
        const { salaryData } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: <div style={{}}>{"Title"}</div>,
                dataIndex: "topic",
                key: "topic",
                editable: false,
                render: text => <a>{text}</a>,
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
                width: 300
            },
            {
                title: "primary duration",
                dataIndex: "primaryduration",
                key: "primaryduration",
                editable: false,
                sorter: (a, b) => a.primaryduration - b.primaryduration,
                sortOrder:
                    sortedInfo.columnKey === "primaryduration" && sortedInfo.order
            },

            {
                title: "primary amount",
                dataIndex: "primaryamount",
                key: "primaryamount",
                editable: true,
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.primaryamount.includes(value),
                sorter: (a, b) => a.primaryamount - b.primaryamount,
                sortOrder: sortedInfo.columnKey === "primaryamount" && sortedInfo.order,
                width: 200
            },
            {
                title: durationType[this.props.durationView],
                dataIndex: "primaryDurationAmount",
                key: "primaryDurationAmount",
                editable: false,
                width: 200
            },
            {
                title: "spouse duration",
                dataIndex: "spouseduration",
                key: "spouseduration",
                editable: false,
                sorter: (a, b) => a.spouseduration - b.spouseduration,
                sortOrder: sortedInfo.columnKey === "spouseduration" && sortedInfo.order
            },

            {
                title: "spouse amount",
                dataIndex: "spouseamount",
                key: "spouseamount",
                editable: true,
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.spouseamount.includes(value),
                sorter: (a, b) => a.spouseamount - b.spouseamount,
                sortOrder: sortedInfo.columnKey === "spouseamount" && sortedInfo.order,
                width: 200
            },
            {
                title: durationType[this.props.durationView],
                dataIndex: "spouseDurationAmount",
                key: "spouseDurationAmount",
                editable: false,
                width: 200
            },
            {
                title: "operation",
                dataIndex: "operation",
                render: (text, record) =>
                    this.state.salaryData.length >= 1 ? (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => this.handleDelete(record.key)}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
                width: 150
            }
        ];
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            },
            header: {}
        };
        const columns1 = columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });

        const columns2 = columns1.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index)
            })
        }));

        return (
            <div>
                <div className="App">
                    <Table
                        className="ant-income-table-content"
                        components={components}
                        rowClassName={() => "editable-row"}
                        dataSource={salaryData}
                        columns={columns2}
                        onChange={this.handleChange}
                        pagination={{pageSize: 5}  }
                        scroll={{ y: 230 }}
                        size={"small"}
                        bordered
                        useFixedHeader={true}
                    />
                </div>
                <Row>
                    <Col span={3} />
                    <Col span={4}>
                        <div className="incomeFont">Total  {durationType[this.props.durationView]}</div>
                    </Col>
                    <Col span={4} />
                    <Col span={6}>
                        <Statistic className="incomeFont"
                                   title="Primary Savings"
                                   value={this.props.primaryTotalSalary}
                        />
                    </Col>
                    <Col span={2} />
                    <Col span={3}>
                        <Statistic className="incomeFont"
                                   title="Spouse  Savings"
                                   value={this.props.spouseTotalSalary}
                        />
                    </Col>
                </Row>
                <Divider style={{height:1}}/>
                <div className="flex-row">
                    <div className="flex-col"><SavingsChart
                        onRef={ref => (this.child = ref)}
                        chartData={this.props.chartData}
                        month={this.props.month}/>
                    </div>
                    <div className="flex-col"> <SavingTypeChart
                        onRef={ref => (this.child = ref)}
                        spendingTypeChartLavel={this.props.spendingTypeChartLavel}
                        spendingTypeChartSeries={this.props.spendingTypeChartSeries}
                    /></div>
                    <div className="flex-col"> <SavingPaiChart
                        onRef={ref => (this.child = ref)}
                        paiChartData={this.props.paiChartData}
                        paiChartLabels={this.props.paiChartLabels}/>

                    </div>

                </div>

            </div>

        );
    }
}

export default compose(
    graphql(UPDATE_SAVING, { name: "updateSavingMutation" }),
    graphql(UPDATE_EXTRA_RET_SAVING,{name:"updateExtraSavingMutation"}),
    graphql(DELETE_SAVING, { name: "deleteSavingMutation" }),
    graphql(DELETE_EXTRA_RET_SAVING,{name:"deleteExtraSavingMutation"}),
)(withApollo(SavingsEditableTable));
