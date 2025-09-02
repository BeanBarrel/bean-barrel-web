import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Box, Card, Grid, Typography, CircularProgress, Container } from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const API_URL = process.env.REACT_APP_API_URL;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
const STATUS_COLORS = { 0: '#82ca9d', 1: '#ff4d4f', 2: '#8884d8' };

const DashboardPage = ({ onMenuClick }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `${API_URL}dashboard`;

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress size={60} /></Box>;

  const statusLabels = { 0: 'Completed', 1: 'Cancelled', 2: 'Pending' };
  const paymentData = Object.entries(data.salesByPaymentMethod).map(([method, count]) => ({ name: method, value: count }));
  const statusData = Object.entries(data.salesByStatus).map(([status, count]) => ({ name: statusLabels[status], value: count, color: STATUS_COLORS[status] }));
  const monthlyData = data.monthlySales.map(item => ({ month: item.month, revenue: item.revenue, salesCount: item.salesCount }));
const storeNames = {
  0: 'Ernakulam',
  1: 'Aluva'
};

const storeData = Object.entries(data.storeSales).map(([store, revenue]) => ({
  name: storeNames[store] || `Store ${store}`, // fallback in case a new store appears
  revenue
}));

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar selectedKey="dashboard" onMenuClick={onMenuClick} />

      <Box component="main" flexGrow={1} sx={{ backgroundColor: '#f5f5f5', py: 3 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>Dashboard</Typography>

          {/* Summary Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h4">${data.totalRevenue}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6">Total Sales Count</Typography>
                <Typography variant="h4">{data.totalSalesCount}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, minWidth: 500 }}>
                <Typography variant="h6">Sales by Payment Method</Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie data={paymentData} dataKey="value" nameKey="name" outerRadius={120}>
                      {paymentData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ p: 2, minWidth: 500 }}>
                <Typography variant="h6">Cancelled Orders</Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={120}>
                      {statusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>

          {/* Monthly Sales & Revenue */}
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <Card sx={{ p: 2, minWidth: 900 }}>
                <Typography variant="h6">Monthly Sales & Revenue</Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="salesCount" stroke="#8884d8" />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>

          {/* Store Sales */}
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <Card sx={{ p: 2, minWidth: 900 }}>
                <Typography variant="h6">Store Sales</Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={storeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
