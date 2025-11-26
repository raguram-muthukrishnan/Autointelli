import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventBySlug } from '../api';
import { buildImageUrl } from '../utils/imageUtils';
import './ResourceDetailPage.css';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const EventDetailPage = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        console.log('Fetching event with slug:', slug);
        const data = await fetchEventBySlug(slug);
        console.log('Event data received:', data);
        if (!data) {
          console.error('No event data returned');
          setError('Event not found');
        } else {
          setEvent(data);
        }
      } catch (err) {
        console.error('Error loading event:', err);
        setError(`Failed to load event details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [slug]);

  if (loading) return <div className="loading-state">Loading event details...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!event) return <div className="error-state">Event not found.</div>;

  const hasAttributes = event.attributes !== undefined;
  const attrs = hasAttributes ? event.attributes : event;

  const {
    title,
    short_description,
    description,
    date,
    start_time,
    is_online,
    location,
    registration_link,
    image,
    speakers,
    capacity,
    registered_count,
    price,
    tags
  } = attrs;

  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"%3E%3Crect fill="%23f0f0f0" width="1200" height="600"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="48" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EEvent%3C/text%3E%3C/svg%3E';

  const imageUrl = buildImageUrl(image, placeholderImage);

  // Parse date and time
  const eventDate = date ? new Date(date) : null;
  const today = new Date().toISOString().split('T')[0];
  const isPast = date ? date < today : false;
  const seatsLeft = capacity ? capacity - (registered_count || 0) : null;
  const isFull = seatsLeft !== null && seatsLeft <= 0;

  // Parse speakers - handle string, array, or single object
  let speakersList = [];
  if (typeof speakers === 'string') {
    speakersList = speakers.split(',').map(s => ({ name: s.trim(), avatar: null, title: '' }));
  } else if (Array.isArray(speakers)) {
    speakersList = speakers;
  } else if (speakers && typeof speakers === 'object') {
    // Single speaker object
    speakersList = [speakers];
  }

  // Parse tags
  const tagsList = typeof tags === 'string' 
    ? tags.split(',').map(t => t.trim()).filter(Boolean)
    : (Array.isArray(tags) ? tags : []);

  return (
    <div className="resource-detail-container">
      <div className="breadcrumb">
        <Link to="/webinars">← Back to Webinars & Events</Link>
      </div>

      <div className="resource-detail-grid">
        {/* Main Content */}
        <div className="resource-main">
          <div className="resource-hero">
            <img src={imageUrl} alt={title} />
            <div className="hero-badges">
              {!is_online && <span className="in-person-badge">📍 IN-PERSON</span>}
              {is_online && <span className="online-badge">🌐 ONLINE</span>}
              {isPast && <span className="past-badge">Past Event</span>}
            </div>
            <h1>{title}</h1>
            <p className="resource-subtitle">{short_description}</p>
            
            {tagsList.length > 0 && (
              <div className="detail-tags">
                {tagsList.map((tag, idx) => (
                  <span key={idx} className="detail-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="metadata-row">
            <div className="metadata-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <div>
                <div className="meta-label">Date</div>
                <div className="meta-value">
                  {eventDate ? eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA'}
                </div>
              </div>
            </div>
            <div className="metadata-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <div>
                <div className="meta-label">Time</div>
                <div className="meta-value">{start_time ? start_time.slice(0, 5) : 'TBA'}</div>
              </div>
            </div>
            <div className="metadata-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <div className="meta-label">Location</div>
                <div className="meta-value">{is_online ? 'Online Event' : (location || 'TBA')}</div>
              </div>
            </div>
            <div className="metadata-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <div>
                <div className="meta-label">Price</div>
                <div className="meta-value">{(!price || price === 0) ? 'Free' : `$${price}`}</div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>About This Event</h2>
            <div className="rich-text">
              {description && description.length > 0 ? (
                <BlocksRenderer content={description} />
              ) : (
                <p>No detailed description available.</p>
              )}
            </div>
          </div>

          {speakersList.length > 0 && (
            <div className="content-section">
              <h2>Speakers & Presenters</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {speakersList.map((speaker, idx) => {
                  const speakerName = typeof speaker === 'string' ? speaker : (speaker?.name || 'Speaker');
                  const speakerTitle = typeof speaker === 'object' ? speaker?.title : '';
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <div>
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>{speakerName}</span>
                        {speakerTitle && <span style={{ fontSize: '13px', color: '#718096', display: 'block' }}>{speakerTitle}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="resource-sidebar">
          <div className="registration-card">
            <h3>{isPast ? 'Event Ended' : 'Register Now'}</h3>
            
            {capacity && (
              <div className="capacity-info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>{capacity} seats available</span>
              </div>
            )}

            {isPast ? (
              <button disabled className="btn-register">Event Ended</button>
            ) : (
              <>
                {registration_link ? (
                  <a href={registration_link} target="_blank" rel="noopener noreferrer" className="btn-register">
                    Register Now
                  </a>
                ) : (
                  <button disabled={isFull} className="btn-register">
                    {isFull ? 'Join Waitlist' : 'Register Now'}
                  </button>
                )}
                
                {seatsLeft !== null && !isFull && seatsLeft <= 10 && (
                  <div className="seats-left">⚠️ Only {seatsLeft} seats left!</div>
                )}
                {isFull && <div className="waitlist-text">This event is fully booked.</div>}
              </>
            )}

            <div className="sidebar-info">
              <div className="info-item">
                <strong>Format:</strong> {is_online ? 'Online Event' : 'In-Person Event'}
              </div>
              {!is_online && location && (
                <div className="info-item">
                  <strong>Venue:</strong> {location}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetailPage;
