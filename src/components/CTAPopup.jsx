import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CTAPopup.css';

const CTAPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissCount, setDismissCount] = useState(0);
  const navigate = useNavigate();

  const INITIAL_DELAY = 8000; // 8 seconds for first popup
  const RECURRING_INTERVAL = 120000; // 120 seconds (2 minutes) between popups
  const MAX_DISMISSALS = 3; // Stop showing after 3 dismissals

  useEffect(() => {
    // Check if user has dismissed too many times
    const storedDismissCount = parseInt(sessionStorage.getItem('ctaPopupDismissCount') || '0');
    setDismissCount(storedDismissCount);

    if (storedDismissCount >= MAX_DISMISSALS) {
      return;
    }

    // Show popup after initial delay
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, INITIAL_DELAY);

    // Set up recurring popup
    const recurringTimer = setInterval(() => {
      const currentDismissCount = parseInt(sessionStorage.getItem('ctaPopupDismissCount') || '0');
      if (currentDismissCount < MAX_DISMISSALS) {
        setIsVisible(true);
      }
    }, RECURRING_INTERVAL);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringTimer);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    const newCount = dismissCount + 1;
    setDismissCount(newCount);
    sessionStorage.setItem('ctaPopupDismissCount', newCount.toString());
  }, [dismissCount]);

  const handleGetSolution = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem('ctaPopupDismissCount', MAX_DISMISSALS.toString());
    navigate('/contact');
  }, [navigate]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="cta-popup-overlay" onClick={handleClose}></div>
      <div className="cta-popup">
        <button className="cta-popup-close" onClick={handleClose} aria-label="Close popup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="cta-popup-content">
          <div className="cta-popup-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h3 className="cta-popup-title">Transform Your IT Operations</h3>
          <p className="cta-popup-description">
            Discover how Autointelli's AI-powered solutions can streamline your infrastructure management and boost efficiency.
          </p>

          <button className="cta-popup-button" onClick={handleGetSolution}>
            <span>Get a Solution</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="cta-popup-dismiss" onClick={handleClose}>
            Maybe later
          </button>
        </div>
      </div>
    </>
  );
};

export default CTAPopup;
