import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer/PageContainer';
import Button from '../components/common/Button/Button';
import { Title } from '../components/common/Typography/Title';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <PageContainer>
      <div className="not-found-page">
        <div className="not-found-content">
          <Title level={1}>404</Title>
          <Title level={2}>Page Not Found</Title>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          
          <div className="not-found-actions">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
            >
              Go Home
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default NotFoundPage;