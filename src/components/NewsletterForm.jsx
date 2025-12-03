import React, { useState } from 'react';
import { subscribeNewsletter } from '../api';
import './NewsletterForm.css';

const NewsletterForm = ({ categories = ['all'], title, subtitle, inline = false, horizontal = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Basic validation
    if (!formData.name || !formData.email) {
      setStatus('error');
      setMessage('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      await subscribeNewsletter(formData.name, formData.email, categories);
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setFormData({ name: '', email: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', error);
    }
  };

  if (inline) {
    return (
      <form className="newsletter-form-inline" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'loading'}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {message && (
          <div className={`newsletter-message ${status}`}>
            {message}
          </div>
        )}
      </form>
    );
  }

  if (horizontal) {
    return (
      <div className="newsletter-form-horizontal">
        <div className="newsletter-horizontal-content">
          {title && <h3 className="newsletter-horizontal-title">{title}</h3>}
          {subtitle && <p className="newsletter-horizontal-subtitle">{subtitle}</p>}
        </div>
        <form className="newsletter-horizontal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your business email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="newsletter-horizontal-input"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="newsletter-horizontal-input"
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="newsletter-horizontal-button"
          >
            {status === 'loading' ? 'Subscribing...' : 'Keep Yourself Updated'}
          </button>
          {message && (
            <div className={`newsletter-horizontal-message ${status}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="newsletter-form-container">
      {title && <h3 className="newsletter-title">{title}</h3>}
      {subtitle && <p className="newsletter-subtitle">{subtitle}</p>}
      
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="newsletter-input"
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="newsletter-input"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="newsletter-button"
        >
          {status === 'loading' ? (
            <>
              <span className="spinner-small"></span>
              Joining...
            </>
          ) : (
            <>
              Join Our Community
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </>
          )}
        </button>

        {message && (
          <div className={`newsletter-message ${status}`}>
            {status === 'success' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
            {status === 'error' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            )}
            <span>{message}</span>
          </div>
        )}
      </form>

      <p className="newsletter-privacy">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterForm;
