import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { unsubscribeNewsletter } from '../api';
import './UnsubscribePage.css';

const UnsubscribePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleUnsubscribe = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid unsubscribe link');
        return;
      }

      try {
        await unsubscribeNewsletter(token);
        setStatus('success');
        setMessage('You have been successfully unsubscribed from our newsletter.');
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Failed to unsubscribe. Please try again or contact support.');
        console.error('Unsubscribe error:', error);
      }
    };

    handleUnsubscribe();
  }, [token]);

  return (
    <div className="unsubscribe-page">
      <div className="unsubscribe-container">
        {status === 'loading' && (
          <>
            <div className="spinner-large"></div>
            <h2>Processing your request...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="success-icon">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <h2>Unsubscribed Successfully</h2>
            <p>{message}</p>
            <p className="unsubscribe-note">
              We're sorry to see you go! If you change your mind, you can always subscribe again from our website.
            </p>
            <button onClick={() => navigate('/')} className="home-button">
              Return to Home
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="error-icon">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <h2>Unsubscribe Failed</h2>
            <p>{message}</p>
            <button onClick={() => navigate('/')} className="home-button">
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UnsubscribePage;
