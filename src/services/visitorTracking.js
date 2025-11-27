import axios from 'axios';
import { cookieManager } from '../utils/cookieManager';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

// Detect browser info
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';
  
  return browser;
};

// Detect device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
};

// Detect OS
const getOS = () => {
  const ua = navigator.userAgent;
  
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS')) return 'iOS';
  
  return 'Unknown';
};

export const visitorTracking = {
  // Track visitor
  async trackVisitor(pageViews = []) {
    try {
      const { visitorId, sessionId } = cookieManager.getTrackingData();
      
      const visitorData = {
        visitorId,
        sessionId,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct',
        landingPage: window.location.pathname,
        browser: getBrowserInfo(),
        device: getDeviceType(),
        os: getOS(),
        pageViews
      };

      const response = await axios.post(
        `${STRAPI_URL}/api/visitors/track`,
        visitorData,
        { timeout: 3000 } // 3 second timeout
      );

      return response.data;
    } catch (error) {
      // Silently handle backend connection errors in development
      if (error.code !== 'ECONNREFUSED' && error.code !== 'ERR_NETWORK') {
        console.warn('Error tracking visitor:', error.message);
      }
      return null;
    }
  },

  // Get visitor data
  async getVisitor() {
    try {
      const { visitorId } = cookieManager.getTrackingData();
      
      const response = await axios.get(
        `${STRAPI_URL}/api/visitors/${visitorId}`,
        { timeout: 3000 }
      );

      return response.data;
    } catch (error) {
      console.warn('Error getting visitor - backend may be offline:', error.message);
      return null;
    }
  },

  // Track page view
  trackPageView(pagePath) {
    const pageView = {
      path: pagePath,
      timestamp: new Date().toISOString(),
      title: document.title
    };

    // Store in sessionStorage for batching
    const existingViews = JSON.parse(sessionStorage.getItem('pageViews') || '[]');
    existingViews.push(pageView);
    sessionStorage.setItem('pageViews', JSON.stringify(existingViews));

    return pageView;
  },

  // Send all page views
  async sendPageViews() {
    try {
      const pageViews = JSON.parse(sessionStorage.getItem('pageViews') || '[]');
      
      if (pageViews.length > 0) {
        await this.trackVisitor(pageViews);
        sessionStorage.removeItem('pageViews');
      }
    } catch (error) {
      console.warn('Failed to send page views - backend may be offline');
      // Keep page views in session storage for retry
    }
  }
};
