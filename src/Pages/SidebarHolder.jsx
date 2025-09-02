// src/App.js
import React, { useState } from 'react';
import DashboardPage from './DashboardPage';
import CustomersPage from './CustomersPage';
import MenuPage from './MenuPage';
import SalePage from './SalesPage';

const SidebarHolder = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      // Implement logout logic
      alert('Logged out');
      return;
    }
    setCurrentPage(e.key);
  };

  switch (currentPage) {
    case 'dashboard':
      return <DashboardPage onMenuClick={handleMenuClick} />;
    case 'customers':
      return <CustomersPage onMenuClick={handleMenuClick} />;
    case 'menu':
      return <MenuPage onMenuClick={handleMenuClick} />;
    case 'sale':
      return <SalePage onMenuClick={handleMenuClick} />;
    default:
      return <DashboardPage onMenuClick={handleMenuClick} />;
  }
};

export default SidebarHolder;
