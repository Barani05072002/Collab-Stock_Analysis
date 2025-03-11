// pages/SignupPage.jsx
import React from 'react';
import SignupForm from '../features/auth/components/SignupForm';
import PageContainer from '../components/layout/PageContainer/PageContainer';
import './SignupPage.css';

const SignupPage = () => {
  return (
    <PageContainer>
      <div className="signup-page">
        <div className="signup-content">
          <div className="signup-left">
            <h1>Join Our Community</h1>
            <p>Create an account to get access to all features</p>
            {/* Could add testimonials, benefits, or an image here */}
          </div>
          
          <div className="signup-right">
            <SignupForm />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SignupPage;