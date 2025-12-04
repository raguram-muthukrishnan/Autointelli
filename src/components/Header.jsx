import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';
import nmsIcon from '../assets/NMS.png';
import opsDutyIcon from '../assets/OPSDUTY.png';
import flowIcon from '../assets/FLOW.png';
import securitaIcon from '../assets/SECURITA.png';
import aliceIcon from '../assets/ALICE.png';
import helpDeskIcon from '../assets/HELPDESK.png';
import assetIcon from '../assets/ASSET.png';


const Header = () => {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Function to toggle the menu's open/closed state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMobileDropdown(null); // Close any open mobile dropdowns
  };

  // Function to toggle mobile dropdowns
  const toggleMobileDropdown = (dropdown) => {
    setMobileDropdown(mobileDropdown === dropdown ? null : dropdown);
  };

  // Function to handle dropdown visibility
  const handleDropdownEnter = (dropdown) => {
    // Clear any existing timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    // Add a delay before closing the dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay
    setCloseTimeout(timeout);
  };

  // Add scroll listener for all pages
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SVG component for the dropdown arrow
  const DropdownIcon = ({ color = '#555', isOpen = false }) => (
    <svg 
      className={`dropdown-icon ${isOpen ? 'open' : ''}`} 
      width="12" 
      height="12" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
    >
      <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      {/* All styles are consolidated here */}      
      <header className={`header-container ${isHomePage && isScrolled ? 'scrolled' : ''}`}>
        <a href="/" className="logo">
          <img src={logo} alt="AUTOINTELLI_LOGO" />
        </a>

        {/* --- Desktop Navigation --- */}
        <nav className="nav-links">
          <ul>
            <li><a href="/" className={location.pathname === '/' ? 'active' : ''}>Home</a></li>
            
            {/* Products Dropdown */}
            <li 
              className={`dropdown-item ${location.pathname.startsWith('/products') ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownEnter('products')}
              onMouseLeave={handleDropdownLeave}
            >
              <a href="/products" className="dropdown-text-link">Products</a>
              <span 
                className="dropdown-arrow-trigger"
                onMouseEnter={() => handleDropdownEnter('products')}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownEnter('products');
                }}
              >
                <DropdownIcon isOpen={activeDropdown === 'products'} />
              </span>
              
              {activeDropdown === 'products' && (
                <div 
                  className="mega-dropdown"
                  onMouseEnter={() => handleDropdownEnter('products')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="mega-dropdown-content">
                    {/* Left Column - Products by Category */}
                    <div className="mega-dropdown-left">
                      <div className="dropdown-section">
                        <h4 className="dropdown-category">Monitoring</h4>
                        <a href="/products/nms" className="dropdown-link">
                          <div className="link-icon">
                            <img src={nmsIcon} alt="NMS" />
                          </div>
                          <div className="link-content">
                            <span className="link-title">Autointelli NMS</span>
                            <span className="link-description">AI-driven hybrid IT observability platform</span>
                          </div>
                        </a>
                      </div>

                      <div className="dropdown-section">
                        <h4 className="dropdown-category">Automation & Incident Response</h4>
                        <a href="/products/incident-response" className="dropdown-link">
                          <div className="link-icon">
                            <img src={opsDutyIcon} alt="OpsDuty" />
                          </div>
                          <div className="link-content">
                            <span className="link-title">Autointelli OpsDuty</span>
                            <span className="link-description">Policy-based event aggregation & remediation</span>
                          </div>
                        </a>
                        <a href="/products/flow" className="dropdown-link">
                          <div className="link-icon">
                            <img src={flowIcon} alt="Flow" />
                          </div>
                          <div className="link-content">
                            <span className="link-title">IntelliFlow</span>
                            <span className="link-description">Automate IT workflows with ease</span>
                          </div>
                        </a>
                      </div>

                      <div className="dropdown-section">
                        <h4 className="dropdown-category">Security & Access</h4>
                        <a href="/products/securita" className="dropdown-link">
                          <div className="link-icon">
                            <img src={securitaIcon} alt="Securita" />
                          </div>
                          <div className="link-content">
                            <span className="link-title">Autointelli Securita</span>
                            <span className="link-description">Secure remote access & session management</span>
                          </div>
                        </a>
                      </div>

                      <div className="dropdown-section">
                        <h4 className="dropdown-category">IT Operations & Productivity</h4>
                        <a href="/products/alice-ai" className="dropdown-link">
                          <div className="link-icon">
                            <img src={aliceIcon} alt="Alice" />
                          </div>
                          <div className="link-content">
                            <span className="link-title">Alice AI</span>
                            <span className="link-description">AI-powered digital assistant</span>
                          </div>
                        </a>
                        <a href="/products/it-desk" className="dropdown-link">
                          <div className="link-icon">
                            <img src={helpDeskIcon} alt="IntelliDesk" />
                          </div>
                          <div className="link-content">
                            <span className="link-title">IntelliDesk</span>
                            <span className="link-description">Unified service desk with automation</span>
                          </div>
                        </a>
                        <a href="/products/asset" className="dropdown-link">
                          <div className="link-icon">
                            <img src={assetIcon} alt="Asset" />
                          </div>
                          <div className="link-content">
                            <span className="link-title">IntelliAsset</span>
                            <span className="link-description">IT asset & license management</span>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Right Panel - CTA Section */}
                    <div className="mega-dropdown-right">
                      <div className="dropdown-cta-card">
                        <h3>Explore All Products</h3>
                        <p>Trusted by 100+ Enterprises for 24/7 AI-Powered Monitoring</p>
                        <div className="cta-buttons">
                          <a href="/products" className="cta-primary">View All Products</a>
                          <a href="/contact" className="cta-secondary">Talk to Us</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            
            <li><a href="/partners" className={location.pathname === '/partners' ? 'active' : ''}>Partners</a></li>
            
            {/* Resources Dropdown */}
            <li 
              className={`dropdown-item ${location.pathname.startsWith('/resources') || location.pathname.startsWith('/kb') || location.pathname.startsWith('/tutorials') || location.pathname.startsWith('/blog') || location.pathname.startsWith('/webinars') ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownEnter('resources')}
              onMouseLeave={handleDropdownLeave}
            >
              <a href="/resources" className="dropdown-text-link">Resource</a>
              <span 
                className="dropdown-arrow-trigger"
                onMouseEnter={() => handleDropdownEnter('resources')}
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownEnter('resources');
                }}
              >
                <DropdownIcon isOpen={activeDropdown === 'resources'} />
              </span>
              
              {activeDropdown === 'resources' && (
                <div 
                  className="mega-dropdown"
                  onMouseEnter={() => handleDropdownEnter('resources')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="mega-dropdown-content">
                    {/* Left Column - Learning Resources */}
                    <div className="mega-dropdown-left">
                      <div className="dropdown-section">
                        <h4 className="dropdown-category">Learning Resources</h4>
                        <a href="/kb" className="dropdown-link">
                          <div className="link-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="9" stroke="#6366F1" strokeWidth="2"/>
                              <path d="M12 8v4M12 16h.01" stroke="#6366F1" strokeWidth="2"/>
                            </svg>
                          </div>
                          <div className="link-content">
                            <span className="link-title">Knowledge Base</span>
                            <span className="link-description">FAQs, troubleshooting & feature tips</span>
                          </div>
                        </a>
                        <a href="/tutorials" className="dropdown-link">
                          <div className="link-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="2"/>
                              <path d="M10 8l6 4-6 4V8z" fill="#6366F1"/>
                            </svg>
                          </div>
                          <div className="link-content">
                            <span className="link-title">Product Tutorials</span>
                            <span className="link-description">Step-by-step video walkthroughs</span>
                          </div>
                        </a>
                      </div>

                      <div className="dropdown-section">
                        <h4 className="dropdown-category">Community & Insights</h4>
                        <a href="/blog" className="dropdown-link">
                          <div className="link-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke="#8B5CF6" strokeWidth="2"/>
                            </svg>
                          </div>
                          <div className="link-content">
                            <span className="link-title">Blog / Insights</span>
                            <span className="link-description">Industry updates & AIOps trends</span>
                          </div>
                        </a>
                        <a href="/webinars" className="dropdown-link">
                          <div className="link-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <rect x="2" y="7" width="20" height="15" rx="2" stroke="#8B5CF6" strokeWidth="2"/>
                              <path d="M17 2l-5 5-5-5" stroke="#8B5CF6" strokeWidth="2"/>
                            </svg>
                          </div>
                          <div className="link-content">
                            <span className="link-title">Webinars & Events</span>
                            <span className="link-description">Live sessions with product experts</span>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Right Panel - CTA Section */}
                    <div className="mega-dropdown-right">
                      <div className="dropdown-cta-card">
                        <h3>Resource Center</h3>
                        <p>Access documentation, tutorials, and expert insights to maximize your Autointelli experience</p>
                        <div className="cta-buttons">
                          <a href="/resources" className="cta-primary">Visit Resource Center</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            
            <li><a href="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</a></li>
          </ul>
        </nav>

        {/* Desktop Call to Action Buttons */}
        <div className="cta-buttons-container">
          <a href="/#newsletter">
            <button className="cta-button cta-subscribe">
              Join Our Community
            </button>
          </a>
          <a href="/products">
            <button className="cta-button">
              Explore Platform
            </button>
          </a>
        </div>

        {/* --- Mobile Menu Icon --- */}
        <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
          {!isMenuOpen ? (
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="26.4314" y1="1.02575" x2="1" y2="1.02575" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
              <line x1="26.4314" y1="11.0444" x2="1" y2="11.0444" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
              <line x1="26.4314" y1="20.9742" x2="1" y2="20.9742" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="2" x2="26" y2="26" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
              <line x1="26" y1="2" x2="2" y2="26" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </header>

      {/* --- Mobile Navigation Menu (Overlay) --- */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/" onClick={toggleMenu}>Home</a></li>
          
          {/* Products Dropdown */}
          <li className="mobile-dropdown-item">
            <div className="mobile-dropdown-header">
              <a href="/products" onClick={toggleMenu}>Products</a>
              <span 
                className="mobile-dropdown-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMobileDropdown('products');
                }}
              >
                <DropdownIcon color="white" />
              </span>
            </div>
            {mobileDropdown === 'products' && (
              <div className="mobile-dropdown-content">
                <a href="/products/nms" onClick={toggleMenu}>Autointelli NMS</a>
                <a href="/products/incident-response" onClick={toggleMenu}>Autointelli OpsDuty</a>
                <a href="/products/flow" onClick={toggleMenu}>IntelliFlow</a>
                <a href="/products/securita" onClick={toggleMenu}>Autointelli Securita</a>
                <a href="/products/alice-ai" onClick={toggleMenu}>Alice AI</a>
                <a href="/products/it-desk" onClick={toggleMenu}>IntelliDesk</a>
                <a href="/products/asset" onClick={toggleMenu}>IntelliAsset</a>
              </div>
            )}
          </li>
          
          <li><a href="/partners" onClick={toggleMenu}>Partners</a></li>
          
          {/* Resources Dropdown */}
          <li className="mobile-dropdown-item">
            <div className="mobile-dropdown-header">
              <a href="/resources" onClick={toggleMenu}>Resource</a>
              <span 
                className="mobile-dropdown-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMobileDropdown('resources');
                }}
              >
                <DropdownIcon color="white" />
              </span>
            </div>
            {mobileDropdown === 'resources' && (
              <div className="mobile-dropdown-content">
                <a href="/kb" onClick={toggleMenu}>Knowledge Base</a>
                <a href="/tutorials" onClick={toggleMenu}>Product Tutorials</a>
                <a href="/blog" onClick={toggleMenu}>Blog / Insights</a>
                <a href="/webinars" onClick={toggleMenu}>Webinars & Events</a>
              </div>
            )}
          </li>
          
          <li><a href="/contact" onClick={toggleMenu}>Contact</a></li>
          <li>
            <a href="/#newsletter" onClick={toggleMenu}>
              <button className="cta-button cta-subscribe">Join Our Community</button>
            </a>
          </li>
          <li>
            <a href="/products" onClick={toggleMenu}>
              <button className="cta-button">Explore Platform</button>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;

