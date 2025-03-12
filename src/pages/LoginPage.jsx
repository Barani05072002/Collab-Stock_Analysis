import React from 'react';
import LoginForm from '../features/auth/components/LoginForm';
import PageContainer from '../components/layout/PageContainer/PageContainer';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <PageContainer>
      <div className="login-page">
        <div className="login-content">
          <div className="login-left">
            <h1>Welcome Back</h1>
            <p>Sign in to access your account</p>
            {/* Could add testimonials or an image here */}
          </div>
          
          <div className="login-right">
            <LoginForm />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default LoginPage;