'use strict';
import React from 'react'
import { Modal, Form, Input, Select,} from 'antd'
const { Option } = Select;

class AddAttributeForm extends React.Component {
    render() {
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
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Husband">
                        {getFieldDecorator('husband')( <tr><td><Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Monthly</Option>
                            <Option value="lucy">Weekly</Option>
                            <Option value="tom">By Weekly</Option>
                            <Option value="tom">Yearly</Option>
                        </Select></td><td><Input /></td></tr>)}
                    </Form.Item>
                    <Form.Item label="Wife">
                        {getFieldDecorator('wife')( <tr><td><Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="jack">Monthly</Option>
                            <Option value="lucy">Weekly</Option>
                            <Option value="tom">By Weekly</Option>
                            <Option value="tom">Yearly</Option>
                        </Select></td><td><Input /></td></tr>)}
                    </Form.Item>
                 </Form>
            </Modal>
        );
    }

}

export default Form.create()(AddAttributeForm);