'use strict';
import React from 'react'
import {Modal, Form, Input, Select, DatePicker, Spin,} from 'antd'
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import {durationType,TrackerCategory} from "../../common/Duration";
import moment from "moment";
import 'antd/dist/antd.css';
import '../../../styles/index.css';
import {ALL_CATEGORIES} from "../../../graphql/queries/tracker/TrackerQuery";
import _ from "lodash";
const { Option } = Select;



class NewTrackerForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title:'',
            primaryAmount: '',
            spouseAmount: '',
            primary:durationType[0],
            spouse:durationType[0],
            selectedCategory:0,
        };
        //this.onChange = this.onChange.bind(this)
    };

    handlePrimaryDurationChange = value => {
        this.setState({
            selectedCategory:value
        });
    };

    handleSpouseDurationChange = value => {
        this.setState({
            spouse:durationType[value]
        });
    };


    render() {

        const dateFormat = 'YYYY/MM/DD';
        const {title, primaryAmount,spouseAmount,primary,spouse,selectedCategory } = this.state;
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
                                {   categoryType:'Fixed Expenses',
                                    categoryId:fixedExpensesCategories[i].id,
                                    categoryName:fixedExpensesCategories[i].fixed_expense_type
                                }
                            );
                        }
                        for (let i in billsCategories) {
                            categoryData.push(
                                {
                                    categoryType:'Bills',
                                    categoryId:billsCategories[i].id,
                                    categoryName:billsCategories[i].bills_type
                                }
                            );
                        }
                        for (let i in variableExpensesCategories) {
                            categoryData.push(
                                {
                                    categoryType:'Variable Expenses',
                                    categoryId:variableExpensesCategories[i].id,
                                    categoryName:variableExpensesCategories[i].variable_expense_type
                                }
                            );
                        }
                        for (let i in savingCategories) {
                            categoryData.push(
                                {
                                    categoryType:'Savings',
                                    categoryId:savingCategories[i].id,
                                    categoryName:savingCategories[i].saving_type
                                }
                            );
                        }
                        for (let i in extraRetirementSavingsCategories) {
                            categoryData.push(
                                {
                                    categoryType:'Extra Retirement Savings',
                                    categoryId:extraRetirementSavingsCategories[i].id,
                                    categoryName:extraRetirementSavingsCategories[i].extra_retirement_saving_type
                                }
                            );
                        }
                        
                    }
                    const result1 = _(categoryData)
                        .groupBy('categoryType')
                        .map(function(items, categoryType) {
                            return {
                                categoryType: categoryType,
                                categoryId:_.map(items, 'categoryId'),
                                categoryName: _.map(items, 'categoryName')
                            };
                        }).value();
                       

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
                                    (<Select defaultValue={TrackerCategory[0]}
                                             onChange={this.handlePrimaryDurationChange}
                                             showSearch
                                             style={{width: 200}}
                                             placeholder="Select a type"
                                             optionFilterProp="children"
                                             filterOption={(input, option) =>
                                                 option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                             }
                                    >
                                        {/*categoryData.map((categoryData,index) => (
                                            <Option key={categoryData.categoryId} >{categoryData.categoryName}</Option>
                                        ))*/}
                                         {TrackerCategory.map((duration,index) => (
                                                    <Option key={index} value={index}>
                                                        {duration}
                                                    </Option>
                                                ))}
                                    </Select>)}
                                </Form.Item>


                                <Form.Item label="Sub Category">
                                    {getFieldDecorator('subCategory')
                                    (<Select defaultValue={result1[selectedCategory].categoryName[0]}
                                             showSearch
                                             style={{width: 200}}
                                             placeholder="Select a type"
                                             optionFilterProp="children"
                                             filterOption={(input, option) =>
                                                 option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                             }
                                    >
                                        {/*categoryData.map((categoryData,index) => (
                                            <Option key={categoryData.categoryId} >{categoryData.categoryName}</Option>
                                        ))*/}
                                       {result1[selectedCategory].categoryName.map((categoryData,index) => (
                                            <Option key={result1[selectedCategory].categoryId[index]} value={categoryData} >{categoryData}</Option>
                                           
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