// src/components/DashboardPage.js
import React from 'react';
import { Layout, Card } from 'antd';
import Sidebar from './Sidebar';

const { Content } = Layout;

const DashboardPage = ({ onMenuClick }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sidebar selectedKey="dashboard" onMenuClick={onMenuClick} />
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

export default DashboardPage;
