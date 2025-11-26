import React from 'react';
import { Link } from 'react-router-dom';
import './ResourceCard.css';

const WebinarCard = ({ webinar }) => {
  const {
    id,
    documentId,
    title,
    slug,
    type, // 'webinar' or 'event'
    date,
    start_time,
    short_description,
    imageUrl, // Pre-calculated in parent
    image, // Fallback if not pre-calculated
    is_live,
    is_online,
    location,
    speakers,
    price,
    tags
  } = webinar || {};

  // Fallback for missing data - use slug, then documentId, then id
  const displayTitle = title || 'Untitled Webinar';
  const displaySlug = slug || documentId || id;
  
  console.log('WebinarCard:', { id, documentId, slug, displaySlug, type, title });
  
  // Use pre-calculated imageUrl or try to extract from image object
  // Use data URI for placeholder to avoid external requests
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect fill="%23f0f0f0" width="400" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EWebinar%3C/text%3E%3C/svg%3E';
  
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
  const displayImage = imageUrl || (image?.data?.attributes?.url 
    ? `${STRAPI_URL}${image.data.attributes.url}` 
    : (image?.url ? `${STRAPI_URL}${image.url}` : placeholderImage));
  
  // Format date and time
  const dateObj = date ? new Date(date) : null;
  const dateStr = dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBA';
  const timeStr = start_time ? start_time.slice(0, 5) : ''; // HH:mm format
  
  const isFree = !price || parseFloat(price) === 0;
  
  // Parse speakers - handle both string and array
  const speakersList = typeof speakers === 'string' 
    ? speakers.split(',').map(s => s.trim()).filter(Boolean)
    : (Array.isArray(speakers) ? speakers.map(s => typeof s === 'string' ? s : s.name) : []);
  
  // Parse tags - handle both string and array
  const tagsList = typeof tags === 'string'
    ? tags.split(',').map(t => t.trim()).filter(Boolean)
    : (Array.isArray(tags) ? tags : []);
  
  // Determine badge text
  const badgeText = type === 'event' ? 'EVENT' : 'WEBINAR';
  
  // Determine link path
  const linkPath = type === 'event' ? `/events/${displaySlug}` : `/webinars/${displaySlug}`;

  return (
    <div className="resource-card">
      <div className="resource-image">
        <img src={displayImage} alt={`${displayTitle} thumbnail`} />
        <span className="resource-type-badge">{badgeText}</span>
        {is_live && <span className="live-badge">LIVE</span>}
      </div>
      <div className="resource-content">
        <div className="resource-meta-top">
          {type === 'event' && (
            <span className="location-badge">
              {is_online ? '🌐 Online' : `📍 ${location || 'In-Person'}`}
            </span>
          )}
        </div>
        <h3 className="resource-title" title={displayTitle}>{displayTitle}</h3>
        <div className="resource-datetime">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {dateStr}
          {timeStr && (
            <>
              <span style={{ margin: '0 6px' }}>•</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {timeStr}
            </>
          )}
        </div>
        <p className="resource-description">{short_description || 'No description available.'}</p>
        
        <div className="resource-footer">
          {speakersList.length > 0 && (
            <div className="speakers-list">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>{speakersList.slice(0, 2).join(', ')}{speakersList.length > 2 ? ` +${speakersList.length - 2}` : ''}</span>
            </div>
          )}
          <div className="resource-badges">
            <span className={`badge ${isFree ? 'free' : 'paid'}`}>{isFree ? 'Free' : 'Paid'}</span>
          </div>
        </div>
        
        <Link to={linkPath} className="resource-cta">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default WebinarCard;
