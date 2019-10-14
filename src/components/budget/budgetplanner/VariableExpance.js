'use strict';
import React from 'react'
import {Table,Input, Select, Row, Col, Button, Statistic,} from 'antd'
import AddAttributeForm from "../../paystub/manual/manualfntryforms/AddAttributeForm";
import "../../../styles/index.css";

const { Option } = Select;

export class VariableExpance extends React.Component {

    constructor () {
        super();
        this.state = {
            data : [{
                key: '14',
                topic: 'Food',
            }, {
                key: '25',
                topic: 'Extra Mortgage Payment',
            }, {
                key: '33',
                topic: 'Shopping',
            },{
                key: '43',
                topic: 'Health & Fitness',
            }, {
                key: '53',
                topic: 'Entertainment',
            },{
                key: '54',
                topic: 'Car Gasoline & Tolls',
            }, {
                key: '55',
                topic: 'Insurance y',
            },{
                key: '56',
                topic: 'Insurance z',
            }, {
                key: '57',
                topic: 'Personal Care',
            }],
            count: 7,
        };
        this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
        this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
    }


    handleFirstNameChanged (event) {
        this.setState({firstName: event.target.value})
    }

    handleLastNameChanged (event) {
        this.setState({lastName: event.target.value})
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { count, data } = this.state;
        console.log("Counter",count);
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const newData={
                key: count,
                topic: values.title,
            };
            console.log('Received values of form: ', values);
            console.log("'Received old data: ",newData);
            this.setState({
                data: [...data, newData],
                count: count + 1,
            });
            /*  this.setState(prevState => ({
                data: { ...prevState.data, values },
                count: count+1,
              }));*/

            //console.log('Pre Data',{state});
            form.resetFields();
            this.setState({ visible: false });

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

        const columns = [{
            title: <div style={{}} >{"Title"}</div>,
            dataIndex: 'topic',
            key: 'topic',
            width:"200px",
            height:"20px",
            render: text => <div style={{}}>{text}</div>,
        }, {
            title: 'primary',
            dataIndex: 'primary',
            key: 'primary',
            width:"200px",
            height:"20px",
            render: husband => <tr><td><Select
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
            </Select></td><td><Input /></td></tr>
        }, {

            title: 'spouse',
            dataIndex: 'spouse',
            key: 'spouse',
            width:"200px",
            height:"20px",
            render: wife => <tr><td><Select
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
            </Select></td><td><Input /></td></tr>

        }, ];


        return (
            <div className="ant-layout">
                <Row>
                    <Col span={5}>
                        <div>
                            <Button type="primary" onClick={this.showModal}>
                            Add New Variable Expenses
                            </Button>
                            <AddAttributeForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={50}>
                        <div className="App">
                            <Table  columns={columns} dataSource={this.state.data} pagination={false} size={"small"}  scroll={{ y: 400 }}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={1}>

                    </Col>
                    <Col span={11}>
                        <div className="ant-layout">Total</div>
                    </Col>
                    <Col span={2}>
                        <Statistic title="Primary Income" value={1128} />
                    </Col>
                    <Col span={6}>

                    </Col>
                    <Col span={3}>
                        <Statistic title="Spouse Income" value={1128}  />
                    </Col>
                </Row>
            </div>

        )
    }
}
