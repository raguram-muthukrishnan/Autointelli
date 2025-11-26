import React from 'react';
import './Footer.css';
// Make sure to have your logo asset in the correct path
import logo from '../assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Top section containing all the navigation links */}
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="section-title">Product</h3>
          <ul className="footer-links">
            <li><a href="/products/nms">NMS</a></li>
            <li><a href="/products/securita">Securita</a></li>
            <li><a href="/products/incident-response">OPS DUTY</a></li>
            <li><a href="/products/flow">Intelliflow</a></li>
            <li><a href="/products/alice-ai">Alice AI</a></li>
            <li><a href="/products/it-desk">IntelliDesk</a></li>
            <li><a href="/products/asset">IntelliAsset</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="section-title">Company</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="section-title">Support</h3>
          <ul className="footer-links">
            <li><a href="/kb">Help Center</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contact">Status</a></li>
            <li><a href="/admin">Admin Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="section-title">Follow Us</h3>
          <div className="footer-social-icons">
            <a href="https://www.linkedin.com/company/autointelli/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/autointelli" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/autointelli_aiops/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
            </a>
            <a href="https://x.com/autointelli?s=20" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section with logo and copyright info */}
      <div className="footer-bottom">
        <div className="footer-logo-container">
          <img src={logo} alt="Logo" className="footer-logo" />
        </div>
        <p className="copyright-text">
          © {new Date().getFullYear()} AutoIntelli. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
