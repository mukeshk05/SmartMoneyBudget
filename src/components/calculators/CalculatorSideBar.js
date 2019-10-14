import React, {useEffect, useState} from "react";
import { Layout, Icon, Menu, Button } from "antd";
import HeaderRes from "../header/Header";
import {useDispatch} from "react-redux";
import CURRENT_COMPONENT from "../../reducers/types";
import BudgetFooter from "../footer/Footer";
const { Content, Sider, Footer } = Layout;

const CalculatorSideBar = props => {
    const [collapsed, onCollapse] = useState(false);

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch({
                type: CURRENT_COMPONENT,
                payload: { component: "calculator", sideBarMenuKey: "calculator" }
            });
        },
        [dispatch]
    );


    {
        return (
            <Layout className="app">
                <HeaderRes />
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
                                    defaultSelectedKeys={["nw"]}
                                    mode="inline"
                                    theme="dark"
                                    inlineCollapsed={collapsed}
                                    style={{ padding: "0px 0px" }}
                                >
                                    <Menu.Item key="lc">
                                        <Icon type="check-circle" />
                                        <span>Loan Calculator</span>
                                    </Menu.Item>
                                    <Menu.Item key="mc">
                                        <Icon type="bg-colors" />
                                        <span>Mortgage Calculator</span>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </Sider>
                        <Content className="content" style={{ margin: "0px 0px 0" }} />
                    </Layout>
                </Content>
                <BudgetFooter/>
            </Layout>
        );
    }
};
export  default CalculatorSideBar;
