import React, { useState, useEffect, useRef } from 'react';
import './ResourcesPage.css';
import NewsletterForm from '../components/NewsletterForm';
import ResourceDownloadModal from '../components/ResourceDownloadModal';
import { fetchResources, downloadResource } from '../api';
import { submitResourceDownload } from '../api/resourceDownloadApi';
import { buildImageUrl } from '../utils/imageUtils';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const observerTarget = useRef(null);

  // Available categories from the schema
  const availableCategories = [
    'Whitepapers',
    'Case Studies',
    'Technical Guides',
    'Reports',
    'Templates',
    'Datasheets'
  ];

  // Debounce search query - wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    loadResources();
  }, [selectedCategories, debouncedSearchQuery]); // Reload when categories or debounced search change

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreResources();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadingMore, loading]);

  const loadResources = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch first 12 resources with category filters and search
      const response = await fetchResources({
        page: 1,
        pageSize: 12,
        category: selectedCategories.length > 0 ? selectedCategories : undefined,
        search: debouncedSearchQuery || undefined
      });
      
      setResources(response.data || []);
      setPage(1);
      
      // Check if there are more pages
      const pagination = response.meta?.pagination;
      if (pagination) {
        setHasMore(pagination.page < pagination.pageCount);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading resources:', err);
      setError('Failed to load resources. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResources = async () => {
    // Prevent duplicate loading requests
    if (loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);
      setError('');
      
      const nextPage = page + 1;
      
      // Fetch next page of resources with category filters and search
      const response = await fetchResources({
        page: nextPage,
        pageSize: 12,
        category: selectedCategories.length > 0 ? selectedCategories : undefined,
        search: debouncedSearchQuery || undefined
      });
      
      // Append new resources to existing list
      setResources(prev => [...prev, ...(response.data || [])]);
      setPage(nextPage);
      
      // Check if there are more pages
      const pagination = response.meta?.pagination;
      if (pagination) {
        setHasMore(pagination.page < pagination.pageCount);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more resources:', err);
      setError('Failed to load more resources. Please try again.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Remove category if already selected
        return prev.filter(cat => cat !== category);
      } else {
        // Add category if not selected
        return [...prev, category];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 4000);
  };

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedResource(null);
  };

  const mapCategoryToResourceType = (category) => {
    if (!category) return 'other';
    
    const categoryLower = category.toLowerCase();
    const typeMap = {
      'whitepapers': 'whitepaper',
      'whitepaper': 'whitepaper',
      'ebooks': 'ebook',
      'ebook': 'ebook',
      'technical guides': 'guide',
      'guides': 'guide',
      'guide': 'guide',
      'case studies': 'case-study',
      'case study': 'case-study',
      'datasheets': 'datasheet',
      'datasheet': 'datasheet',
      'templates': 'template',
      'template': 'template',
      'reports': 'other',
      'video': 'video',
      'webinar': 'webinar'
    };
    
    return typeMap[categoryLower] || 'other';
  };

  const handleDownload = async (email, name) => {
    if (!selectedResource) return;

    try {
      setDownloadingId(selectedResource.id);
      setError('');
      
      const attrs = selectedResource.attributes || selectedResource;
      const fileData = attrs.file?.data || attrs.file;
      
      if (!fileData) {
        throw new Error('File not found - make sure the file was uploaded correctly');
      }

      // Get category and map to valid resource type
      const category = Array.isArray(attrs.category) ? attrs.category[0] : attrs.category;
      const resourceType = mapCategoryToResourceType(category);

      // Submit download tracking data
      await submitResourceDownload({
        email,
        name,
        resourceName: attrs.title,
        resourceType: resourceType,
        resourceUrl: window.location.href
      });
      
      // Call the download endpoint which tracks the download
      const blob = await downloadResource(selectedResource.id);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const fileName = fileData.attributes?.name || fileData.name || 'download';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Show success notification
      showNotification('success', `Successfully downloaded "${attrs.title}"`);
      
      // Refresh resources to show updated download count
      await loadResources();
    } catch (err) {
      console.error('Download error:', err);
      const errorMessage = err.message || 'Unknown error occurred';
      setError(`Failed to download resource: ${errorMessage}`);
      showNotification('error', `Download failed: ${errorMessage}`);
      throw err; // Re-throw to let modal handle it
    } finally {
      setDownloadingId(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (ext) => {
    if (ext === '.pdf') {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      );
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="resources-page-container">
        <section className="resources-hero">
          <h1>Downloadable Resources</h1>
          <p>Access whitepapers, case studies, technical guides, and more</p>
        </section>
        <section className="resources-content">
          <div className="filter-section">
            <div className="filter-header">
              <div className="skeleton skeleton-title"></div>
            </div>
            <div className="category-filters">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton skeleton-chip"></div>
              ))}
            </div>
          </div>
          <div className="resources-grid-download">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="resource-download-card skeleton-card">
                <div className="resource-card-header">
                  <div className="skeleton skeleton-icon"></div>
                  <div className="file-meta">
                    <div className="skeleton skeleton-text-small"></div>
                    <div className="skeleton skeleton-text-small"></div>
                  </div>
                </div>
                <div className="resource-card-body">
                  <div className="skeleton skeleton-text-large"></div>
                  <div className="skeleton skeleton-text-medium"></div>
                  <div className="skeleton skeleton-text-medium"></div>
                  <div className="resource-categories">
                    <div className="skeleton skeleton-tag"></div>
                    <div className="skeleton skeleton-tag"></div>
                  </div>
                </div>
                <div className="resource-card-footer">
                  <div className="skeleton skeleton-text-small"></div>
                  <div className="skeleton skeleton-button"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="resources-page-container">
      {/* Resource Download Modal */}
      <ResourceDownloadModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        resourceName={selectedResource?.attributes?.title || selectedResource?.title || ''}
        resourceUrl={window.location.href}
        onDownload={handleDownload}
      />

      {/* Notification Toast */}
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          <div className="notification-content">
            {notification.type === 'success' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
          <button 
            className="notification-close" 
            onClick={() => setNotification({ show: false, type: '', message: '' })}
            aria-label="Close notification"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      <section className="resources-hero">
        <h1>Downloadable Resources</h1>
        <p>Access whitepapers, case studies, technical guides, and more</p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{resources.length}</span>
            <span className="stat-label">Resources</span>
          </div>
        </div>
      </section>

      {error && (
        <div className="error-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{error}</span>
        </div>
      )}

      <section className="resources-content">
        {/* Search Section */}
        <div className="search-section">
          <div className="search-input-wrapper">
            {searchQuery && searchQuery !== debouncedSearchQuery ? (
              <div className="search-icon searching">
                <div className="search-spinner"></div>
              </div>
            ) : (
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            )}
            <input
              type="text"
              className="search-input"
              placeholder="Search resources by title or description..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={handleClearSearch} aria-label="Clear search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Section */}
        <div className="filter-section">
          <div className="filter-header">
            <h3 className="filter-title">Filter by Category</h3>
            <div className="filter-header-actions">
              <div className="sort-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
                <span>Sorted by newest</span>
              </div>
              {(selectedCategories.length > 0 || searchQuery) && (
                <button className="clear-filters-btn" onClick={handleClearFilters}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
          <div className="category-filters">
            {availableCategories.map((category) => (
              <button
                key={category}
                className={`category-chip ${selectedCategories.includes(category) ? 'active' : ''}`}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
                {selectedCategories.includes(category) && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        {resources.length > 0 ? (
          <>
            <div className="resources-grid-download">
              {resources.map((resource) => {
                const attrs = resource.attributes || resource;
                // Handle both nested (file.data.attributes) and flat (file) structures
                const fileData = attrs.file?.data || attrs.file;
                const fileAttrs = fileData?.attributes || fileData;
                
                return (
                  <div key={resource.id} className="resource-download-card">
                    <div className="resource-card-header">
                      <div className="file-icon">
                        {getFileIcon(fileAttrs?.ext || '')}
                      </div>
                      <div className="file-meta">
                        <span className="file-type">{(fileAttrs?.ext || '').toUpperCase().replace('.', '')}</span>
                        <span className="file-size">{formatFileSize(fileAttrs?.size ? fileAttrs.size * 1024 : 0)}</span>
                      </div>
                    </div>
                    
                    <div className="resource-card-body">
                      <h3 className="resource-title">{attrs.title}</h3>
                      <p className="resource-description">{attrs.description}</p>
                      
                      {attrs.category && (
                        <div className="resource-categories">
                          {Array.isArray(attrs.category) ? (
                            attrs.category.map((cat, idx) => (
                              <span key={idx} className="category-tag">{cat}</span>
                            ))
                          ) : (
                            <span className="category-tag">{attrs.category}</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="resource-card-footer">
                      <div className="download-stats">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        <span>{attrs.downloadCount || 0} downloads</span>
                      </div>
                      
                      <button
                        className="download-btn"
                        onClick={() => handleDownloadClick(resource)}
                        disabled={downloadingId === resource.id}
                      >
                        {downloadingId === resource.id ? (
                          <>
                            <div className="btn-spinner"></div>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7 10 12 15 17 10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Download
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Loading indicator for lazy loading */}
            {loadingMore && (
              <div className="loading-more-container">
                <div className="spinner"></div>
                <p>Loading more resources...</p>
              </div>
            )}
            
            {/* "No more resources" state */}
            {!hasMore && !loadingMore && (
              <div className="no-more-resources">
                <p>You've reached the end of the list</p>
              </div>
            )}
            
            {/* Intersection Observer target */}
            <div ref={observerTarget} className="observer-target" />
          </>
        ) : (
          <div className="empty-state">
            {searchQuery ? (
              <>
                <div className="empty-state-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3>No results found for "{searchQuery}"</h3>
                <p>We couldn't find any resources matching your search. Try different keywords or browse all resources.</p>
                <button className="empty-state-action" onClick={handleClearSearch}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Clear Search
                </button>
              </>
            ) : selectedCategories.length > 0 ? (
              <>
                <div className="empty-state-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    <line x1="12" y1="11" x2="12" y2="17"/>
                    <line x1="9" y1="14" x2="15" y2="14"/>
                  </svg>
                </div>
                <h3>No resources found in selected categories</h3>
                <p>Try selecting different categories or clear your filters to see all resources.</p>
                <button className="empty-state-action" onClick={handleClearFilters}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Clear All Filters
                </button>
              </>
            ) : (
              <>
                <div className="empty-state-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <path d="M12 18v-6"/>
                    <path d="M9 15l3 3 3-3"/>
                  </svg>
                </div>
                <h3>No resources available yet</h3>
                <p>We're working on adding valuable content for you. Check back soon for whitepapers, case studies, and technical guides.</p>
              </>
            )}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 className="newsletter-title">Get monthly shortcuts to enhance your IT Ops productivity — No Fluffs.</h2>
          <p className="newsletter-subtitle">Autointelli Community only insights not published anywhere else.</p>
          <NewsletterForm categories={['resource', 'all']} />
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
