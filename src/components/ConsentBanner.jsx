import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './ConsentBanner.css';

const CONSENT_COOKIE = 'autointelli_cookie_consent';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(CONSENT_COOKIE);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    const cookieOptions = { 
      expires: 365,
      sameSite: 'Lax',
      path: '/'
    };
    
    if (window.location.protocol === 'https:') {
      cookieOptions.secure = true;
    }
    
    Cookies.set(CONSENT_COOKIE, 'accepted', cookieOptions);
    setShowBanner(false);
  };

  const handleDecline = () => {
    const cookieOptions = { 
      expires: 365,
      sameSite: 'Lax',
      path: '/'
    };
    
    if (window.location.protocol === 'https:') {
      cookieOptions.secure = true;
    }
    
    Cookies.set(CONSENT_COOKIE, 'declined', cookieOptions);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h3>🍪 We use cookies</h3>
          <p>
            We use cookies to enhance your browsing experience, analyze site traffic, 
            and understand where our visitors are coming from. By clicking "Accept", 
            you consent to our use of cookies.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button onClick={handleAccept} className="cookie-btn cookie-btn-accept">
            Accept All
          </button>
          <button onClick={handleDecline} className="cookie-btn cookie-btn-decline">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
