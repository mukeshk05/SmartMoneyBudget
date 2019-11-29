'use strict';
import React from 'react'
import { Modal, Form, Input, Select,} from 'antd'
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
const { Option } = Select;
const durationType = ['Monthly', 'Weekly','By Weekly','Yearly'];



class AddAttributeForm extends React.Component {

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

        const {title, primaryAmount,spouseAmount,primary,spouse } = this.state;
        const {visible, onCancel, onCreate, form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >

                <Form layout="vertical">
                    <Form.Item label="Title">
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: 'Please input the title of collection!'}],
                        })(<Input value={this.state.type}
                                  onChange={e => this.setState({ title: e.target.value })}/>)}
                    </Form.Item>
                   {/* <Form.Item label="PRIMARY">
                        {getFieldDecorator('primary')( <tr><td><Select   defaultValue={durationType[0]}

                                                                         onChange={this.handlePrimaryDurationChange}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {durationType.map(duration => (
                                <Option key={duration}>{duration}</Option>
                            ))}
                        </Select></td>
                            <td><Input  value={this.state.primaryAmount}
                                                  onChange={e => this.setState({ primaryAmount: e.target.value })}/></td></tr>)}
                    </Form.Item>
                    <Form.Item label="SPOUSE">
                        {getFieldDecorator('spouse')( <tr><td><Select defaultValue={durationType[0]}

                                                                      onChange={this.handleSpouseDurationChange}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {durationType.map(duration => (
                                <Option key={duration}>{duration}</Option>
                            ))}
                        </Select></td><td><Input value={spouseAmount}
                                                 onChange={e => this.setState({ spouseAmount: e.target.value })}/></td></tr>)}
                    </Form.Item>*/}

                 </Form>

            </Modal>
        );
    }

}

export default Form.create()(AddAttributeForm);