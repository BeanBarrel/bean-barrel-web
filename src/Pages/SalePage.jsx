import React, { useEffect, useState } from 'react';
import { Layout, Table, Dropdown, Space } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import Sidebar from './Sidebar';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Card, Grid, Typography } from '@mui/material'; // ✅ MUI

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const { Header, Content } = Layout;
const API_URL = process.env.REACT_APP_API_URL;

const storeItems = [
  { key: "1", label: "Ernakulam" },
  { key: "2", label: "Aluva" },
];

const SalePage = ({ onMenuClick }) => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStore, setSelectedStore] = useState("Select Store");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`${API_URL}sales`);
         const sortedData = response.data.sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      );
        setSalesData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };
    fetchSales();
  }, []);

  const handleMenuClick = (e) => {
    const storeName = e.key === "1" ? "Ernakulam" : "Aluva";
    const storeId = e.key === "1" ? 0 : 1;
    setSelectedStore(storeName);

    const filtered = salesData.filter(sale => sale.store === storeId);
    setFilteredData(filtered);
  };

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

  const totalSales = filteredData.length;
  const totalAmount = filteredData.reduce((sum, sale) => sum + Number(sale.totalAmount), 0);

  const paymentSummary = { Cash: 0, Card: 0, UPI: 0 };
  filteredData.forEach(sale => {
    if (paymentSummary.hasOwnProperty(sale.paymentMethod)) {
      paymentSummary[sale.paymentMethod] += Number(sale.totalAmount);
    }
  });

  const chartData = {
    labels: Object.keys(paymentSummary),
    datasets: [
      {
        label: 'Payment Breakdown',
        data: Object.values(paymentSummary),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) => `₹ ${context.parsed.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar selectedKey="menu" onMenuClick={onMenuClick} />
      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Sales Page</h2>
          <Dropdown menu={{ items: storeItems, onClick: handleMenuClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {selectedStore}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content style={{ margin: '20px' }}>
          <Grid container spacing={2} style={{ marginBottom: 20 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h4">{totalSales}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h4">₹ {totalAmount}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Payment Breakdown</Typography>
                <Pie data={chartData} options={chartOptions} />
              </Card>
            </Grid>
          </Grid>

          <Table
            dataSource={filteredData}
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
