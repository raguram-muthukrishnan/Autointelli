import React, { useState } from 'react';
import { submitJobApplication, uploadResume } from '../api';
import './JobApplicationModal.css';

const JobApplicationModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    portfolio_url: '',
    years_of_experience: '',
    current_company: '',
    cover_letter: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, submitting, success, error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setMessage('Please upload a PDF or Word document');
        setStatus('error');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB');
        setStatus('error');
        return;
      }
      setResumeFile(file);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    // Validation
    if (!formData.full_name || !formData.email || !formData.phone) {
      setStatus('error');
      setMessage('Please fill in all required fields');
      return;
    }

    if (!resumeFile) {
      setStatus('error');
      setMessage('Please upload your resume');
      return;
    }

    try {
      // Upload resume first
      setStatus('uploading');
      const uploadedFiles = await uploadResume(resumeFile);
      const resumeId = uploadedFiles[0]?.id;

      if (!resumeId) {
        throw new Error('Failed to upload resume');
      }

      // Submit application
      setStatus('submitting');
      await submitJobApplication({
        ...formData,
        job_title: job.title,
        job_id: job.id.toString(),
        resume: resumeId,
        years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : null,
      });

      setStatus('success');
      setMessage('Application submitted successfully! Check your email for confirmation.');
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to submit application. Please try again.');
      console.error('Application submission error:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Apply for {job.title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="job-summary">
            <p><strong>Department:</strong> {job.department}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.employment_type}</p>
          </div>

          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="full_name">Full Name *</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  disabled={status === 'uploading' || status === 'submitting'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'uploading' || status === 'submitting'}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={status === 'uploading' || status === 'submitting'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="years_of_experience">Years of Experience</label>
                <input
                  type="number"
                  id="years_of_experience"
                  name="years_of_experience"
                  value={formData.years_of_experience}
                  onChange={handleChange}
                  min="0"
                  disabled={status === 'uploading' || status === 'submitting'}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="current_company">Current Company</label>
                <input
                  type="text"
                  id="current_company"
                  name="current_company"
                  value={formData.current_company}
                  onChange={handleChange}
                  disabled={status === 'uploading' || status === 'submitting'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedin_url">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedin_url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  disabled={status === 'uploading' || status === 'submitting'}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="portfolio_url">Portfolio/Website</label>
              <input
                type="url"
                id="portfolio_url"
                name="portfolio_url"
                value={formData.portfolio_url}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                disabled={status === 'uploading' || status === 'submitting'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume/CV * (PDF or Word, max 5MB)</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={status === 'uploading' || status === 'submitting'}
                />
                {resumeFile && (
                  <p className="file-name">Selected: {resumeFile.name}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cover_letter">Cover Letter</label>
              <textarea
                id="cover_letter"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us why you're a great fit for this role..."
                disabled={status === 'uploading' || status === 'submitting'}
              />
            </div>

            {message && (
              <div className={`form-message ${status}`}>
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

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={status === 'uploading' || status === 'submitting'}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'uploading' || status === 'submitting' || status === 'success'}
              >
                {status === 'uploading' && 'Uploading Resume...'}
                {status === 'submitting' && 'Submitting Application...'}
                {status === 'success' && 'Application Submitted!'}
                {(status === 'idle' || status === 'error') && 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
