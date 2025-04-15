import React from 'react';
import './Footer.css'; // Optional if you want to keep styles separate

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} Bidzy. All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <span>|</span>
        <a href="/terms">Terms</a>
        <span>|</span>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
