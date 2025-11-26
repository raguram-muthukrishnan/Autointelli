import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const customerSegments = [
    'Fintech',
    'Retail',
    'Healthcare',
    'Energy & Utilities',
    'Government',
    'IT & Telecom'
  ];

  const stats = [
    { value: '95%', label: 'Customer Satisfaction' },
    { value: '10+', label: 'Years of Excellence' },
    { value: '$10m', label: 'Cost Savings Delivered' },
    { value: '50m', label: 'Incidents Resolved' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">Expert guidance, tailored solution</h1>
          <p className="about-hero-subtitle">
            Leading the way in Incident Response and Service Orchestration
          </p>
          <div className="about-hero-buttons">
            <a href="/contact" className="about-btn-primary">Get Started</a>
            <a href="/partners" className="about-btn-secondary">Partner With Us</a>
          </div>
        </div>
      </section>

      {/* Hero Cards Section */}
      <section className="about-hero-cards">
        <div className="about-hero-grid">
          <div className="about-hero-card">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" alt="Team member" className="about-hero-image" />
          </div>
          <div className="about-hero-card about-stat-card">
            <div className="about-stat-large">
              <span className="stat-value">95%</span>
              <span className="stat-label">Customer Satisfaction Rate</span>
            </div>
          </div>
          <div className="about-hero-card about-stat-card-dark">
            <div className="about-stat-small">
              <span className="stat-value">10+</span>
              <span className="stat-label">Years of excellence in IT operations automation</span>
            </div>
          </div>
          <div className="about-hero-card">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" alt="Team member" className="about-hero-image" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="about-section-header">
          <span className="about-section-tag">excellence</span>
          <h2 className="about-section-title">
            Discover our commitment to excellence With over a decade of experience, we deliver tailored solutions
          </h2>
        </div>
        <div className="about-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="about-stat-item">
              <span className="about-stat-value">{stat.value}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-content-section">
        <div className="about-content-grid">
          <div className="about-content-card">
            <div className="about-content-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="about-content-title">Our Story</h3>
            <p className="about-content-text">
              The World's Best Incident Response and Service Orchestration platform for digital operations management. 
              Autointelli is simple and intelligent to help teams resolve incidents faster and handle complex issues better. 
              Autointelli creates and controls Virtual Automation Engineers that perform end-to-end operational processes 
              across all IT stacks, servers, mainframes, storage, networks, virtualized environments, help desks, 
              end-user computing, and applications operations.
            </p>
          </div>

          <div className="about-content-card about-highlight-card">
            <div className="about-highlight-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="about-highlight-title">Our Vision</h3>
            <p className="about-highlight-text">
              To transform traditional workloads and enable innovation in IT Operations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Why Autointelli Section */}
      <section className="about-content-section about-alt-bg">
        <div className="about-content-grid">
          <div className="about-content-card">
            <div className="about-content-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="about-content-title">Our Mission</h3>
            <p className="about-content-text">
              Eliminate Mundane tasks through automation and free human talent to focus on creating value through innovation.
            </p>
          </div>

          <div className="about-content-card">
            <div className="about-content-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="about-content-title">Why Autointelli</h3>
            <p className="about-content-text">
              As enterprises modernize and move to the cloud, IT Ops, NOC, SOC, DevOps and SRE teams struggle with 
              manual and reactive incident response capabilities that are badly suited for the scale, complexity and 
              velocity of modern IT environments. This results in painful outages, unhappy customers, growing IT headcount 
              and the inability to focus on innovation.
            </p>
            <p className="about-content-text">
              Autointelli provides Incident response and Service Orchestration Automation that helps operations teams 
              detect, respond and resolve IT incidents faster and more easily than ever before.
            </p>
            <p className="about-content-text">
              Autointelli helps organizations transform the manual tasks into automated actions. Enterprises rely on 
              Autointelli to reduce IT operating costs, improve service availability and increase business velocity 
              without adding risk.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Segments Section */}
      <section className="about-segments-section">
        <div className="about-section-header">
          <h2 className="about-section-title">Who We Serve</h2>
          <p className="about-section-description">
            Anybody who is looking to Automate their IT infrastructure and Datacenters. Our customer segments are:
          </p>
        </div>
        <div className="about-segments-grid">
          {customerSegments.map((segment, index) => (
            <div key={index} className="about-segment-card">
              <div className="segment-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="segment-title">{segment}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="about-partners-section">
        <div className="about-section-header">
          <span className="about-section-tag">collaboration</span>
          <h2 className="about-section-title">Our Valuable Partners</h2>
          <p className="about-section-description">
            Partnering with leading enterprises, we ingrained our product in the global market and consistently 
            improvise to deliver comprehensive AIOps solutions for modern enterprises.
          </p>
        </div>
        <div className="about-partners-cta">
          <a href="/partners" className="about-partners-button">
            Become a Partner
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-content">
          <h2 className="about-cta-title">Ready to Transform Your IT Operations?</h2>
          <p className="about-cta-description">
            Join thousands of enterprises who trust Autointelli for their incident response and service orchestration needs.
          </p>
          <div className="about-cta-buttons">
            <a href="/contact" className="about-cta-btn-primary">Contact Us</a>
            <a href="/products" className="about-cta-btn-secondary">Explore Products</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
