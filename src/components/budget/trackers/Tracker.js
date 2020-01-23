import React from "react";
import {Button, Col, DatePicker, Icon, Row, Select, Spin} from "antd";
import "../../../styles/index.css";
import {compose, graphql, Mutation, Query, withApollo} from "react-apollo";
import TrackerTable from "./TrackerTable";
import NewTrackerForm from "./NewTrackerForm";
import 'antd/dist/antd.css';
import {USER_MONTEHLY_TRACKING} from "../../../graphql/queries/tracker/TrackerQuery";
import {CREATE_TRACKER} from "../../../graphql/mutation/tracker/TrackerMutation";
import moment from "moment";
import {
    getEChartData,
    getTrackeEChartData,
    getTrackerEChartData,
    getTrackerEChartDataByCategory
} from "../../common/PrepareData";
import BillsEditableTable from "../budgetplanner/bill/BillsEditableTable";
import {TrackerCategory} from "../../common/Duration";
import _ from "lodash";

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intialData: []
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

    onChange=(date)=>{
        const startDate = moment([date._d.getFullYear(), date._d.getMonth() , 1]).format("YYYY-MM-DD");
        const daysInMonth = moment(startDate).daysInMonth();
        const endDate = moment(startDate).add(daysInMonth - 1, 'days').format("YYYY-MM-DD");
        const transactionDate=moment(endDate).subtract(1,"day").format("YYYY-MM-DD");
        this.setState({startDate:startDate});
        this.setState({endDate:endDate});
        this.setState({currentDate:transactionDate})
    };

    render() {
        const {intialData}=this.state;

        return (
            <div className="ant-layout">
               
                <Row>

                    <Col span={5}>
                        <div className="App">
                            {
                                <Button type="primary" onClick={this.showModal}>
                                    Add New Tracker Type
                                </Button>
                            }
                            <div>
                                <NewTrackerForm
                                    wrappedComponentRef={this.saveFormRef}
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    onCreate={e => {
                                        const { form } = this.formRef.props;
                                        form.validateFields((err, values) => {
                                        console.log(values);
                                        this.props.createTrackerMutation({
                                                variables: {
                                                    tracker_type: values.subCategory,
                                                    transactionDate:(new moment()),
                                                    tracker_date:moment(values.date).format("YYYY-MM-DD"),
                                                    user_id:this.props.user.email,
                                                    Amount:parseFloat(values.amount),
                                                    duration:parseInt(values.Category),
                                                    description:values.name
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: USER_MONTEHLY_TRACKING,
                                                        variables:{user_id: this.props.user.email}
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
                <Query query={USER_MONTEHLY_TRACKING }  variables={{user_id: this.props.user.email}} fetchPolicy={"network-only"}>
                    {({ loading, error, data }) => {
                        if (loading)
                            return (
                                <Spin tip="Loading...">
                                </Spin>
                            );
                        if (error) return <div>Error</div>;
                        const array1 = [];
                        if (data != null) {
                            const trackers = data.trackers;
                            for (let i in trackers) {
                                array1.push(
                                    {
                                        key: trackers[i].id,
                                        categoryName:TrackerCategory[trackers[i].duration],
                                        description: trackers[i].description,
                                        trackerAmount:trackers[i].Amount,
                                        subCategoryName:trackers[i].Category.tracker_type.split("|")[1],
                                        trackerDate:<DatePicker defaultValue={moment(trackers[i].tracker_date, "YYYY-MM-DD")} format={"YYYY-MM-DD"}
                                                                size={"small"}/>,
                                    }

                                );

                            }


                            const result1 = _(array1)
                                .groupBy('categoryName')
                                .map(function(items, categoryName) {
                                    return {
                                        categoryType: categoryName,
                                        trackerAmount:_.sumBy(items, 'trackerAmount')
                                    };
                                }).value();

                            console.log(result1);
                            const eChartData=getTrackerEChartData(trackers,"Sub Category Tracker","Tracker by Sub Category","Category","tracker_type","Amount");
                            const eChartCategoryData=getTrackerEChartDataByCategory(result1,"Category Tracker","Tracker by Category","categoryType","trackerAmount");

                            return (
                                <TrackerTable
                                    startDate={this.props.startDate} endDate={this.props.endDate}
                                    salaryData={array1}
                                    onRef={ref => (this.child = ref)}
                                    user={this.props.user}
                                    eChartData={eChartData}
                                    eChartCategoryData={eChartCategoryData}
                                />
                            );
                        }
                    }}
                </Query>
            </div>
        );
    }
}
export default compose(
    graphql(CREATE_TRACKER, { name: "createTrackerMutation" })
)(withApollo(Tracker));