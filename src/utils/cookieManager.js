import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const VISITOR_ID_KEY = 'autointelli_visitor_id';
const SESSION_ID_KEY = 'autointelli_session_id';
const COOKIE_EXPIRY_DAYS = 365; // 1 year for visitor ID
const SESSION_EXPIRY_HOURS = 24; // 24 hours for session

export const cookieManager = {
  // Get or create visitor ID
  getVisitorId() {
    let visitorId = Cookies.get(VISITOR_ID_KEY);
    
    if (!visitorId) {
      visitorId = uuidv4();
      const cookieOptions = { 
        expires: COOKIE_EXPIRY_DAYS,
        sameSite: 'Lax',
        path: '/'
      };
      
      // Only set secure flag on HTTPS
      if (window.location.protocol === 'https:') {
        cookieOptions.secure = true;
      }
      
      Cookies.set(VISITOR_ID_KEY, visitorId, cookieOptions);
      console.log('Visitor ID cookie set:', visitorId);
    }
    
    return visitorId;
  },

  // Get or create session ID
  getSessionId() {
    let sessionId = Cookies.get(SESSION_ID_KEY);
    
    if (!sessionId) {
      sessionId = uuidv4();
      const cookieOptions = { 
        expires: SESSION_EXPIRY_HOURS / 24,
        sameSite: 'Lax',
        path: '/'
      };
      
      // Only set secure flag on HTTPS
      if (window.location.protocol === 'https:') {
        cookieOptions.secure = true;
      }
      
      Cookies.set(SESSION_ID_KEY, sessionId, cookieOptions);
      console.log('Session ID cookie set:', sessionId);
    }
    
    return sessionId;
  },

  // Clear all cookies
  clearAll() {
    Cookies.remove(VISITOR_ID_KEY);
    Cookies.remove(SESSION_ID_KEY);
  },

  // Get all tracking data
  getTrackingData() {
    return {
      visitorId: this.getVisitorId(),
      sessionId: this.getSessionId()
    };
  }
};
