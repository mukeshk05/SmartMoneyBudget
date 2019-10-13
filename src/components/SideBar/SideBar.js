import React from "react";
import { Layout, Icon, Menu, Button } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import HeaderRes from "../header/Header";
import MultiChart from "./MultiChart";
const { Content, Sider, Footer } = Layout;

class SideBar extends React.Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {

    return (
      <Layout className="app">
        <HeaderRes />
        <Content style={{ padding: "0px 0px" }}>
          <Layout style={{ padding: "0px 0px", background: "#fff" }}>
            <Sider
              style={{ padding: "0px 0px", background: "#f256" }}
              id="sider-menu"
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              breakpoint="lg"
              onBreakpoint={broken => {
                // this.toggleCollapsed();
              }}
              onCollapse={(collapsed, type) => {
                this.toggleCollapsed();
              }}
            >
              <div style={{ padding: "0px 0px", background: "#f256" }}>
                <Button
                  type="primary"
                  onClick={this.toggleCollapsed}
                  style={{ marginBottom: 16 }}
                >
                  <Icon
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  />
                </Button>
                <Menu
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                  style={{ padding: "0px 0px", background: "#f256" }}
                >
                  <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Icon type="inbox" />
                    <span>Option 3</span>
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                      </span>
                    }
                  >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="appstore" />
                        <span>Navigation Two</span>
                      </span>
                    }
                  >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                      <Menu.Item key="11">Option 11</Menu.Item>
                      <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                </Menu>
              </div>
            </Sider>
            <Content className="content" style={{ margin: "0px 0px 0" }}>
              <MultiChart />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {" "}
          ©2019 Created by <Icon type="dollar" />
          mart Money
        </Footer>
      </Layout>
    );
  }
}
export  default SideBar;
