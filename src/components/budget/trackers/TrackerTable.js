import React from "react";
import {
    Table,
    Input,
    Popconfirm,
    Form,
    Statistic,
    Select,
    Row,
    Col, Icon, Divider, Tabs, Tooltip
} from "antd";
import "../css/Editabletable.css";
import { compose, Mutation, withApollo, graphql } from "react-apollo";
import EditableFormRow from "../../common/EditableFormRow";
import EditableCell from "../../common/EditableTableRow";
import {DELETE_SAVING, UPDATE_SAVING, UPDATE_SAVINGL} from "../../../graphql/mutation/savings/SavingsMutation";
import {USER_MONTEHLY_SAVING} from "../../../graphql/queries/savings/SavingsQuery";
import {durationType} from "../../common/Duration";
import BudgetTypePaiChart from "../../common/BudgetTypePaiChart";
import BudgetBarChartWithPerception from "../../common/BudgetBarChartWithPerception";
const TabPane = Tabs.TabPane;

const { Option } = Select;

class TrackerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            salaryData: []
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setState({ salaryData: this.props.salaryData });
    }

    componentWillReceiveProps(newProps) {
        if(this.state.salaryData.length!==newProps.salaryData.length){
            this.setState({salaryData:newProps.salaryData});
        }
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
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
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

        this.props.updateSavingMutation({
            variables: {
                user_id: row.user_id,
                duration: primaryDuration,
                saving_amount: parseFloat(row.primaryamount),
                saving_type: row.saving_type_id,
                id: row.key,
                spouse_amount: parseFloat(row.spouseamount),
                spouse_duration: spouseDuration
            },

            refetchQueries: [
                {
                    query: USER_MONTEHLY_SAVING,
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate},
                    fetchPolicy: 'network-only'

                }
            ]
        });
        this.setState({ salaryData: newData });

    };

    handlePrimaryDurationChange = (value, slId) => {
        let primaryDuration = durationType.findIndex(item => value === item);
        this.props.updateSavingMutation({
            variables: {
                user_id: slId.user_id,
                duration: primaryDuration,
                saving_type: slId.saving_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_SAVING,
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                }
            ]
        });
    };

    handleSpouseDurationChange = (value, slId) => {
        let spouseDuration = durationType.findIndex(item => value === item);
        this.props.updateSavingMutation({
            variables: {
                user_id: slId.user_id,
                spouse_duration: spouseDuration,
                saving_type: slId.saving_type.id,
                id: slId.id
            },
            refetchQueries: [
                {
                    query: USER_MONTEHLY_SAVING,
                    variables:{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}
                }
            ]
        });
    };



    render() {
        let { sortedInfo, filteredInfo } = this.state;
        const {salaryData}=this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: <div style={{}}>{"Date"}</div>,
                dataIndex: "trackerDate",
                key: "trackerDate",
                editable: false,
                render: text => <a>{text}</a>,
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === "trackerDate" && sortedInfo.order,
                width: 100
            },
            {
                title: "Category Name",
                dataIndex: "categoryName",
                key: "categoryName",
                editable: false,
                sorter: (a, b) => a.primaryduration - b.primaryduration,
                sortOrder:
                    sortedInfo.columnKey === "categoryName" && sortedInfo.order,
                width: 200
            },
            {
                title: "Sub Category Name",
                dataIndex: "subCategoryName",
                key: "subCategoryName",
                editable: false,
                sorter: (a, b) => a.primaryduration - b.primaryduration,
                sortOrder:
                    sortedInfo.columnKey === "subCategoryName" && sortedInfo.order,
                width: 200
            },
            {
                title: "description",
                dataIndex: "description",
                key: "description",
                editable: true,
                ellipsis: true,
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.primaryamount.includes(value),
                sorter: (a, b) => a.primaryamount - b.primaryamount,
                sortOrder: sortedInfo.columnKey === "description" && sortedInfo.order,
                width: 200

            },
            {
                title: "amount",
                dataIndex: "trackerAmount",
                key: "trackerAmount",
                editable: true,
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.primaryamount.includes(value),
                sorter: (a, b) => a.primaryamount - b.primaryamount,
                sortOrder: sortedInfo.columnKey === "trackerAmount" && sortedInfo.order,
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
                width: 5
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
            <div className="App">
                <div  className="flex-row" >
                    <div className="flex-col">
                    <Table
                        className="ant-table-content-budget" style={{width:"750px"}}
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
                    <div className="flex-col" style={{width:"400px"}} >
                        <Tabs defaultActiveKey="2" tabPosition={"top"}>
                            <TabPane tab={ <span> Sub Category</span>} key="1" >

                                    <BudgetTypePaiChart
                                        eChartData={this.props.eChartData}
                                    />

                            </TabPane>
                            <TabPane tab={ <span> Category</span>} key="2">

                                    <BudgetTypePaiChart
                                        eChartData={this.props.eChartCategoryData}
                                    />

                            </TabPane>
                            <TabPane tab={ <span> Category and Sub Category</span>} key="3">

                                    <BudgetBarChartWithPerception
                                    />

                            </TabPane>
                        </Tabs>

                    </div>

                </div>

                
            </div>
        );
    }
}

export default compose(
    graphql(UPDATE_SAVING, { name: "updateSavingMutation" }),
    graphql(DELETE_SAVING, { name: "deleteSavingMutation" })
)(withApollo(TrackerTable));
