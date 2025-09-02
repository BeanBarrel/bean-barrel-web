import React, { useEffect, useState } from 'react';
import { Layout, Table, Dropdown, Space, DatePicker, Button } from 'antd';
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import Sidebar from './Sidebar';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Card, Grid, Typography } from '@mui/material';
import dayjs from "dayjs";

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
  { key: "1", label: "Ernakulam", id: 0 },
  { key: "2", label: "Aluva", id: 1 },
];

const SalesPage = ({ onMenuClick }) => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStore, setSelectedStore] = useState(0); // Default to store 0
  const [selectedStoreLabel, setSelectedStoreLabel] = useState("Ernakulam");
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to today

  const fetchSales = async (date = dayjs(), store = 0) => {
    try {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const url = `${API_URL}sales/by-date-store?date=${formattedDate}&store=${store}`;

      const response = await axios.get(url);
      const sortedData = response.data.sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      );
      setSalesData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  useEffect(() => {
    fetchSales(selectedDate, selectedStore);
  }, []);

  const handleMenuClick = (e) => {
    const selected = storeItems.find(item => item.key === e.key);
    setSelectedStore(selected.id);
    setSelectedStoreLabel(selected.label);
  };

  const handleFilter = () => {
    fetchSales(selectedDate, selectedStore);
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
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount', render: (val) => `₹ ${val}` },
    { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod' },
    { title: 'Date', dataIndex: 'dateTime', key: 'dateTime', render: (text) => new Date(text).toLocaleString() },
  ];

  // Calculate totals
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
          <Space>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              format="YYYY-MM-DD"
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleFilter}>
              Filter
            </Button>
            <Dropdown menu={{ items: storeItems, onClick: handleMenuClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {selectedStoreLabel}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ margin: '20px' }}>
          {/* Top Stats */}
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

          {/* Sales Table */}
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

export default SalesPage;
