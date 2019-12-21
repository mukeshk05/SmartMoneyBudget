import React, { useState } from "react";
import { Drawer, Icon, Layout, Menu } from "antd";
import "antd/es/date-picker/style/css";
import { Default, Mobile } from "../SideBar/resposive";
import "../../styles/index.css";
import Tooltip from "antd/es/tooltip";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
const { Header } = Layout;

const HeaderRes = props => {
  const [visible, setVisible] = useState(false
  );



  const sideBarMenuKey = useSelector(
      state => state.currentComponetReducer.sideBarMenuItemKey
  );


  const menu = (
      <Menu
          theme="dark"
          mode={visible ? "vertical" : "horizontal"}
          defaultSelectedKeys={"/"}
          selectedKeys={[sideBarMenuKey]}
          style={{ lineHeight: "64px" }}
      >

        <Menu.Item key="paystub" >
          <NavLink to="/paystub/manualentry"> Pay Stub</NavLink>
        </Menu.Item>
        <Menu.Item key="budget" >
          <NavLink to="/budget/budgetEntry">Budget</NavLink>
        </Menu.Item>
        <Menu.Item key="advice" >
          <NavLink to="/advice"> Advice</NavLink>
        </Menu.Item>
        <Menu.Item key="goals" >
          <NavLink to="/goals"> Goals</NavLink>
        </Menu.Item>
        <Menu.Item key="calculator" >
          <NavLink to="/calculator">Calculators</NavLink>
        </Menu.Item>
        <Menu.Item key="accounts" >
          <NavLink to="/accounts/cash">Accounts</NavLink>
        </Menu.Item>
        <Menu.Item key="7" hidden={visible}>
          <Tooltip title="Setting">
          <span>
            <Icon type="setting" spin="true" />
          </span>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="8"  hidden={visible}>
          <Tooltip title="Help">
          <span>
            <Icon type="question-circle" spin="true" />
          </span>
          </Tooltip>
        </Menu.Item>
      </Menu>

  );


  return (
      <Header className="app-header">
        <div className="logo">
          <Icon type="dollar" />
          mart Money
        </div>
        <Default>{menu}</Default>
        <Mobile>
          <Icon
              type="bars"
              size="large"
              className="nav-icon"
              onClick={() => setVisible(true)}
          />
          <Drawer
              title=""
              placement="right"
              closable
              onClose={() => setVisible(false)}
              visible={visible}
              className="nav-drawer"
          >
            <div className="logo">
              <Icon type="dollar" />
              mart Money
            </div>
            {menu}
          </Drawer>
        </Mobile>
      </Header>
  );
};

export default HeaderRes;