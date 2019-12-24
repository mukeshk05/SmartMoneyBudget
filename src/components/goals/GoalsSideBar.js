import React, {useEffect, useState} from "react";
import {Layout, Icon, Menu, Button, Row, Col, Carousel} from "antd";
import HeaderRes from "../header/Header";
import {useDispatch} from "react-redux";
import CURRENT_COMPONENT from "../../reducers/types";
import SubMenu from "antd/es/menu/SubMenu";
import CreateNewGoalForm from "./CreateNewGoalForm";
import  '../../styles/index.css';
import MultiChart from "../SideBar/MultiChart";
import BudgetFooter from "../footer/Footer";
const { Content, Sider, Footer } = Layout;


const GoalsSideBar = props => {
    const [collapsed, onCollapse] = useState(false);
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch({
                type: CURRENT_COMPONENT,
                payload: { component: "goals", sideBarMenuKey: "goals" }
            });
        },
        [dispatch]
    );


    const  [ formRef, saveFormRef] = useState(formRef);

    const  [ visible, showModal] = useState(false);
    const [message,setMessage]=useState(['Vacation','Car','Home']);

    const handleCancel = () => {
        showModal(false);
    };
    const handleCreate = () => {
        const { form } = formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', [...message,values.goal]);
            setMessage([...message,values.goal]);
            form.resetFields();

            //this.props.parentCallback(prevState =>values.goal);
        });

        showModal(false);
    };

    {
        return (
            <Layout className="app">
                <HeaderRes user={props.user} />
                <Content style={{ padding: "0px 0px" }}>
                    <Layout style={{ padding: "0px 0px"}}>
                        <Sider
                            style={{ padding: "0px 0px" }}
                            id="sider-menu"
                            trigger={null}
                            collapsible
                            collapsed={collapsed}
                            breakpoint="lg"
                            onBreakpoint={broken => {
                                // this.toggleCollapsed();
                            }}
                            onCollapse={onCollapse}
                        >
                            <div style={{ padding: "0px 0px" }}>
                                <Button
                                    type="primary"
                                    onClick={() => onCollapse(!collapsed)}
                                    style={{ marginBottom: 16 }}
                                >
                                    {<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}  />}
                                </Button>
                                <Menu
                                    defaultSelectedKeys={["vac"]}
                                    mode="inline"
                                    theme="dark"
                                    inlineCollapsed={collapsed}
                                    style={{ padding: "0px 0px" }}
                                >
                                    <SubMenu
                                        key="goals"
                                        title={
                                            <span>
                     <Icon type="crown" />
                      <span>Goals</span>
                    </span>
                                        }
                                    >{message.map(reptile =>
                                        <Menu.Item key={reptile}>
                                            <Icon type="crown" />
                                            <span>{reptile}</span>
                                        </Menu.Item>)}


                                    </SubMenu>

                                </Menu>
                            </div>
                        </Sider>
                        <Content className="content" style={{ margin: "0px 0px 0" }} >
                            <div className="ant-layout">
                                <Row>
                                    <Col span={5}>
                                        <div>
                                            <Button type="primary" onClick={showModal}>
                                                New Goal
                                            </Button>
                                            <CreateNewGoalForm
                                                wrappedComponentRef={saveFormRef}
                                                visible={visible}
                                                onCancel={handleCancel}
                                                onCreate={handleCreate}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div >
                                    <Carousel >
                                        {message.map(reptile =><div>
                                            <h3>{reptile}</h3>
                                            <MultiChart/>
                                        </div> )}
                                    </Carousel>
                                    </div>
                                </Row>
                            </div>

                        </Content>
                    </Layout>
                </Content>
               <BudgetFooter/>
            </Layout>
        );
    }
};
export  default GoalsSideBar;
