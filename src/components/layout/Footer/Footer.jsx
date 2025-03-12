import React from 'react';
import { Link } from 'react-router-dom';
// import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/terms" className="footer-link">Terms</Link>
          <Link to="/privacy" className="footer-link">Privacy</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>
        
        <div className="footer-copyright">
          &copy; {currentYear} Your App Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;