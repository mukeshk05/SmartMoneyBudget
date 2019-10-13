import React, { useEffect, useState } from "react";
import { Layout, Icon, Menu, Button } from "antd";
import HeaderRes from "../header/Header";
import { useDispatch} from "react-redux";
import CURRENT_COMPONENT from "../../reducers/types";
import {
    HashRouter  as Router,
    NavLink,
    Route
} from "react-router-dom";

import SubMenu from "antd/es/menu/SubMenu";
import ManualPayEntry from "./manual/ManualPayEntry";
import ScanPDF from "./scanpdf/ScanPDF";
const { Content, Sider, Footer } = Layout;

const PayStubSideBar = props => {
    const [collapsed, onCollapse] = useState(false);

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch({
                type: CURRENT_COMPONENT,
                payload: { component: "paystub", sideBarMenuKey: "paystub" }
            });
        },
        [dispatch]
    );

    {
        return (
            <Layout className="app">
                <HeaderRes />
                <Content className="content">
                    <Router>
                        <Layout style={{ padding: "0px 0px" }}>
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
                                width="270"
                            >
                                <div style={{ padding: "0px 0px" }}>
                                    <Button
                                        type="primary"
                                        onClick={() => onCollapse(!collapsed)}
                                        style={{ marginBottom: 16 }}
                                    >
                                        {<Icon type={collapsed ? "menu-unfold" : "menu-fold"} />}
                                    </Button>
                                    <Menu
                                        defaultSelectedKeys={["manualentry"]}
                                        mode="inline"
                                        theme="dark"
                                        inlineCollapsed={collapsed}
                                        style={{ padding: "0px 0px" }}
                                    >

                                        <SubMenu
                                            key="pay"
                                            title={
                                                <span>
                      <Icon type="gold" />
                      <span>Pay Stubs</span>
                    </span>
                                            }
                                        >
                                            <Menu.Item key="autoscan">
                                                <NavLink to="/paystub/autoscanpdf">
                                                    <span>Auto Scan</span>
                                                </NavLink>
                                            </Menu.Item>
                                            <Menu.Item key="manualentry">
                                                <NavLink to="/paystub/manualentry">
                                                    <span>Manual Entry</span>
                                                </NavLink>
                                            </Menu.Item>
                                        </SubMenu>


                                    </Menu>
                                </div>
                            </Sider>
                            <Content className="content" style={{ margin: "0px 0px 0" }}>
                                <Route path="/paystub/autoscanpdf" component={ScanPDF}/>
                                <Route path="/paystub/manualentry" component={ManualPayEntry} />

                            </Content>
                        </Layout>
                    </Router>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    ©2019 Created by{" "}
                    <span>
            {" "}
                        <Icon type="dollar" />
            mart Money
          </span>
                </Footer>
            </Layout>
        );
    }
};
export  default PayStubSideBar;
