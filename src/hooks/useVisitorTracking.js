import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { visitorTracking } from '../services/visitorTracking';

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track initial visit with error handling
    const trackInitialVisit = async () => {
      try {
        await visitorTracking.trackVisitor();
      } catch (error) {
        console.warn('Visitor tracking failed - likely backend not running:', error);
      }
    };

    trackInitialVisit();

    // Send page views before unload
    const handleBeforeUnload = () => {
      try {
        visitorTracking.sendPageViews();
      } catch (error) {
        console.warn('Failed to send page views:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Track page view on route change
    try {
      visitorTracking.trackPageView(location.pathname);
    } catch (error) {
      console.warn('Failed to track page view:', error);
    }
  }, [location]);

  return null;
};
