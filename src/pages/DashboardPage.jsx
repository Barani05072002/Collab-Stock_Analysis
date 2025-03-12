// src/pages/DashboardPage.jsx
import React from 'react';
import PageContainer from '../components/layout/PageContainer/PageContainer';
import { Title } from '../components/common/Typography/Title';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <PageContainer>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <Title level={1}>Dashboard</Title>
          <p>Welcome back, {user?.fullName || 'User'}!</p>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-card">
            <Title level={3}>Quick Stats</Title>
            <div className="dashboard-stats">
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Tasks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Notifications</span>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <Title level={3}>Recent Activity</Title>
            <div className="activity-empty">
              <p>No recent activity to display.</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;