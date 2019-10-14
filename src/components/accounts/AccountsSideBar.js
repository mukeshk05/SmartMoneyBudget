import React, {useEffect, useState} from "react";
import { Layout, Icon, Menu, Button } from "antd";
import HeaderRes from "../header/Header";
import {useDispatch} from "react-redux";
import CURRENT_COMPONENT from "../../reducers/types";
import SubMenu from "antd/es/menu/SubMenu";
import {
    HashRouter as Router,
    NavLink,
    Route
} from "react-router-dom";
import Cash from "./Cash";
import BudgetFooter from "../footer/Footer";
const { Content, Sider, Footer } = Layout;

const AccountsSideBar = props => {
    const [collapsed, onCollapse] = useState(false);

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch({
                type: CURRENT_COMPONENT,
                payload: { component: "accounts", sideBarMenuKey: "accounts" }
            });
        },
        [dispatch]
    );


    {
        return (
            <Layout className="app">
                <HeaderRes />
                <Content style={{ padding: "0px 0px" }}>
                    <Router>
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
                                    defaultSelectedKeys={["cash"]}
                                    mode="inline"
                                    theme="dark"
                                    inlineCollapsed={collapsed}
                                    style={{ padding: "0px 0px" }}
                                >
                                    <SubMenu
                                        key="sub2"
                                        title={
                                            <span>
                      <Icon type="gold" />
                      <span>Total Net Worth</span>
                    </span>
                                        }
                                    >
                                        <Menu.Item key="cash">
                                            <NavLink to="/accounts/cash">
                                            <Icon type="dollar" />
                                            <span>Cash</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="cc">
                                            <Icon type="credit-card" />
                                            <span>Credit Cards</span>
                                        </Menu.Item>
                                        <Menu.Item key="loans">
                                            <Icon type="transaction" />
                                            <span>Loans</span>
                                        </Menu.Item>
                                        <Menu.Item key="investment">
                                            <Icon type="line-chart" />
                                            <span>Investments</span>
                                        </Menu.Item>
                                        <Menu.Item key="property">
                                            <Icon type="property-safety" />
                                            <span>Property</span>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </div>
                        </Sider>
                        <Content className="content" style={{ margin: "0px 0px 0" }} >
                            <Route path="/accounts/cash" component={Cash} />
                        </Content>
                    </Layout>
                    </Router>
                </Content>
            <BudgetFooter/>
            </Layout>
        );
    }
};
export  default AccountsSideBar;
