import { useState, useEffect } from 'react';
import { fetchBlogs, uploadFile, updateResource, deleteResource } from '../api';
import { buildImageUrl } from '../utils/imageUtils';
import './admin.css';

const DashboardBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD for date input
    readTime: '5 min read',
    excerpt: '',
    featured: false,
    description: '',
    image: null
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await fetchBlogs().catch(err => {
        console.error('Blog fetch error:', err);
        if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
          throw new Error('PERMISSIONS_ERROR');
        }
        return { data: [] };
      });
      
      if (!data.data || !Array.isArray(data.data)) {
        setBlogs([]);
        return;
      }
      
      const transformedBlogs = data.data.map((item) => {
        if (!item) return null;
        
        const hasAttributes = item.attributes !== undefined;
        const blogData = hasAttributes ? item.attributes : item;
        
        return {
          id: item.id,
          documentId: item.documentId,
          title: blogData.title || '',
          category: blogData.category || 'Technology',
          date: blogData.date || '',
          readTime: blogData.readTime || '5 min read',
          excerpt: blogData.excerpt || '',
          featured: blogData.featured || false,
          description: blogData.description || [],
          published: blogData.published || false,
          image: buildImageUrl(blogData.image),
          originalData: blogData
        };
      }).filter(Boolean);
      
      setBlogs(transformedBlogs);
    } catch (err) {
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      if (err.message === 'PERMISSIONS_ERROR') {
        setError(`⚠️ Strapi Permissions Required: Go to Strapi Admin (${STRAPI_URL}/admin) → Settings → Roles → Public → Enable "find" and "findOne" for Blogs, then click Save.`);
      } else {
        setError('Failed to fetch blogs. Make sure Strapi is running.');
      }
      console.error('Load blogs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
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
      
      setFormData(prev => ({ ...prev, image: file }));
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
      category: 'Technology',
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD for date input
      readTime: '5 min read',
      excerpt: '',
      featured: false,
      description: '',
      image: null
    });
    setImagePreview(null);
    setShowForm(false);
    setEditMode(false);
    setCurrentBlogId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    console.log('🟡 [DASHBOARD] Form submit started');
    console.log('🟡 [DASHBOARD] Form data:', {
      hasImage: !!formData.image,
      imageType: typeof formData.image,
      title: formData.title
    });

    try {
      let uploadedImageId = null;

      // Upload image if provided
      if (formData.image && typeof formData.image !== 'string') {
        console.log('🟡 [DASHBOARD] Attempting image upload...');
        try {
          const uploadData = await uploadFile(formData.image);
          uploadedImageId = uploadData[0]?.id;
          console.log('✅ [DASHBOARD] Image uploaded, ID:', uploadedImageId);
        } catch (imageErr) {
          console.error('🔴 [DASHBOARD] Image upload error:', imageErr);
          setError(`Image upload failed: ${imageErr.message}`);
          return; // Stop submission if image upload fails
        }
      }

      const descriptionBlocks = formData.description ? [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: formData.description }]
        }
      ] : [];

      const blogData = {
        title: formData.title,
        category: formData.category,
        date: formData.date,
        readTime: formData.readTime,
        excerpt: formData.excerpt,
        featured: formData.featured,
        description: descriptionBlocks
      };

      if (uploadedImageId) {
        blogData.image = uploadedImageId;
      }

      if (editMode) {
        await updateResource('blogs', currentBlogId, blogData);
        setSuccessMessage('Blog updated successfully!');
      } else {
        const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        const response = await fetch(`${STRAPI_URL}/api/blogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: blogData })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to create blog');
        }

        setSuccessMessage('Blog created successfully!');
      }

      resetForm();
      await loadBlogs();
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      setError(`${err.message}`);
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (blog) => {
    // Convert rich text blocks back to plain text for editing
    let descriptionText = '';
    if (blog.description && Array.isArray(blog.description)) {
      descriptionText = blog.description
        .map(block => block.children?.map(child => child.text).join(' '))
        .join('\n\n');
    } else if (typeof blog.description === 'string') {
      descriptionText = blog.description;
    }
    
    setFormData({
      title: blog.title || '',
      category: blog.category || 'Technology',
      date: blog.date || '',
      readTime: blog.readTime || '5 min read',
      excerpt: blog.excerpt || '',
      featured: blog.featured || false,
      description: descriptionText,
      image: null
    });
    
    if (blog.image) {
      setImagePreview(blog.image);
    }
    
    // Store both id and documentId for update
    setCurrentBlogId(blog.documentId || blog.id);
    setEditMode(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (blogId, documentId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const deleteId = documentId || blogId;
      await deleteResource('blogs', deleteId);
      
      setSuccessMessage('Blog deleted successfully!');
      await loadBlogs();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`Failed to delete blog: ${err.message}`);
      console.error('Delete error:', err);
    }
  };

  const getFilteredBlogs = () => {
    return blogs.filter((blog) => {
      const matchesSearch = searchQuery === '' || 
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || 
        (filterCategory === 'featured' && blog.featured) ||
        blog.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredBlogs = getFilteredBlogs();
  
  // Get unique categories from all blogs
  const uniqueCategories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="modern-dashboard">
        <div className="loading-state" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-dashboard">
      {/* Modern Header */}
      <div className="modern-header">
        <div className="header-text">
          <h1>Blog Management</h1>
          <p>Create and manage your blog posts</p>
        </div>
        <div className="header-controls">
          <div className="search-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blogs"
            />
          </div>
          <button
            className="btn-add-modern"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            aria-label="Add new blog post"
          >
            + Add New Blog
          </button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="modern-tabs">
        <div className="tab-group">
          <button className="modern-tab active">
            All Blogs
          </button>
        </div>

        <div className="filter-group">
          <button
            className={`filter-pill ${filterCategory === 'all' ? 'active' : ''}`}
            onClick={() => setFilterCategory('all')}
            aria-label="Show all blogs"
            aria-pressed={filterCategory === 'all'}
          >
            All
          </button>
          <button
            className={`filter-pill ${filterCategory === 'featured' ? 'active' : ''}`}
            onClick={() => setFilterCategory('featured')}
            aria-label="Show featured blogs only"
            aria-pressed={filterCategory === 'featured'}
          >
            Featured
          </button>
          {uniqueCategories.map(category => (
            <button
              key={category}
              className={`filter-pill ${filterCategory === category ? 'active' : ''}`}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={loadBlogs} 
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

      {/* Modern Form Modal */}
      {showForm && (
        <div className="form-overlay-modern">
          <div className="form-container-modern">
            <div className="form-header-modern">
              <h2>{editMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
              <button className="btn-close-modern" onClick={resetForm} type="button">×</button>
            </div>

            <form onSubmit={handleSubmit} className="modern-form" style={{ overflowY: 'auto', maxHeight: 'calc(85vh - 80px)' }}>
              <div className="form-group">
                <label>Blog Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter an engaging blog title"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Technology">Technology</option>
                    <option value="Best Practices">Best Practices</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Read Time *</label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    placeholder="5 min read"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a brief summary for blog listings..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Content *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write your full blog content here..."
                  rows="8"
                  required
                />
              </div>

              <div className="form-group">
                <label>Featured Image</label>
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
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>Mark as Featured Post</span>
                </label>
              </div>

              <div className="form-actions-modern">
                <button type="button" onClick={resetForm} className="btn-text">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-modern">
                  {editMode ? 'Update Blog' : 'Publish Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modern Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"/>
            <path d="M7 7H17M7 11H17M7 15H13" strokeLinecap="round"/>
          </svg>
          <h3>No blogs found</h3>
          <p>Create your first blog post to get started!</p>
          <button className="btn-add-modern" onClick={() => { resetForm(); setShowForm(true); }}>
            + Create Blog
          </button>
        </div>
      ) : (
        <div className="modern-grid">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="modern-card">
              {/* Card Image */}
              {blog.image && (
                <div style={{ 
                  width: '100%', 
                  height: '160px', 
                  overflow: 'hidden', 
                  borderRadius: '12px 12px 0 0',
                  background: '#f1f5f9'
                }}>
                  <img 
                    src={blog.image} 
                    alt={blog.title}
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <div className="card-actions">
                  <button className="action-btn" onClick={() => handleEdit(blog)} title="Edit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className="action-btn" onClick={() => handleDelete(blog.id, blog.documentId)} title="Delete">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="card-content">
                <h3>{blog.title}</h3>
                <p className="card-subtitle">{blog.excerpt?.substring(0, 80) || 'No excerpt'}</p>
                
                <div className="card-badges">
                  {blog.featured && (
                    <span className="badge live">Featured</span>
                  )}
                  <span className="badge recorded">{blog.category}</span>
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
                  {blog.date}
                </div>
                <div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {blog.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardBlogs;
