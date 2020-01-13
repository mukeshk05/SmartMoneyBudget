import React from "react";
import {
    Table,
    Input,
    Popconfirm,
    Form,
    Statistic,
    Select,
    Row,
    Col, Icon
} from "antd";
import "../../css/Editabletable.css";
import { compose, Mutation, withApollo, graphql } from "react-apollo";
import EditableFormRow from "../../../common/EditableFormRow";
import EditableCell from "../../../common/EditableTableRow";
import {
    DELETE_EXTRA_RET_SAVING,
    UPDATE_EXTRA_RET_SAVING
} from "../../../../graphql/mutation/extraretirementsavings/ExtraRetirementSavingsMutation";
import {
    USER_EXTRA_RETIREMENT_SAVING,
    USER_MONTEHLY_EXTRA_RETIREMENT_SAVING
} from "../../../../graphql/queries/extraretirementsavings/ExtraRetirementSavingsQuery";
import {durationType} from "../../../common/Duration";

const { Option } = Select;

class ExtraRetirementSavingEditableTable extends React.Component {
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
        this.props.deleteExtraSavingMutation({
            variables: {
                id: key
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_EXTRA_RETIREMENT_SAVING,
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                }
            ]
        });

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
        this.props.updateExtraSavingMutation({
            variables: {
                user_id: row.user_id,
                duration: primaryDuration,
                extra_retirement_saving_amount: parseFloat(row.primaryamount),
                extra_retirement_saving_type: row.extra_retirement_saving_type_id,
                id: row.key,
                spouse_amount: parseFloat(row.spouseamount),
                spouse_duration: spouseDuration
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_EXTRA_RETIREMENT_SAVING,
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                }
            ]
        });
        this.setState({ salaryData: newData });
    };

    handlePrimaryDurationChange = (value, slId) => {
        let primaryDuration = durationType.findIndex(item => value === item);
        this.props.updateExtraSavingMutation({
            variables: {
                user_id: slId.user_id,
                duration: primaryDuration,
                extra_retirement_saving_type: slId.extra_retirement_saving_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_EXTRA_RETIREMENT_SAVING,
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                }
            ]
        });
    };

    handleSpouseDurationChange = (value, slId) => {
        let spouseDuration = durationType.findIndex(item => value === item);
        this.props.updateExtraSavingMutation({
            variables: {
                user_id: slId.user_id,
                spouse_duration: spouseDuration,
                extra_retirement_saving_type: slId.extra_retirement_saving_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_EXTRA_RETIREMENT_SAVING,
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
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
                width: 250
            },
            {
                title: "duration",
                dataIndex: "primaryduration",
                key: "primaryduration",
                editable: false,
                sorter: (a, b) => a.primaryduration - b.primaryduration,
                sortOrder:
                    sortedInfo.columnKey === "primaryduration" && sortedInfo.order,
                width: 200
            },
            {
                title: "amount",
                dataIndex: "primaryamount",
                key: "primaryamount",
                editable: true,
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.primaryamount.includes(value),
                sorter: (a, b) => a.primaryamount - b.primaryamount,
                sortOrder: sortedInfo.columnKey === "primaryamount" && sortedInfo.order,
                width: 150
            },
            {
                title: "",
                dataIndex: "operation",
                render: (text, record) =>
                    this.state.salaryData.length >= 1 ? (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => this.handleDelete(record.key)}
                        >
                            <Icon type="minus-circle" theme="twoTone" twoToneColor="red"/>
                        </Popconfirm>
                    ) : null,
                width: 10
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
                        className="ant-table-content-budget"
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
    graphql(UPDATE_EXTRA_RET_SAVING, { name: "updateExtraSavingMutation" }),
    graphql(DELETE_EXTRA_RET_SAVING, { name: "deleteExtraSavingMutation" })
)(withApollo(ExtraRetirementSavingEditableTable));
