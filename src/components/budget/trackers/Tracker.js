import React from "react";
import {Button, Col, DatePicker, Icon, Row, Select, Spin} from "antd";
import "../../../styles/index.css";
import {compose, graphql, Mutation, Query, withApollo} from "react-apollo";
import TrackerTable from "./TrackerTable";
import NewTrackerForm from "./NewTrackerForm";
import 'antd/dist/antd.css';
import {USER_MONTEHLY_TRACKING} from "../../../graphql/queries/tracker/TrackerQuery";
import {CREATE_TRACKER} from "../../../graphql/mutation/tracker/TrackerMutation";
import {USER_MONTEHLY_SAVING} from "../../../graphql/queries/savings/SavingsQuery";
import moment from "moment";
import {monthFormat, selectedDate} from "../../common/Duration";
const { Option } = Select;
const { MonthPicker} = DatePicker;

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
                                        console.log(e.target.value );
                                        const { form } = this.formRef.props;
                                        form.validateFields((err, values) => {
                                       
                                        this.props.createTrackerMutation({
                                                variables: {
                                                    tracker_type: values.Category,
                                                    transactionDate:(new moment()),
                                                    tracker_date:moment(values.date).format("YYYY-MM-DD"),
                                                    user_id:this.props.user.email,
                                                    Amount:parseFloat(values.amount),
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
                            let primaryTotalSalary = 0;
                            let spouseTotalSalary = 0;
                            for (let i in trackers) {
                                array1.push(
                                    {
                                        key: trackers[i].id,
                                        categoryName: trackers[i].Category.tracker_type,
                                        description: trackers[i].description,
                                        trackerAmount:trackers[i].Amount,
                                        trackerDate:<DatePicker defaultValue={moment(trackers[i].tracker_date, "YYYY-MM-DD")} format={"YYYY-MM-DD"}
                                                                size={"small"}/>,
                                    }

                                );

                            }
                            console.log(array1);
                            return (
                                <TrackerTable
                                    startDate={this.props.startDate} endDate={this.props.endDate}
                                    salaryData={array1}
                                    primaryTotalSalary={primaryTotalSalary}
                                    spouseTotalSalary={spouseTotalSalary}
                                    onRef={ref => (this.child = ref)}
                                    user={this.props.user}
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