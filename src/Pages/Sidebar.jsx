// src/components/Sidebar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CoffeeOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ selectedKey, onMenuClick }) => (
  <Sider breakpoint="lg" collapsedWidth="0" style={{ background: '#001529' }}>
    <div className="text-center text-white py-4">
      <h4>Bean Barrel</h4>
    </div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[selectedKey]}
      onClick={onMenuClick}
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="menu" icon={<CoffeeOutlined />}>
        Menu
      </Menu.Item>
        <Menu.Item key="customers" icon={<UserOutlined />}>
        Inventory
      </Menu.Item>
        <Menu.Item key="sale" icon={<ShoppingCartOutlined />}>
        Sales
      </Menu.Item>
    
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
