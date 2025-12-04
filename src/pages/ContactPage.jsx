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
            src="https://calendly.com/autointelli"
            width="100%"
            height="700"
            frameBorder="0"
            title="Schedule a Meeting"
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
            <div className="contact-icon whatsapp-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="contact-text">
              <p className="contact-label">WhatsApp</p>
              <a href="https://wa.me/914422541017" target="_blank" rel="noopener noreferrer" className="contact-value">+91 44 2254 1017</a>
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
