import React from "react";
import {
    Table,
    Input,
    Popconfirm,
    Form,
    Statistic,
    Select,
    Row,
    Col
} from "antd";
import "../../css/Editabletable.css";
import { compose, Mutation, withApollo, graphql } from "react-apollo";
import EditableFormRow from "../../../common/EditableFormRow";
import EditableCell from "../../../common/EditableTableRow";
import {
    DELETE_FIXED_EXPENSES,
    UPDATE_FIXED_EXPENSES
} from "../../../../graphql/mutation/fixedexpenses/FixedExpensesMutation";
import {USER_FIXED_EXPENSES_QUERY} from "../../../../graphql/queries/fixedexpenses/FixedExpensesQuery";
import {
    DELETE_VARIABLE_EXPENSES,
    UPDATE_VARIABLE_EXPENSES
} from "../../../../graphql/mutation/variableexpenses/VariableExpensesMutation";
import {USER_VARIABLE_EXPENSES} from "../../../../graphql/queries/variableexpenses/VariableExpensesQuery";
const { Option } = Select;
const durationType = ["Monthly", "Weekly", "By Weekly", "Yearly"];

class VariableExpancesEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            salaryData: [],
            primaryTotalSalary: 0,
            spouseTotalSalary: 0,
            count: 2
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setState({ salaryData: this.props.salaryData });
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
        this.props.deleteVariableExpansesMutation({
            variables: {
                id: key
            },
            refetchQueries: [
                {
                    query: USER_VARIABLE_EXPENSES
                }
            ]
        });
        const salaryData = [...this.state.salaryData];
        this.setState({ salaryData: salaryData.filter(item => item.key !== key) });
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
                    query: USER_VARIABLE_EXPENSES
                }
            ]
        });
        this.setState({ salaryData: newData });
    };

    handlePrimaryDurationChange = (value, slId) => {
        let primaryDuration = durationType.findIndex(item => value === item);
        this.props.updateVariableExpansesMutation({
            variables: {
                user_id: slId.user_id,
                duration: primaryDuration,
                variable_expense_type: slId.variable_expense_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_VARIABLE_EXPENSES
                }
            ]
        });
    };

    handleSpouseDurationChange = (value, slId) => {
        let spouseDuration = durationType.findIndex(item => value === item);
        this.props.updateFixedExpansesMutation({
            variables: {
                user_id: slId.user_id,
                spouse_duration: spouseDuration,
                variable_expense_type: slId.variable_expense_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_FIXED_EXPENSES_QUERY
                }
            ]
        });
    };

    componentWillReceiveProps(newProps) {
        this.setState({salaryData:newProps.salaryData});
    }

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        const {salaryData}=this.state;
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
                width: 400
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
                width: 250
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
                width: 250
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
                        className="ant-table-content"
                        components={components}
                        rowClassName={() => "editable-row"}
                        dataSource={salaryData}
                        columns={columns2}
                        onChange={this.handleChange}
                        pagination={false}
                        scroll={{ y: 500 }}
                        size={"small"}
                        bordered
                    />
                </div>
                <Row>
                    <Col span={1} />
                    <Col span={10}>
                        <div className="ant-layout">Total</div>
                    </Col>
                    <Col span={2}>
                        <Statistic
                            title="Primary Total Income"
                            value={this.props.primaryTotalSalary}
                        />
                    </Col>
                    <Col span={6} />
                    <Col span={2}>
                        <Statistic
                            title="Spouse Total Income"
                            value={this.props.spouseTotalSalary}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default compose(
    graphql(UPDATE_VARIABLE_EXPENSES, { name: "updateVariableExpansesMutation" }),
    graphql(DELETE_VARIABLE_EXPENSES, { name: "deleteVariableExpansesMutation" }),
    graphql(USER_VARIABLE_EXPENSES)
)(withApollo(VariableExpancesEditableTable));
