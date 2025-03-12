// src/pages/ProfilePage.jsx
import React from 'react';
import PageContainer from '../components/layout/PageContainer/PageContainer';
import { Title } from '../components/common/Typography/Title';
import useForm from '../hooks/useForm';
import FormField from '../components/form/FormField/FormField';
import Button from '../components/common/Button/Button';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  
  // Define validation schema
  const validationSchema = {
    fullName: {
      required: true,
      minLength: { value: 3, message: 'Name must be at least 3 characters' }
    },
    email: {
      required: true,
      email: true,
    },
    phoneNumber: {
      required: true,
      pattern: {
        value: /^\d{10}$/,
        message: 'Phone number must be 10 digits'
      }
    }
  };
  
  // Handle form submission
  const handleProfileUpdate = async (values) => {
    try {
      // In a real app, you would make an API call here
      // For now, we'll just update the user in the auth context
      updateUser(values);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  
  // Initialize form with user data
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm(
    {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    },
    validationSchema,
    handleProfileUpdate
  );
  
  return (
    <PageContainer>
      <div className="profile-page">
        <div className="profile-header">
          <Title level={1}>Your Profile</Title>
          <p>Manage your account details and preferences</p>
        </div>
        
        <div className="profile-content">
          <div className="profile-section">
            <Title level={3}>Personal Information</Title>
            
            <form onSubmit={handleSubmit} className="profile-form">
              <FormField
                name="fullName"
                label="Full Name"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fullNameError}
                touched={touched.fullName}
                required
              />
              
              <FormField
                name="email"
                label="Email Address"
                value={values.email}
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.emailError}
                touched={touched.email}
                required
              />
              
              <FormField
                name="phoneNumber"
                label="Phone Number"
                value={values.phoneNumber}
                type="tel"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phoneNumberError}
                touched={touched.phoneNumber}
                required
              />
              
              <div className="form-actions">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
          
          <div className="profile-section">
            <Title level={3}>Password</Title>
            <p>Change your password to keep your account secure.</p>
            <Button variant="outline">Change Password</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;

