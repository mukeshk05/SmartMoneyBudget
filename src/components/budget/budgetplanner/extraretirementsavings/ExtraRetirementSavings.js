import React from "react";
import { Button, Col, Icon, Row, Select } from "antd";
import "../../../../styles/index.css";
import {compose, graphql, Mutation, Query, withApollo} from "react-apollo";
import AddAttributeForm from "../../../paystub/manual/manualfntryforms/AddAttributeForm";
import ExtraRetirementSavingEditableTable from "./ExtraRetirementSavingEditableTable";
import {CREATE_EXTRA_RET_SAVING} from "../../../../graphql/mutation/extraretirementsavings/ExtraRetirementSavingsMutation";
import {USER_MONTEHLY_EXTRA_RETIREMENT_SAVING
} from "../../../../graphql/queries/extraretirementsavings/ExtraRetirementSavingsQuery";
import { durationType} from '../../../common/Duration';
import { getEChartData } from '../../../common/PrepareData';

const { Option } = Select;


class ExtraRetirementSavings extends React.Component {
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
        const {intialData}=this.state;
        return (
            <div className="ant-layout">
                <Row>
                    <Col span={5}>
                        <div>
                            {
                                <Button type="primary" onClick={this.showModal}>
                                    Add Extra Ret Saving Type
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
                                            this.props.createExtraRetSavingsMutation({
                                                variables: {
                                                    extra_retirement_saving_type: values.title,
                                                    transactionDate:(this.props.currentDate),
                                                    user_id: this.props.user.email
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: USER_MONTEHLY_EXTRA_RETIREMENT_SAVING,
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
                <Query query={USER_MONTEHLY_EXTRA_RETIREMENT_SAVING} variables={{user_id: this.props.user.email,tranaction_start_date:this.props.startDate,transaction_end_date:this.props.endDate}} notifyOnNetworkStatusChange={true} fetchPolicy={"cache-and-network"}>
                    {({ loading, error, data }) => {
                        if (loading)
                            return (
                                <div style={{ align: "center" }}>
                                    <Icon type="loading" />
                                </div>
                            );
                        if (error) return <div>Error</div>;
                        const array1 = [];
                        if (data != null) {
                            const tempData = data.extraRetirementSavingses;
                            let primaryTotalSalary = 0;
                            let spouseTotalSalary = 0;
                            for (let i in tempData) {
                                array1.push({
                                    key: tempData[i].id,
                                    topic: tempData[i].extra_retirement_saving_type.extra_retirement_saving_type,
                                    extra_retirement_saving_type_id: tempData[i].extra_retirement_saving_type.id,
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
                                    primaryamount: tempData[i].extra_retirement_saving_amount,

                                    spouseduration: (
                                        <Select
                                            defaultValue={durationType[tempData[i].spouse_duration]}
                                            onChange={e =>
                                                this.handleSpouseDurationChange(e, tempData[i])
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
                                    spouseamount: tempData[i].spouse_amount
                                });
                                primaryTotalSalary =
                                    primaryTotalSalary + tempData[i].extra_retirement_saving_amount;
                                spouseTotalSalary =
                                    spouseTotalSalary + tempData[i].spouse_amount;
                            }
                            const eChartData=getEChartData(tempData,"Extra Retirement Savings","Extra Retirement Savings by Category","extra_retirement_saving_type","extra_retirement_saving_type","extra_retirement_saving_amount");
                           
                            return (
                                <ExtraRetirementSavingEditableTable
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
                    }}
                </Query>
            </div>
        );
    }
}
export default compose(
    graphql(CREATE_EXTRA_RET_SAVING, { name: "createExtraRetSavingsMutation" })
)(withApollo(ExtraRetirementSavings));