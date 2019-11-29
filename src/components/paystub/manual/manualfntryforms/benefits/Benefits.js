import React from "react";
import { Button, Col, Icon, Row, Select } from "antd";
import "../../../../../styles/index.css";
import gql from "graphql-tag";
import {compose, graphql, Mutation, Query, withApollo} from "react-apollo";
import BenefitsEditableTable from "./BenefitsEditableTable";
import AddAttributeForm from "../AddAttributeForm";
import {USER_BENEFITS} from "../../../../../graphql/queries/salary/BenefitsQuery";
import {CREATE_BENEFITS} from "../../../../../graphql/mutation/salary/BenefitsMutation";

const { Option } = Select;
const durationType = ["Monthly", "Weekly", "By Weekly", "Yearly"];

class Benefits extends React.Component {
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
                    Add New Benefit Type
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
                          this.props.createBenifitsMutation({
                            variables: {
                              benfeit_type: values.title,
                              user_id: "Sachin"
                            },
                            refetchQueries: [
                              {
                                query: USER_BENEFITS
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
          <Query query={USER_BENEFITS} notifyOnNetworkStatusChange={true} fetchPolicy={"cache-and-network"}>
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
                const tempData = data.benefitses;
                let primaryTotalSalary = 0;
                let spouseTotalSalary = 0;
                for (let i in tempData) {
                  array1.push({
                    key: tempData[i].id,
                    topic: tempData[i].benefit_type.benefit_type,
                    benefit_type_id: tempData[i].benefit_type.id,
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
                    primaryamount: tempData[i].salary_amount,

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
                      primaryTotalSalary + tempData[i].salary_amount;
                  spouseTotalSalary =
                      spouseTotalSalary + tempData[i].spouse_amount;
                }
                return (
                    <BenefitsEditableTable
                        salaryData={array1}
                        primaryTotalSalary={primaryTotalSalary}
                        spouseTotalSalary={spouseTotalSalary}
                        onRef={ref => (this.child = ref)}
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
    graphql(CREATE_BENEFITS, { name: "createBenifitsMutation" }),
    graphql(USER_BENEFITS)
)(withApollo(Benefits));