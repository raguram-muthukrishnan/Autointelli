import React, { useState } from 'react';
import './ResourceDownloadModal.css';

const ResourceDownloadModal = ({ isOpen, onClose, resourceName, resourceUrl, onDownload }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the onDownload callback with email and name
      await onDownload(email, name);
      
      // Close modal
      onClose();
      
      // Reset form
      setEmail('');
      setName('');
    } catch (err) {
      setError('Failed to process download. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="resource-modal-overlay" onClick={onClose}>
      <div className="resource-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="resource-modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="resource-modal-header">
          <div className="resource-modal-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <h2>Download Resource</h2>
          <p className="resource-modal-resource-name">{resourceName}</p>
        </div>

        <div className="resource-modal-body">
          <p className="resource-modal-description">
            Enter your email to download this resource. We'll also send you updates about similar content.
          </p>

          <form onSubmit={handleSubmit} className="resource-modal-form">
            <div className="resource-form-group">
              <label htmlFor="download-name">Name (Optional)</label>
              <input
                type="text"
                id="download-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="resource-form-group">
              <label htmlFor="download-email">Email Address *</label>
              <input
                type="email"
                id="download-email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                disabled={isSubmitting}
                required
              />
              {error && <span className="resource-form-error">{error}</span>}
            </div>

            <button 
              type="submit" 
              className="resource-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-small"></span>
                  Processing...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Now
                </>
              )}
            </button>

            <p className="resource-modal-privacy">
              By downloading, you agree to receive occasional emails from us. 
              You can unsubscribe at any time. View our <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourceDownloadModal;
