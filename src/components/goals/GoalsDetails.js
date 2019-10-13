'use strict';
import React from 'react'
import { Select, Row, Col, Button,} from 'antd'
import "../../styles/index.css";
import CreateNewGoalForm from "./CreateNewGoalForm";

const { Option } = Select;

export class GoalsDetails extends React.Component {

    constructor () {
        super();
        this.state = {

        }
     }



    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
            //this.props.parentCallback(prevState =>values.goal);
        });


    };


    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleAdd = () => {
        //render:<AddAttributeForm/>;
        /*const { count, data } = this.state;
        const newData = {
          key: count,
          topic: 'Benefit zz',
        };
        this.setState({
          data: [...data, newData],
          count: count + 1,
        });*/
    };

    render () {




        return (
            <div className="ant-layout">
                <Row>
                    <Col span={5}>
                        <div>
                            <Button type="primary" onClick={this.showModal}>
                                New Collection
                            </Button>
                            <CreateNewGoalForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                        </div>
                    </Col>
                </Row>

            </div>

        )
    }
}
