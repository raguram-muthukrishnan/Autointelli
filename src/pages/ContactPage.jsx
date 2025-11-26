import React, { useState } from 'react';
import './ContactPage.css';
import NewsletterForm from '../components/NewsletterForm';
import { submitCTAInquiry } from '../api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.industry) formErrors.industry = "Please select an industry";
    if (!formData.message.trim()) formErrors.message = "Message is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        // Submit to CTA Inquiry API
        await submitCTAInquiry({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service_requested: formData.industry,
          message: formData.message,
          source_page: 'Contact Page',
          calendly_requested: true
        });
        
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', industry: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error('Error submitting contact form:', error);
        setSubmitError(error.message || 'Failed to submit. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="contact-page-container">
      <div className="contact-content-wrapper">
        {/* Left Side - Contact Information */}
        <div className="contact-info-section">
          <p className="contact-subtitle">WE'RE HERE TO HELP YOU</p>
          <h1 className="contact-title">
            Discuss Your IT Solution Needs
          </h1>
          <p className="contact-description">
            Are you looking for top-quality IT solutions tailored to your needs? Reach out to us.
          </p>

          {/* Calendly Quick Action */}
          <div className="schedule-meeting-card">
            <h3>
              📅 Prefer to Schedule a Meeting?
            </h3>
            <p>
              Book a time that works for you
            </p>
            <a 
              href="https://calendly.com/autointelli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="schedule-meeting-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Schedule a Meeting
            </a>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon email-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="contact-text">
                <p className="contact-label">E-mail</p>
                <a href="mailto:contact@autointelli.com" className="contact-value">sales@autointelli.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon phone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="contact-text">
                <p className="contact-label">Phone number</p>
                <a href="tel:+1234567890" className="contact-value">+91 44 2254 1017</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon location-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="contact-text">
                <p className="contact-label">Office Address</p>
                <p className="contact-value">484, Anna Salai, near US Consulate General Office, Thousand Lights West, Teynampet, Chennai 600006</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company (Optional)</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Your Company Name"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={errors.industry ? 'input-error' : ''}
              >
                <option value="">Select</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance & Banking</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="government">Government</option>
                <option value="telecommunications">Telecommunications</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <span className="error-message">{errors.industry}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'input-error' : ''}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16l4-4-4-4M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {isSubmitting ? 'Sending...' : 'Get a Solution'}
            </button>

            {submitSuccess && (
              <div className="success-message">
                ✅ Thank you for your message! We'll get back to you shortly. Check your email for a meeting scheduling link.
              </div>
            )}

            {submitError && (
              <div className="error-message" style={{ marginTop: '15px', padding: '12px', background: '#fee', border: '1px solid #fcc', borderRadius: '8px', color: '#c00' }}>
                ❌ {submitError}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="map-section">
        <h2 className="map-title">Visit Our Office</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0531375!2d80.2514293!3d13.0531375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525de88e6fa607%3A0x45b84ee87ff71190!2sAutointelli%20Systems%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Autointelli Systems Office Location"
          ></iframe>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="newsletter-section" style={{ padding: '60px 20px', background: '#f7fafc', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="newsletter-icon" style={{ marginBottom: '20px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto', display: 'block' }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Stay Connected</h2>
          <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '30px', lineHeight: '1.6' }}>Get the latest updates and insights delivered to your inbox</p>
          <NewsletterForm 
            categories={['all']}
          />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
