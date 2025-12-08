import React, { useState, useEffect, useRef } from 'react';
import './ContactPage.css';
import NewsletterForm from '../components/NewsletterForm';
import { submitCTAInquiry } from '../api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const iframeRef = useRef(null);

  // Handle iframe scroll behavior
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleMouseEnter = () => {
      // Disable page scroll when hovering over iframe
      document.body.style.overflow = 'hidden';
    };

    const handleMouseLeave = () => {
      // Re-enable page scroll when leaving iframe
      document.body.style.overflow = '';
    };

    iframe.addEventListener('mouseenter', handleMouseEnter);
    iframe.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      iframe.removeEventListener('mouseenter', handleMouseEnter);
      iframe.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.overflow = ''; // Cleanup
    };
  }, []);

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
          service_requested: null,
          message: formData.message,
          source_page: 'Contact Page',
          calendly_requested: true
        });
        
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        
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
      {/* Page Header */}
      <div className="contact-page-header">
        <p className="contact-subtitle">WE'RE HERE TO HELP YOU</p>
        <h1 className="contact-title">
          Discuss Your IT Infrastructure and Automation Needs
        </h1>
        <p className="contact-description">
          Schedule a meeting or send us a message - we're ready to help transform your IT operations
        </p>
      </div>

      <div className="contact-content-wrapper">
        {/* Left Side - Calendly Iframe */}
        <div className="contact-calendly-section">
          <iframe
            ref={iframeRef}
            src="https://calendly.com/autointellimarketing/30min"
            width="100%"
            height="700"
            frameBorder="0"
            title="Schedule a Meeting"
            scrolling="yes"
          ></iframe>
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
                placeholder="Name"
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
                placeholder="john@business.com"
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
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Briefly state your IT Infrastructure needs"
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

      {/* Contact Information Section */}
      <div className="contact-info-bottom">
        {/* First Row - Email and WhatsApp */}
        <div className="contact-details contact-row-1">
          <div className="contact-item">
            <div className="contact-icon email-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="contact-text">
              <p className="contact-label">E-mail</p>
              <a href="mailto:sales@autointelli.com" className="contact-value">sales@autointelli.com</a>
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
              <p className="contact-label">Corporate Office and Tech Center</p>
              <p className="contact-value">581 Naveen towers, 3rd Floor, Anna Salai, Chennai 600002, Tamilnadu, India</p>
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
              <p className="contact-label">US Office</p>
              <p className="contact-value">2661, Meadow Hall Dr Herdon, VA20171, USA.</p>
            </div>
          </div>
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
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Get monthly shortcuts to enhance your AI Ops productivity — No Fluffs.</h2>
          <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '30px', lineHeight: '1.6' }}>Autointelli Community only insights not published anywhere else.</p>
          <NewsletterForm 
            categories={['all']}
          />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

// Note: Contact page needs manual update to restructure contact-info-bottom section
// Move location item to second row and add US Office
