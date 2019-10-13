'use strict';
import React from 'react'
import { Modal, Form, Input} from 'antd'


class CreateNewGoalForm extends React.Component {
    render() {
        const {visible, onCancel, onCreate, form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Modal
                visible={visible}
                title="Create New Goal"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Form.Item label="New Goal">
                        {getFieldDecorator('goal', {
                            rules: [{required: true, message: 'Please input the title of collection!'}],
                        })(<Input/>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

export default Form.create()(CreateNewGoalForm);