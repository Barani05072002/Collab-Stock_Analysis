// src/components/layout/Header/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
// import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">Your App Name</Link>
        </div>
        
        <nav className="header-nav">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Button
                variant="outline"
                size="small"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Button
                variant="primary"
                size="small"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

