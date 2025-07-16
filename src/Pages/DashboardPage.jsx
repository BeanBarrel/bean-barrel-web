import React from 'react';
import { Layout, Menu, Card } from 'antd';
import {
  DashboardOutlined,
  CoffeeOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Sider, Content } = Layout;

const DashboardPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0" style={{ background: '#001529' }}>
        <div className="text-center text-white py-4">
          <h4>Bean Barrel</h4>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="orders" icon={<CoffeeOutlined />}>
            Orders
          </Menu.Item>
          <Menu.Item key="customers" icon={<UserOutlined />}>
            Customers
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Content style={{ margin: '20px' }}>
          <h2>Dashboard</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <Card title="Today's Sales" bordered={false}>
                $500
              </Card>
            </div>
            <div className="col-md-4 mb-4">
              <Card title="Orders" bordered={false}>
                35
              </Card>
            </div>
            <div className="col-md-4 mb-4">
              <Card title="Customers" bordered={false}>
                120
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
