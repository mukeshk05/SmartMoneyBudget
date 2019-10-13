import React, { useEffect, useState} from "react";
import {Layout, Icon, Menu, Button} from "antd";
import HeaderRes from "../header/Header";
import SubMenu from "antd/es/menu/SubMenu";
import { useDispatch } from "react-redux";
import CURRENT_COMPONENT from "../../reducers/types";



const { Content, Sider, Footer } = Layout;
const AdviceSideBar = props => {

  const [collapsed, onCollapse] = useState(false);


  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch({
        type: CURRENT_COMPONENT,
        payload: { component: "advice", sideBarMenuKey: "advice" }
      });
    },
    [dispatch]
  );

  return (
    <Layout className="app">
      <HeaderRes />
      <Content style={{ padding: "0px 0px" }}>
        <Layout style={{ padding: "0px 0px" }}>
          <Sider
            style={{ padding: "0px 0px", border: 10 }}
            id="sider-menu"
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            onBreakpoint={broken => {

            }}
            onCollapse={onCollapse}
            width="270"
          >
            <div style={{ padding: "0px 0px" }}>
              <Button
                  type="primary"
                  style={{ marginBottom: 16 }}
                  onClick={() => onCollapse(!collapsed)}
              >
                {<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}  />}
              </Button>
              <Menu
                defaultSelectedKeys={["debtngmt"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                style={{ padding: "0px 0px" }}
              >
                <Menu.Item key="debtngmt">
                  <Icon type="dollar" />
                  <span>Debt Mgmt</span>
                </Menu.Item>
                <Menu.Item key="rp">
                  <Icon type="user" />
                  <span>Retirement Planning</span>
                </Menu.Item>
                <Menu.Item key="kids">
                  <Icon type="smile" theme="outlined" />
                  <span>Kids</span>
                </Menu.Item>
                <SubMenu
                  key="cp"
                  title={
                    <span>
                     <Icon type="trophy" />
                      <span>College Planning</span>
                    </span>
                  }
                >
                  <Menu.Item key="529">529</Menu.Item>
                  <Menu.Item key="sl">Student Loans</Menu.Item>
                </SubMenu>
                <Menu.Item key="medical">
                  <Icon type="medicine-box" />
                  <span>Medical</span>
                </Menu.Item>

                <Menu.Item key="vehicle">
                  <Icon type="car" />
                  <span>Vehicle</span>
                </Menu.Item>

                <SubMenu
                  key="cc"
                  title={
                    <span>
                      <Icon type="credit-card" />
                      <span>Credit Cards</span>
                    </span>
                  }
                >
                  <Menu.Item key="fee">Fees</Menu.Item>
                  <Menu.Item key="point">Points</Menu.Item>
                </SubMenu>

                <Menu.Item key="fa">
                  <Icon type="phone" />
                  <span>Financial Advice</span>
                </Menu.Item>
                <Menu.Item key="inv">
                  <Icon type="pound" />
                  <span>Investing</span>
                </Menu.Item>
                <Menu.Item key="sav">
                  <Icon type="save" />
                  <span>Savings</span>
                </Menu.Item>
                <Menu.Item key="trv">
                  <Icon type="rocket" />
                  <span>Travel</span>
                </Menu.Item>
                <Menu.Item key="hb">
                  <Icon type="home" />
                  <span>Home Buying</span>
                </Menu.Item>
                <Menu.Item key="wts">
                  <Icon type="loading-3-quarters" />
                  <span>Ways to Save</span>
                </Menu.Item>
                <Menu.Item key="ban">
                  <Icon type="bank" />
                  <span>Banking</span>
                </Menu.Item>
                <Menu.Item key="ins">
                  <Icon type="insurance" />
                  <span>Insurance</span>
                </Menu.Item>
                <Menu.Item key="cs">
                  <Icon type="percentage" />
                  <span>Credit Score</span>
                </Menu.Item>
                <Menu.Item key="bm">
                  <Icon type="exception" />
                  <span>Bills Mgmt</span>
                </Menu.Item>
                <Menu.Item key="subsc">
                  <Icon type="youtube" />
                  <span>Subscriptions</span>
                </Menu.Item>

                <SubMenu
                  key="sol"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Stages of Life</span>
                    </span>
                  }
                >
                  <Menu.Item key="ki">Kid</Menu.Item>
                  <Menu.Item key="ya">Young Adult</Menu.Item>
                  <Menu.Item key="ad">Adult</Menu.Item>
                  <Menu.Item key="ret">Retirement</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Sider>
          <Content className="content" style={{ margin: "0px 0px 0" }} />
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2019 Created by{" "}
        <span>
          {" "}
          <Icon type="dollar" spin="true" />
          mart Money
        </span>
      </Footer>
    </Layout>
  );
};
export  default AdviceSideBar;
