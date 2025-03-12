// src/components/layout/PageContainer/PageContainer.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import './PageContainer.css';

const PageContainer = ({ children }) => {
  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;