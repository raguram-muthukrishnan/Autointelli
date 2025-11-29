import { useState, useEffect } from 'react';
import './EventsPage.css';
import { fetchEvents } from '../api';
import { buildImageUrl } from '../utils/imageUtils';
import EventCard from '../components/EventCard';
import NewsletterForm from '../components/NewsletterForm';
import Pagination from '../components/Pagination';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 9;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await fetchEvents();
        
        const data = response.data || [];
        const transformedData = data.map(item => {
          const attrs = item.attributes || item;
          return {
            id: item.id,
            documentId: item.documentId,
            slug: attrs.slug || item.id,
            ...attrs,
            imageUrl: buildImageUrl(attrs.image)
          };
        });

        // Sort by date (newest first)
        const sorted = transformedData.sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date) - new Date(a.date);
        });

        setEvents(sorted);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Pagination
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="webinars-page-container">
      <section className="webinars-hero">
        <div className="hero-content">
          <h1>Events</h1>
          <p>Connect with us in-person and online at these upcoming events</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{events.length}</span>
              <span className="stat-label">Events</span>
            </div>
          </div>
        </div>
      </section>

      <section className="webinars-content">

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>{error}</p>
          </div>
        ) : events.length > 0 ? (
          <>
            <div className="webinars-grid">
              {currentEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="no-results">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <h3>No events yet</h3>
            <p>Check back soon for upcoming events</p>
          </div>
        )}

        {/* Newsletter Section */}
        <section className="newsletter-section" style={{ marginTop: '60px', textAlign: 'center' }}>
          <div className="newsletter-icon" style={{ marginBottom: '20px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto', display: 'block' }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Get monthly shortcuts to enhance your IT Ops productivity — No Fluffs.</h2>
          <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '30px', lineHeight: '1.6' }}>Autointelli Community only insights not published anywhere else.</p>
          <NewsletterForm 
            categories={['event', 'all']}
          />
        </section>
      </section>
    </div>
  );
};

export default EventsPage;
