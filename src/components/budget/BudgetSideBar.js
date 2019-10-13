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
import DonutChart from "../SideBar/DonutChart";
import CashFlow from "./CashFlow";
import Saving from "./Saving";
import Income from "./Income";
import Tracket from "./Tracker";
import SubMenu from "antd/es/menu/SubMenu";
const { Content, Sider, Footer } = Layout;

const BudgetSideBar = props => {
  const [collapsed, onCollapse] = useState(false);

  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch({
        type: CURRENT_COMPONENT,
        payload: { component: "budget", sideBarMenuKey: "budget" }
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
                    defaultSelectedKeys={["budgetspending"]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    style={{ padding: "0px 0px" }}
                  >

                    <SubMenu
                        key="cashflow"
                        title={
                          <span>
                      <Icon type="gold" />
                      <span>Cash Flow</span>
                    </span>
                        }
                    >
                      <Menu.Item key="income">
                        <NavLink to={"/budget/income"}>
                          <Icon type="fund" spin="true" />
                          <span>Income</span>
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item key="budgetspending">
                        <NavLink to="/budget/budgetspending">
                          <Icon type="caret-right" spin="true" />
                          <span>Spending</span>
                        </NavLink>
                      </Menu.Item>

                      <Menu.Item key="saving">
                        <NavLink to={"/budget/saving"}>
                          <Icon type="strikethrough" spin="true" />
                          <span>Saving</span>
                        </NavLink>
                      </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="tracker">
                      <NavLink to="/budget/trackers">
                      <Icon type="transaction" spin="true" />
                      <span>Tracker</span>
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Icon type="fund" spin="true" />
                      <span>Total Income</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Icon type="file-done" />
                      <span>Taxes (SS, Medicare, Medicaid)</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                          <span>
                      <Icon type="euro" />
                      <span>Pre Tax Items</span>
                    </span>
                        }
                    >
                      <Menu.Item key="5">Retirement (401k, PF)</Menu.Item>
                      <Menu.Item key="6">HSA</Menu.Item>
                      <Menu.Item key="7">FSA</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                          <span>
                      <Icon type="gold" />
                      <span>Total Take Home Pay</span>
                    </span>
                        }
                    >
                      <Menu.Item key="8">Budget</Menu.Item>
                      <Menu.Item key="9">50% - Category</Menu.Item>
                      <Menu.Item key="10">30% - Category</Menu.Item>
                      <Menu.Item key="11">20% - Category</Menu.Item>
                    </SubMenu>
                  </Menu>
                </div>
              </Sider>
              <Content className="content" style={{ margin: "0px 0px 0" }}>
                <Route path="/budget/budgetspending" component={DonutChart} />
                <Route path="/budget/trackers" component={Tracket} />
                <Route path="/budget/cashflow" component={CashFlow}/>
                <Route path="/budget/saving" component={Saving}/>
                <Route path="/budget/income" component={Income}/>
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
export  default BudgetSideBar;
