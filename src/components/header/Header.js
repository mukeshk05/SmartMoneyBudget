import React, { useState } from "react";
import {Button, Divider, Drawer, Icon, Layout, Menu, Modal, Popover} from "antd";
import "antd/es/date-picker/style/css";
import { Default, Mobile } from "../SideBar/resposive";
import "../../styles/index.css";
import {useSelector} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import "../login/login1.css";
import app from "../base";
import { useHistory } from "react-router-dom";
import * as firebase from "firebase";
const { Header } = Layout;


const HeaderRes = props => {
  const [visible, setVisible] = useState(false
  );

  let history = useHistory();

  const sideBarMenuKey = useSelector(
      state => state.currentComponetReducer.sideBarMenuItemKey
  );

  const handleSignOut=()=>
  {

     app.auth().signOut()
        .then(() => {

        });
  };

  const content = (
      <div >
        <div  style={{ width: 250,
          height: 250,background:"skyblue"}}>
          <div style={{height:"20px"}}/>
          <img src={props.user.photoURL} alt="Logo"  className="profileImage" style={{ borderRadius: 200 / 2}}/>
          <div style={{height:"20px"}}/>
          <div   align="center" style={{color:"black",height:"20px"}}>{props.user.displayName}</div>
          <div style={{height:"20px"}}/>
          <div   align="center" style={{color:"black",height:"80px"}}>{props.user.email}</div>
        </div>
        <Divider/>
        <div >

          <Menu.Item key="profile" >
            <NavLink to=""><Icon type="profile" /> Profile</NavLink>
          </Menu.Item>
          <Menu.Item key="help" >
            <NavLink to=""><Icon type="question-circle"  /> Help</NavLink>
          </Menu.Item>
          <Menu.Item key="settings" >
            <NavLink to=""><Icon type="setting" /> Help</NavLink>
          </Menu.Item>
        <Menu.Item key="logOut"  onClick={handleSignOut}>
          <NavLink to=""><Icon type="logout"  /> Log Out</NavLink>
        </Menu.Item>
        </div>
      </div>
  );


  const menu = (
      <Menu
          theme="dark"
          mode={visible ? "vertical" : "horizontal"}
          defaultSelectedKeys={"/"}
          selectedKeys={[sideBarMenuKey]}
          style={{ lineHeight: "64px" }}
      >
          <Menu.Item key="dashboard" >
              <NavLink to="/"> Dash Board</NavLink>
          </Menu.Item>
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
        <Menu.Item key="user" hidden={visible}>
          <span>
           <Popover placement="bottom" content={content} trigger="click" >
               {props.user.photoURL?<img src={props.user.photoURL} alt="Logo"  style={{ width: 50,
                   height: 50,
                   borderRadius: 100 / 2}}/>:<Icon type="user"/>
               }
          </Popover>
          </span>
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

export default withRouter(HeaderRes);