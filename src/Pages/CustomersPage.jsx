// src/components/CustomersPage.js
import React from 'react';
import { Layout, Card } from 'antd';
import Sidebar from './Sidebar';

const { Content } = Layout;

const CustomersPage = ({ onMenuClick }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sidebar selectedKey="customers" onMenuClick={onMenuClick} />
    <Layout>
      <Content style={{ margin: '20px' }}>
        <h2>Customers</h2>
        <Card>
          <p>Customer list and management goes here.</p>
        </Card>
      </Content>
    </Layout>
  </Layout>
);

export default CustomersPage;
