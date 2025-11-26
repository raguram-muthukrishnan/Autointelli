import { useState, useEffect } from 'react';
import './WebinarsPage.css';
import { fetchWebinars, fetchEvents } from '../api';
import { buildImageUrl } from '../utils/imageUtils';
import WebinarCard from '../components/WebinarCard';
import NewsletterForm from '../components/NewsletterForm';
import Pagination from '../components/Pagination';

const WebinarsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch both webinars and events
        const [webinarsResponse, eventsResponse] = await Promise.all([
          fetchWebinars().catch(() => ({ data: [] })),
          fetchEvents().catch(() => ({ data: [] }))
        ]);
        
        // Transform webinars
        const webinarsData = (webinarsResponse.data || []).map(item => {
          const attrs = item.attributes || item;
          // Use documentId for slug if no slug exists (Strapi v4+)
          const itemSlug = attrs.slug || item.documentId || item.id;
          console.log('Webinar item:', { id: item.id, documentId: item.documentId, slug: attrs.slug, finalSlug: itemSlug });
          return {
            id: `webinar-${item.id}`,
            documentId: item.documentId,
            slug: itemSlug,
            type: 'webinar',
            ...attrs,
            imageUrl: buildImageUrl(attrs.image)
          };
        });
        
        // Transform events
        const eventsData = (eventsResponse.data || []).map(item => {
          const attrs = item.attributes || item;
          // Use documentId for slug if no slug exists (Strapi v4+)
          const itemSlug = attrs.slug || item.documentId || item.id;
          console.log('Event item:', { id: item.id, documentId: item.documentId, slug: attrs.slug, finalSlug: itemSlug });
          return {
            id: `event-${item.id}`,
            documentId: item.documentId,
            slug: itemSlug,
            type: 'event',
            ...attrs,
            imageUrl: buildImageUrl(attrs.image)
          };
        });
        
        // Combine and sort by date (newest first)
        const combined = [...webinarsData, ...eventsData].sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date) - new Date(a.date);
        });

        setItems(combined);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load webinars and events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Pagination
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="webinars-page-container">
      <section className="webinars-hero">
        <div className="hero-content">
          <h1>Webinars & Events</h1>
          <p>Join our expert-led sessions and events to learn best practices and maximize your Autointelli experience</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{items.filter(i => i.type === 'webinar').length}</span>
              <span className="stat-label">Webinars</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{items.filter(i => i.type === 'event').length}</span>
              <span className="stat-label">Events</span>
            </div>
          </div>
        </div>
      </section>

      <section className="webinars-content">

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading webinars and events...</p>
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
        ) : items.length > 0 ? (
          <>
            <div className="webinars-grid">
              {currentItems.map(item => (
                <WebinarCard key={item.id} webinar={item} />
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
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            <h3>No webinars or events yet</h3>
            <p>Check back soon for upcoming webinars, events, and sessions</p>
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
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Never Miss an Event</h2>
          <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '30px', lineHeight: '1.6' }}>Get notified about upcoming webinars and events delivered straight to your inbox</p>
          <NewsletterForm 
            categories={['webinar', 'event', 'all']}
          />
        </section>
      </section>
    </div>
  );
};

export default WebinarsPage;
