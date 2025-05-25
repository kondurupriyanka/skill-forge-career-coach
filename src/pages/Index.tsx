
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Index;
