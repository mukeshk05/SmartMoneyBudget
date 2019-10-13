import React, { useState } from 'react';
import { Layout, Menu, Drawer, Icon } from 'antd';
import {Default, Mobile} from "./resposive";
const { Header } = Layout;

const Navbar = props => {
    const [visible, setVisible] = useState(false);
    const menu = (
        <Menu
            theme="dark"
            mode={visible ? 'horizontal': 'vertical'}
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '300px' }}
        >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
    );

    return (
        <Header className="app-header">
            <div className="logo">Antd Live Theme</div>
            <Default>{menu}</Default>
            <Mobile>
                <Icon type="bars" size="large" className="nav-icon" onClick={() => setVisible(true)} />
                <Drawer
                    title=""
                    placement="right"
                    closable
                    onClose={() => setVisible(false)}
                    visible={visible}
                    className="nav-drawer"
                >

                    <div className="logo">Antd Live Theme</div>
                    {menu}
                </Drawer>
            </Mobile>
        </Header>
    );
};

export default Navbar;