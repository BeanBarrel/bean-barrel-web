import React, { useEffect, useState } from 'react';
import { Layout, Table } from 'antd';
import Sidebar from './Sidebar';
import axios from 'axios';

const { Header, Content } = Layout;

const SalePage = ({ onMenuClick }) => {
  const [salesData, setSalesData] = useState([]);

  // Fetch sales data from API
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:9091/api/sales');
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  // Flatten items for display in expandable rows
  const expandedRowRender = (record) => {
    const columns = [
      { title: 'Item Name', dataIndex: ['item', 'itemName'], key: 'itemName' },
      { title: 'Description', dataIndex: ['item', 'itemDescription'], key: 'itemDescription' },
      { title: 'Price', dataIndex: ['item', 'itemPrice'], key: 'itemPrice' },
      { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    ];

    return <Table dataSource={record.items} columns={columns} pagination={false} rowKey="id" />;
  };

  const columns = [
    { title: 'Bill Number', dataIndex: 'billNumber', key: 'billNumber' },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod' },
    { title: 'Date', dataIndex: 'dateTime', key: 'dateTime', render: (text) => new Date(text).toLocaleString() },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar selectedKey="menu" onMenuClick={onMenuClick} />
      <Layout>
        <Header style={{ backgroundColor: '#fff', padding: '0 20px' }}>
          <h2>Sales Page</h2>
        </Header>
        <Content style={{ margin: '20px' }}>
          <Table
            dataSource={salesData}
            columns={columns}
            rowKey="id"
            expandable={{ expandedRowRender }}
          />
        </Content>
       
      </Layout>
    </Layout>
  );
};

export default SalePage;
