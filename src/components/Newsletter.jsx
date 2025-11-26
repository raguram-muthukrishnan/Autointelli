import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Newsletter subscription:", formData);
        setSubmitSuccess(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay Updated with Autointelli</h2>
          <p className="newsletter-subtitle">Subscribe to our newsletter for the latest updates, insights, and industry trends.</p>
          
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <div className="newsletter-form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'input-error' : ''}
                noValidate
              />
              {errors.name && <span className="error-message">{String(errors.name).trim()}</span>}
            </div>

            <div className="newsletter-form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'input-error' : ''}
                noValidate
              />
              {errors.email && <span className="error-message">{String(errors.email).trim()}</span>}
            </div>

            <button type="submit" className="newsletter-submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>

            {submitSuccess && (
              <div className="success-message">
                Thank you for subscribing! Check your email for confirmation.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
