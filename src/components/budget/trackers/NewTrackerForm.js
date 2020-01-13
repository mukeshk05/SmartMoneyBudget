'use strict';
import React from 'react'
import {Modal, Form, Input, Select, DatePicker, Spin,} from 'antd'
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import {durationType} from "../../common/Duration";
import moment from "moment";
import 'antd/dist/antd.css';
import '../../../styles/index.css';
import {ALL_CATEGORIES} from "../../../graphql/queries/tracker/TrackerQuery";

const { Option } = Select;



class NewTrackerForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title:'',
            primaryAmount: '',
            spouseAmount: '',
            primary:durationType[0],
            spouse:durationType[0]
        };
        //this.onChange = this.onChange.bind(this)
    };

    handlePrimaryDurationChange = value => {
        this.setState({
            primary:durationType[value]
        });
    };

    handleSpouseDurationChange = value => {
        this.setState({
            spouse:durationType[value]
        });
    };


    render() {

        const dateFormat = 'YYYY/MM/DD';
        const {title, primaryAmount,spouseAmount,primary,spouse } = this.state;
        const {visible, onCancel, onCreate, form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <Query query={ALL_CATEGORIES}>
                {({ loading, error, data }) => {
                    if (loading)
                        return (
                            <Spin tip="Loading...">
                            </Spin>
                        );
                    if (error) return <div>Error</div>;
                    const categoryData = [];
                    if (data != null) {
                        const fixedExpensesCategories     		=data.fixedExpensesCategories;
                        const billsCategories             		=data.billsCategories;
                        const variableExpensesCategories  		=data.variableExpensesCategories;
                        const savingCategories            		=data.savingCategories;
                        const extraRetirementSavingsCategories  =data.extraRetirementSavingsCategories;
                        for (let i in fixedExpensesCategories) {
                            categoryData.push(
                                {
                                    categoryId:fixedExpensesCategories[i].id,
                                    categoryName:fixedExpensesCategories[i].fixed_expense_type
                                }
                            );
                        }
                        for (let i in billsCategories) {
                            categoryData.push(
                                {
                                    categoryId:billsCategories[i].id,
                                    categoryName:billsCategories[i].bills_type
                                }
                            );
                        }
                        for (let i in variableExpensesCategories) {
                            categoryData.push(
                                {
                                    categoryId:variableExpensesCategories[i].id,
                                    categoryName:variableExpensesCategories[i].variable_expense_type
                                }
                            );
                        }
                        for (let i in savingCategories) {
                            categoryData.push(
                                {
                                    categoryId:savingCategories[i].id,
                                    categoryName:savingCategories[i].saving_type
                                }
                            );
                        }
                        for (let i in extraRetirementSavingsCategories) {
                            categoryData.push(
                                {
                                    categoryId:extraRetirementSavingsCategories[i].id,
                                    categoryName:extraRetirementSavingsCategories[i].extra_retirement_saving_type
                                }
                            );
                        }
                    }


                    return (
                        <Modal
                            visible={visible}
                            title="Create a new Tracker"
                            okText="Create"
                            onCancel={onCancel}
                            onOk={onCreate}

                        >
                            <Form layout="vertical">

                                <Form.Item label="Date">
                                    {getFieldDecorator('date', {
                                        rules: [{required: true, message: 'Please select date'}],
                                    })(<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}
                                                   size={"small"}/>)}
                                </Form.Item>

                                <Form.Item label="Category">
                                    {getFieldDecorator('Category')
                                    (<Select defaultValue={durationType[0]}
                                             onChange={this.handlePrimaryDurationChange}
                                             showSearch
                                             style={{width: 200}}
                                             placeholder="Select a type"
                                             optionFilterProp="children"
                                             filterOption={(input, option) =>
                                                 option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                             }
                                    >
                                        {categoryData.map((categoryData,index) => (
                                            <Option key={categoryData.categoryName}>{categoryData.categoryName}</Option>
                                        ))}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item label="Name">
                                    {getFieldDecorator('name', {
                                        rules: [{required: true, message: 'Please input the Name!'}],
                                    })(<Input value={this.state.type}
                                              onChange={e => this.setState({title: e.target.value})}/>)}
                                </Form.Item>
                                <Form.Item label="Amount">
                                    {getFieldDecorator('amount', {
                                        rules: [{required: true, message: 'Please input the Amount!'}],
                                    })(<Input value={this.state.type}
                                              onChange={e => this.setState({title: e.target.value})}/>)}
                                </Form.Item>
                            </Form>
                        </Modal>
                    );
                }}
            </Query>



        );
    }

}

export default Form.create()(NewTrackerForm);