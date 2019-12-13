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
import "../css/Editabletable.css";
import { compose, Mutation, withApollo, graphql } from "react-apollo";
import EditableFormRow from "../../../../common/EditableFormRow";
import EditableCell from "../../../../common/EditableTableRow";
import {DELETE_POSTTAXDEUCTIO, UPDATE_POSTTAXDEUCTIO} from "../../../../../graphql/mutation/posttax/PostTaxMutation";
import {
    USER_MONTEHLY_POSTTAXDEDUCTION,
    USER_POSTTAXDEDUCTION
} from "../../../../../graphql/queries/posttax/PostTaxQuery";
import {durationType} from "../../../../common/Duration";

const { Option } = Select;

class PostTaxDeductionEditableTable extends React.Component {
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
        this.props.deletePostTaxDeductionMutation({
            variables: {
                id: key
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_POSTTAXDEDUCTION,
                    variables:{tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
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
        this.props.updatePostTaxDeductionMutation({
            variables: {
                user_id: row.user_id,
                duration: primaryDuration,
                post_tax_amount: parseFloat(row.primaryamount),
                post_tax_type: row.post_tax_type_id,
                id: row.key,
                spouse_amount: parseFloat(row.spouseamount),
                spouse_duration: spouseDuration
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_POSTTAXDEDUCTION,
                    variables:{tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                }
            ]
        });
        this.setState({ salaryData: newData });
    };

    handlePrimaryDurationChange = (value, slId) => {
        let primaryDuration = durationType.findIndex(item => value === item);
        this.props.updatePostTaxDeductionMutation({
            variables: {
                user_id: slId.user_id,
                duration: primaryDuration,
                post_tax_type: slId.post_tax_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_POSTTAXDEDUCTION,
                    variables:{tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                }
            ]
        });
    };

    handleSpouseDurationChange = (value, slId) => {
        let spouseDuration = durationType.findIndex(item => value === item);
        this.props.updatePostTaxDeductionMutation({
            variables: {
                user_id: slId.user_id,
                spouse_duration: spouseDuration,
                post_tax_type: slId.post_tax_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_POSTTAXDEDUCTION,
                    variables:{tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
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
    graphql(UPDATE_POSTTAXDEUCTIO, { name: "updatePostTaxDeductionMutation" }),
    graphql(DELETE_POSTTAXDEUCTIO, { name: "deletePostTaxDeductionMutation" })
)(withApollo(PostTaxDeductionEditableTable));
