import React from 'react';
import { Link } from 'react-router-dom';
import './ResourceCard.css';

const EventCard = ({ event }) => {
  const {
    id,
    title,
    slug,
    start_time,
    short_description,
    imageUrl, // Pre-calculated in parent
    image, // Fallback
    is_online,
    location,
    price,
    tags
  } = event || {};

  const displayTitle = title || 'Untitled Event';
  const displaySlug = slug || id;
  
  // Use pre-calculated imageUrl or try to extract from image object
  // Use data URI for placeholder to avoid external requests
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect fill="%23f0f0f0" width="400" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EEvent%3C/text%3E%3C/svg%3E';
  
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
  const displayImage = imageUrl || (image?.data?.attributes?.url 
    ? `${STRAPI_URL}${image.data.attributes.url}` 
    : (image?.url ? `${STRAPI_URL}${image.url}` : placeholderImage));
  
  const dateObj = start_time ? new Date(start_time) : null;
  const dateStr = dateObj ? dateObj.toLocaleDateString() : 'Date TBA';
  const timeStr = dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  
  const isFree = !price || parseFloat(price) === 0;
  const parsedTags = Array.isArray(tags) ? tags : [];

  return (
    <div className="resource-card">
      <div className="resource-image">
        <img src={displayImage} alt={`${displayTitle} thumbnail`} />
        <span className="resource-type-badge">EVENT</span>
        {!is_online && <span className="live-badge" style={{background: '#48bb78'}}>IN-PERSON</span>}
      </div>
      <div className="resource-content">
        <div className="resource-meta-top">
           {parsedTags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
        </div>
        <h3 className="resource-title" title={displayTitle}>{displayTitle}</h3>
        <div className="resource-datetime">
          {dateStr} {timeStr && `• ${timeStr}`}
        </div>
        <div className="resource-location" style={{fontSize: '0.85rem', color: '#718096', marginBottom: '8px'}}>
            {is_online ? 'Online Event' : `📍 ${location || 'Location TBA'}`}
        </div>
        <p className="resource-description">{short_description || 'No description available.'}</p>
        
        <div className="resource-footer">
           <div className="resource-badges">
             <span className={`badge ${isFree ? 'free' : 'paid'}`}>{isFree ? 'Free' : 'Paid'}</span>
           </div>
        </div>
        
        <Link to={`/events/${displaySlug}`} className="resource-cta">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
