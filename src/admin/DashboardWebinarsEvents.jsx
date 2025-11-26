import { useState, useEffect } from 'react';
import { fetchWebinars, fetchEvents, createWebinar, createEvent, updateResource, deleteResource, uploadFile } from '../api';
import { buildImageUrl } from '../utils/imageUtils';
import './admin.css';

const DashboardWebinarsEvents = () => {
  const [activeTab, setActiveTab] = useState('webinars');
  const [webinars, setWebinars] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [viewMode, setViewMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    date: '',
    start_time: '',
    is_live: false,
    recording_url: '',
    is_online: false,
    location: '',
    registration_link: '',
    capacity: 100,
    speakers: '',
    tags: '',
    description: '',
    image: null
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');

      const [webinarData, eventData] = await Promise.all([
        fetchWebinars().catch(err => {
          console.error('Webinar fetch error:', err);
          return { data: [] };
        }),
        fetchEvents().catch(err => {
          console.error('Event fetch error:', err);
          return { data: [] };
        })
      ]);

      const transformData = (data) =>
        (data.data || []).map((item) => {
          const attrs = item.attributes || item;
          
          return {
            id: item.id,
            documentId: item.documentId,
            title: attrs.title || '',
            slug: attrs.slug || '',
            short_description: attrs.short_description || '',
            date: attrs.date || '',
            start_time: attrs.start_time || '',
            is_live: attrs.is_live || false,
            is_online: attrs.is_online || false,
            recording_url: attrs.recording_url || '',
            location: attrs.location || '',
            registration_link: attrs.registration_link || '',
            capacity: attrs.capacity || 100,
            speakers: attrs.speakers || '',
            tags: attrs.tags || '',
            description: attrs.description || [],
            image: buildImageUrl(attrs.image)
          };
        }).filter(Boolean);

      setWebinars(transformData(webinarData));
      setEvents(transformData(eventData));
      
      // Show helpful error if no data and likely a permissions issue
      if (webinarData.data?.length === 0 && eventData.data?.length === 0) {
        setError('No data found. Please set Strapi permissions: Settings → Roles → Public → Enable "find" and "findOne" for Webinars and Events.');
      }
    } catch (err) {
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const errorMsg = err.message || 'Unknown error';
      if (errorMsg.includes('401') || errorMsg.includes('Unauthorized')) {
        setError(`⚠️ Strapi Permissions Required: Go to Strapi Admin (${STRAPI_URL}/admin) → Settings → Roles → Public → Enable "find" and "findOne" for Webinars and Events, then click Save.`);
      } else {
        setError('Failed to fetch data. Make sure Strapi is running.');
      }
      console.error('Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentItems = activeTab === 'webinars' ? webinars : events;

  const getFilteredItems = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    return currentItems.filter((item) => {
      // Time filter based on date
      let matchesTime = true;
      if (viewMode === 'upcoming' && item.date) {
        matchesTime = item.date >= today;
      } else if (viewMode === 'past' && item.date) {
        matchesTime = item.date < today;
      }
      // 'all' mode doesn't filter by time
      
      // Search filter
      const matchesSearch = searchQuery === '' || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.speakers?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTime && matchesSearch;
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (10MB = 10 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`Image size must be less than 10MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        e.target.value = ''; // Clear the input
        return;
      }
      
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      short_description: '',
      date: '',
      start_time: '',
      is_live: false,
      recording_url: '',
      is_online: false,
      location: '',
      registration_link: '',
      capacity: 100,
      speakers: '',
      tags: '',
      description: '',
      image: null
    });
    setFormErrors({});
    setImagePreview(null);
    setShowForm(false);
    setEditMode(false);
    setCurrentItemId(null);
  };

  const handleEdit = (item) => {
    let descText = '';
    if (item.description && Array.isArray(item.description)) {
      descText = item.description
        .map((block) => block.children?.map((child) => child.text).join(' '))
        .join('\n\n');
    } else if (typeof item.description === 'string') {
      descText = item.description;
    }

    // Extract date and time from Strapi format
    let dateValue = item.date || '';
    let startTimeValue = '';
    
    // Convert time from HH:mm:ss.SSS to HH:mm for HTML input
    if (item.start_time) {
      startTimeValue = item.start_time.slice(0, 5); // HH:mm
    }

    setFormData({
      title: item.title || '',
      short_description: item.short_description || '',
      date: dateValue,
      start_time: startTimeValue,
      is_live: item.is_live || false,
      recording_url: item.recording_url || '',
      is_online: item.is_online || false,
      location: item.location || '',
      registration_link: item.registration_link || '',
      capacity: item.capacity || 100,
      speakers: item.speakers || '',
      tags: item.tags || '',
      description: descText,
      image: null
    });

    if (item.image) {
      setImagePreview(item.image);
    }

    setFormErrors({});
    setCurrentItemId(item.documentId || item.id);
    setEditMode(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, documentId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const endpoint = activeTab === 'webinars' ? 'webinars' : 'events';
        const deleteId = documentId || id;

        await deleteResource(endpoint, deleteId);

        setSuccessMessage('Item deleted successfully');
        await loadData();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete: ' + err.message);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title || formData.title.trim() === '') {
      errors.title = 'Title is required';
    }
    
    if (!formData.date || formData.date.trim() === '') {
      errors.date = 'Date is required';
    }
    
    if (!formData.start_time || formData.start_time.trim() === '') {
      errors.start_time = 'Start time is required';
    }
    
    if (!formData.short_description || formData.short_description.trim() === '') {
      errors.short_description = 'Short description is required';
    }
    
    if (activeTab === 'events' && !formData.is_online && (!formData.location || formData.location.trim() === '')) {
      errors.location = 'Location is required for in-person events';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const endpoint = activeTab === 'webinars' ? 'webinars' : 'events';

      let imageId = null;
      let imageUploadError = null;

      // Try to upload image, but don't fail if it doesn't work
      if (formData.image && typeof formData.image !== 'string') {
        try {
          const uploadData = await uploadFile(formData.image);
          imageId = uploadData[0]?.id;
        } catch (uploadErr) {
          console.warn('Image upload error:', uploadErr);
          imageUploadError = 'Image upload error, but item will be created without image';
        }
      }

      const descriptionBlocks = formData.description
        ? [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: formData.description
                }
              ]
            }
          ]
        : [];

      // Format date and time for Strapi
      // Strapi expects: date (YYYY-MM-DD), start_time (HH:mm:ss.SSS)
      const dateValue = formData.date; // Already in YYYY-MM-DD format
      const startTimeValue = `${formData.start_time}:00.000`; // Convert HH:mm to HH:mm:ss.SSS
      
      console.log('Sending to Strapi:', { date: dateValue, start_time: startTimeValue });

      const payload = {
        title: formData.title,
        short_description: formData.short_description,
        date: dateValue,
        start_time: startTimeValue,
        registration_link: formData.registration_link,
        capacity: parseInt(formData.capacity) || 100,
        speakers: formData.speakers,
        tags: formData.tags,
        description: descriptionBlocks
      };

      if (activeTab === 'webinars') {
        payload.is_live = formData.is_live;
        payload.recording_url = formData.recording_url;
      } else {
        payload.is_online = formData.is_online;
        payload.location = formData.location;
      }

      if (imageId) {
        payload.image = imageId;
      }

      console.log('Payload being sent to Strapi:', JSON.stringify(payload, null, 2));

      if (editMode) {
        await updateResource(endpoint, currentItemId, payload);
      } else {
        if (activeTab === 'webinars') {
          await createWebinar(formData.title);
          // Then update with full data
          const created = await fetchWebinars();
          const latest = created.data[0];
          await updateResource(endpoint, latest.documentId || latest.id, payload);
        } else {
          await createEvent(formData.title);
          // Then update with full data
          const created = await fetchEvents();
          const latest = created.data[0];
          await updateResource(endpoint, latest.documentId || latest.id, payload);
        }
      }

      const successMsg = `Successfully ${editMode ? 'updated' : 'created'} ${activeTab.slice(0, -1)}`;
      setSuccessMessage(imageUploadError ? `${successMsg}. ${imageUploadError}` : successMsg);
      resetForm();
      await loadData();
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Submit error:', err);
      console.error('Error details:', err.response?.data || err);
      
      // Extract detailed error message
      let errorMessage = 'Operation failed';
      if (err.response?.data?.error?.message) {
        errorMessage = err.response.data.error.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      // Show popup alert
      alert(`❌ Error: ${errorMessage}\n\nPlease check the form and try again.`);
      
      // Also set error state for display
      setError(`Operation failed: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="modern-dashboard">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading webinars and events...</p>
        </div>
      </div>
    );
  }

  const filteredItems = getFilteredItems();

  return (
    <div className="modern-dashboard">
      {/* Professional Header */}
      <div className="modern-header">
        <div className="header-text">
          <h1>Webinars & Events</h1>
          <p>Manage your upcoming and past sessions</p>
        </div>
        <div className="header-controls">
          <div className="search-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="btn-add-modern"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="modern-tabs">
        <div className="tab-group">
          <button
            className={`modern-tab ${activeTab === 'webinars' ? 'active' : ''}`}
            onClick={() => setActiveTab('webinars')}
          >
            Webinars
          </button>
          <button
            className={`modern-tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
        </div>

        <div className="filter-group">
          <button
            className={`filter-pill ${viewMode === 'all' ? 'active' : ''}`}
            onClick={() => setViewMode('all')}
          >
            All
          </button>
          <button
            className={`filter-pill ${viewMode === 'upcoming' ? 'active' : ''}`}
            onClick={() => setViewMode('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`filter-pill ${viewMode === 'past' ? 'active' : ''}`}
            onClick={() => setViewMode('past')}
          >
            Past
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={loadData} 
            style={{ 
              marginLeft: '12px', 
              padding: '6px 12px', 
              background: 'white', 
              color: '#ef4444', 
              border: '1px solid white', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* List View - Show ALL items */}
      {currentItems.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <h3>No {activeTab} found</h3>
          <p>Create your first {activeTab.slice(0, -1)} to get started.</p>
          <button className="btn-add-modern" onClick={() => { resetForm(); setShowForm(true); }}>
            + Create {activeTab.slice(0, -1)}
          </button>
        </div>
      ) : (
        <>
          {/* Show filtered count */}
          <div style={{ padding: '0 20px 10px', color: '#64748b', fontSize: '14px' }}>
            Showing {filteredItems.length} of {currentItems.length} {activeTab}
          </div>
          
          <div className="modern-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="modern-card">
                {/* Card Image */}
                {item.image && (
                  <div style={{ 
                    width: '100%', 
                    height: '160px', 
                    overflow: 'hidden', 
                    borderRadius: '12px 12px 0 0',
                    background: '#f1f5f9'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #94a3b8;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  </div>
                )}
                
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    {activeTab === 'webinars' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    )}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn" onClick={() => handleEdit(item)} title="Edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className="action-btn" onClick={() => handleDelete(item.id, item.documentId)} title="Delete">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p className="card-subtitle">{item.short_description?.substring(0, 80) || 'No description'}</p>
                  
                  <div className="card-badges">
                    {activeTab === 'webinars' && item.is_live && (
                      <span className="badge live">Live</span>
                    )}
                    {activeTab === 'events' && item.is_online && (
                      <span className="badge live">Online</span>
                    )}
                    {activeTab === 'events' && !item.is_online && (
                      <span className="badge recorded">In-Person</span>
                    )}
                  </div>
                </div>

                <div className="card-footer">
                  <div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {item.date ? new Date(item.date).toLocaleDateString() : 'No date'}
                  </div>
                  <div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {item.start_time ? item.start_time.slice(0, 5) : 'No time'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showForm && (
        <div className="form-overlay-modern">
          <div className="form-container-modern">
            <div className="form-header-modern">
              <h2>{editMode ? 'Edit' : 'Create'} {activeTab === 'webinars' ? 'Webinar' : 'Event'}</h2>
              <button className="btn-close-modern" onClick={resetForm}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="modern-form" style={{ overflowY: 'auto', maxHeight: 'calc(85vh - 80px)' }}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter title"
                  style={{ borderColor: formErrors.title ? '#ef4444' : '' }}
                />
                {formErrors.title && (
                  <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{formErrors.title}</span>
                )}
              </div>

              <div className="form-group">
                <label>Short Description *</label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Brief summary for cards"
                  required
                  style={{ borderColor: formErrors.short_description ? '#ef4444' : '' }}
                />
                {formErrors.short_description && (
                  <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{formErrors.short_description}</span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Event Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    style={{ borderColor: formErrors.date ? '#ef4444' : '' }}
                  />
                  {formErrors.date && (
                    <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{formErrors.date}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Start Time *</label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    required
                    style={{ borderColor: formErrors.start_time ? '#ef4444' : '' }}
                  />
                  {formErrors.start_time && (
                    <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{formErrors.start_time}</span>
                  )}
                </div>
              </div>

              {activeTab === 'webinars' ? (
                <>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="is_live"
                        checked={formData.is_live}
                        onChange={handleInputChange}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span>Is Live Webinar?</span>
                    </label>
                  </div>
                  {formData.is_live && (
                    <div className="form-group">
                      <label>Recording URL</label>
                      <input
                        type="text"
                        name="recording_url"
                        value={formData.recording_url}
                        onChange={handleInputChange}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="is_online"
                        checked={formData.is_online}
                        onChange={handleInputChange}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span>Is Online Event?</span>
                    </label>
                  </div>
                  {!formData.is_online && (
                    <div className="form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, Venue Name"
                        required
                        style={{ borderColor: formErrors.location ? '#ef4444' : '' }}
                      />
                      {formErrors.location && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{formErrors.location}</span>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="form-group">
                <label>Registration Link</label>
                <input
                  type="text"
                  name="registration_link"
                  value={formData.registration_link}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Speakers</label>
                  <input
                    type="text"
                    name="speakers"
                    value={formData.speakers}
                    onChange={handleInputChange}
                    placeholder="John Doe, Jane Smith"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="AIOps, Monitoring, DevOps"
                />
              </div>

              <div className="form-group">
                <label>Cover Image</label>
                {imagePreview && (
                  <div style={{ marginBottom: '10px', position: 'relative' }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }} />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setFormData(prev => ({ ...prev, image: null })); }}
                      style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '18px' }}
                    >
                      ×
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <small style={{ color: '#6b7280', marginTop: '8px', display: 'block' }}>
                  📸 Recommended: 1200x630px • Max size: 10MB • Formats: JPG, PNG, WebP
                </small>
              </div>

              <div className="form-group">
                <label>Full Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Detailed description of the webinar/event..."
                />
              </div>

              <div className="form-actions-modern">
                <button type="button" onClick={resetForm} className="btn-text">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-modern">
                  {editMode ? 'Update' : 'Create'} {activeTab.slice(0, -1)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardWebinarsEvents;
