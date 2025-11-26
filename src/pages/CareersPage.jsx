import React, { useState, useEffect } from 'react';
import './CareersPage.css';
import { Link } from 'react-router-dom';
import NewsletterForm from '../components/NewsletterForm';
import JobApplicationModal from '../components/JobApplicationModal';
import { fetchJobs } from '../api';

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs();
        const data = response.data || [];
        const transformedData = data.map(item => {
          const attrs = item.attributes || item;
          return {
            id: item.id,
            documentId: item.documentId,
            slug: attrs.slug || item.id,
            ...attrs
          };
        });
        setJobs(transformedData);
      } catch (err) {
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const departments = [
    'All',
    'Engineering',
    'Product',
    'Sales',
    'Marketing',
    'Customer Success',
    'People & Operations',
    'Finance',
    'Design'
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="careers-page-container">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <h1>Build the Future of AIOps</h1>
          <p>Join a team of innovators, problem solvers, and thinkers who are redefining IT operations.</p>
          <div className="job-search-bar">
            <input 
              type="text" 
              placeholder="Search for roles (e.g. Engineer, Sales)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">Search Jobs</button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="careers-values">
        <div className="section-header">
          <h2>Why Autointelli?</h2>
          <p>We're building something special, and we want you to be a part of it.</p>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🚀</div>
            <h3>Innovation First</h3>
            <p>We push boundaries and challenge the status quo. Your ideas matter here.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Collaborative Culture</h3>
            <p>We win together. We support each other and celebrate shared success.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌍</div>
            <h3>Global Impact</h3>
            <p>Our software powers critical infrastructure for enterprises around the world.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚖️</div>
            <h3>Work-Life Balance</h3>
            <p>We believe in working smart and taking time to recharge.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="careers-benefits">
        <div className="benefits-container">
          <div className="benefits-text">
            <h2>Perks & Benefits</h2>
            <p>We take care of our team so they can take care of our customers.</p>
            <ul className="benefits-list">
              <li>Competitive Salary & Equity</li>
              <li>Comprehensive Health Insurance</li>
              <li>Unlimited PTO & Holidays</li>
              <li>Remote-First Options</li>
              <li>Learning & Development Budget</li>
              <li>Home Office Stipend</li>
            </ul>
          </div>
          <div className="benefits-image">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team working together" />
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="careers-jobs" id="open-roles">
        <div className="section-header">
          <h2>Open Positions</h2>
          <p>Find your next challenge.</p>
        </div>

        <div className="jobs-filter-tabs">
          {departments.map(dept => (
            <button 
              key={dept} 
              className={`dept-tab ${selectedDepartment === dept ? 'active' : ''}`}
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="jobs-list">
          {loading ? (
            <div className="loading-jobs">
              <div className="spinner"></div>
              <p>Loading open positions...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span className="job-dept">{job.department}</span>
                    <span className="job-loc">{job.location}</span>
                    <span className="job-type">{job.employment_type}</span>
                    {job.is_remote && <span className="job-remote">🌐 Remote</span>}
                  </div>
                  {job.short_description && (
                    <p className="job-short-desc">{job.short_description}</p>
                  )}
                </div>
                <button 
                  className="apply-btn"
                  onClick={() => {
                    setSelectedJob(job);
                    setShowApplicationForm(true);
                  }}
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <div className="no-jobs">
              <p>No positions found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta">
        <h2>Don't see the right role?</h2>
        <p>We're always looking for talent. Send us your resume and we'll keep you in mind.</p>
        <Link to="/contact" className="cta-button-outline">Contact Us</Link>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section" style={{ padding: '60px 20px', background: '#f7fafc', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="newsletter-icon" style={{ marginBottom: '20px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto', display: 'block' }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Get Career Updates</h2>
          <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '30px', lineHeight: '1.6' }}>Be the first to know about new job openings and career opportunities at Autointelli</p>
          <NewsletterForm 
            categories={['careers', 'all']}
          />
        </div>
      </section>

      {/* Job Application Modal */}
      {showApplicationForm && selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};

export default CareersPage;
