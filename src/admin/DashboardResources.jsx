import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import { deleteResource, uploadFile } from '../api';
import './DashboardResourceDownloads.css';

const DashboardResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPublished, setFilterPublished] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    published: true  // Auto-publish by default
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      console.log('Loading resources...');
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const timestamp = new Date().getTime();
      const response = await fetch(`${STRAPI_URL}/api/resources?populate=*&sort=createdAt:desc&_=${timestamp}`, { headers });

      if (response.ok) {
        const data = await response.json();
        console.log('Resources loaded:', data.data?.length, 'items');
        setResources(data.data || []);
      } else {
        throw new Error('Failed to fetch resources');
      }
    } catch (err) {
      setError('Failed to load resources');
      console.error('Load resources error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      published: true  // Auto-publish by default
    });
    setSelectedFile(null);
    setShowForm(true);
  };

  const handleEdit = (resource) => {
    const data = resource.attributes || resource;
    setEditingResource(resource);
    setFormData({
      title: data.title || '',
      category: data.category || '',
      description: data.description || '',
      published: data.published || false
    });
    setSelectedFile(null);
    setShowForm(true);
  };

  const handleDelete = async (resourceId, documentId) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    setDeletingId(resourceId);

    try {
      const deleteId = documentId || resourceId;
      console.log('Deleting resource with ID:', deleteId);
      
      await deleteResource('resources', deleteId);
      
      console.log('Resource deleted successfully');
      setError(''); // Clear any previous errors
      await loadResources();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete resource: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (PDF or CSV)
      const allowedTypes = ['application/pdf', 'text/csv', 'application/vnd.ms-excel'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF and CSV files are allowed');
        e.target.value = '';
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must not exceed 10MB');
        e.target.value = '';
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUploading(true);
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      
      let fileId = null;
      
      // Upload file if selected (required for new resources)
      if (selectedFile) {
        console.log('Uploading file:', selectedFile.name);
        const uploadedFiles = await uploadFile(selectedFile);
        if (uploadedFiles && uploadedFiles.length > 0) {
          fileId = uploadedFiles[0].id;
          console.log('File uploaded successfully, ID:', fileId);
        }
      } else if (!editingResource) {
        // File is required for new resources
        alert('Please select a file to upload');
        setUploading(false);
        return;
      }
      
      // Build payload
      const payload = {
        data: {
          title: formData.title,
          category: formData.category.trim(), // Keep as string, not array
          description: formData.description,
          published: formData.published
        }
      };
      
      // Add file ID if uploaded
      if (fileId) {
        payload.data.file = fileId;
      }

      const url = editingResource 
        ? `${STRAPI_URL}/api/resources/${editingResource.id}`
        : `${STRAPI_URL}/api/resources`;
      
      const method = editingResource ? 'PUT' : 'POST';

      console.log('Sending payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await loadResources();
        setShowForm(false);
        setSelectedFile(null);
        alert(editingResource ? 'Resource updated successfully' : 'Resource created successfully');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        const errorMessage = errorData?.error?.message || errorData?.message || 'Failed to save resource';
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert('Failed to save resource: ' + err.message);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredResources();
    const headers = ['Title', 'Category', 'Published', 'Downloads', 'Created Date'];
    const rows = filteredData.map(resource => {
      const data = resource.attributes || resource;
      const category = Array.isArray(data.category) ? data.category.join('; ') : data.category || '';
      return [
        data.title || '',
        category,
        data.published ? 'Yes' : 'No',
        data.downloadCount || 0,
        new Date(data.createdAt).toLocaleString()
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `resources-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredResources = () => {
    return resources.filter(resource => {
      const data = resource.attributes || resource;
      const matchesSearch = data.title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || 
        (Array.isArray(data.category) ? data.category.includes(filterCategory) : data.category === filterCategory);
      
      const matchesPublished = filterPublished === 'all' || 
        (filterPublished === 'published' ? data.published : !data.published);
      
      return matchesSearch && matchesCategory && matchesPublished;
    });
  };

  const getUniqueCategories = () => {
    const categories = resources.flatMap(r => {
      const data = r.attributes || r;
      return Array.isArray(data.category) ? data.category : [data.category];
    }).filter(Boolean);
    return [...new Set(categories)];
  };

  const filteredResources = getFilteredResources();
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, filterPublished]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getResourceStats = () => {
    const published = resources.filter(r => (r.attributes || r).published).length;
    const draft = resources.filter(r => !(r.attributes || r).published).length;
    const totalDownloads = resources.reduce((sum, r) => sum + ((r.attributes || r).downloadCount || 0), 0);
    return { published, draft, totalDownloads };
  };

  const { published, draft, totalDownloads } = getResourceStats();

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Resources Management</h1>
          <p className="dashboard-subtitle">
            Manage downloadable resources and content
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleCreateNew} className="export-btn" style={{ background: '#10b981' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New
          </button>
          <button onClick={handleExportCSV} className="export-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadResources}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{resources.length}</div>
          <div className="stat-label">Total Resources</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{published}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{draft}</div>
          <div className="stat-label">Draft</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalDownloads}</div>
          <div className="stat-label">Total Downloads</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {getUniqueCategories().map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={filterPublished}
          onChange={(e) => setFilterPublished(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Downloads</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedResources.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  {searchTerm || filterCategory !== 'all' || filterPublished !== 'all'
                    ? 'No resources match your filters' 
                    : 'No resources yet'}
                </td>
              </tr>
            ) : (
              paginatedResources.map((resource) => {
                const data = resource.attributes || resource;
                const category = Array.isArray(data.category) ? data.category.join(', ') : data.category || '-';
                return (
                  <tr key={resource.id}>
                    <td className="email-cell">{data.title}</td>
                    <td>{category}</td>
                    <td>
                      <span className="type-badge">
                        {data.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>{data.downloadCount || 0}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <a 
                          href={`/resources`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-link"
                          title="View Resource"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleEdit(resource)}
                          className="action-icon-btn"
                          title="Edit Resource"
                          disabled={deletingId === resource.id}
                          style={{ color: '#3b82f6', cursor: 'pointer', background: 'none', border: 'none', padding: '4px' }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id, resource.documentId)}
                          className="action-icon-btn"
                          title="Delete Resource"
                          disabled={deletingId === resource.id}
                          style={{ 
                            color: '#ef4444', 
                            cursor: deletingId === resource.id ? 'not-allowed' : 'pointer', 
                            background: 'none', 
                            border: 'none', 
                            padding: '4px',
                            opacity: deletingId === resource.id ? 0.5 : 1
                          }}
                        >
                          {deletingId === resource.id ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spinner">
                              <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredResources.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredResources.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      )}

      {/* CRUD Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingResource ? 'Edit Resource' : 'Create New Resource'}</h2>
              <button onClick={() => setShowForm(false)} className="modal-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="resource-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  required
                  placeholder="Enter resource title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <input
                  id="category"
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  required
                  placeholder="e.g., whitepaper, ebook, guide"
                />
                <small>Enter a single category for this resource</small>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows="4"
                  placeholder="Enter resource description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="file">Upload File (PDF or CSV)</label>
                <div style={{ 
                  border: '2px dashed #cbd5e0', 
                  borderRadius: '8px', 
                  padding: '24px', 
                  textAlign: 'center',
                  background: '#f7fafc',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = '#eef2ff';
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e0';
                  e.currentTarget.style.background = '#f7fafc';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#cbd5e0';
                  e.currentTarget.style.background = '#f7fafc';
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    const input = document.getElementById('file');
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    input.files = dataTransfer.files;
                    handleFileChange({ target: input });
                  }
                }}
                onClick={() => document.getElementById('file').click()}
                >
                  <input
                    id="file"
                    type="file"
                    accept=".pdf,.csv"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 12px', color: '#667eea' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  {selectedFile ? (
                    <div>
                      <p style={{ fontWeight: '600', color: '#10b981', marginBottom: '4px' }}>
                        ✓ {selectedFile.name}
                      </p>
                      <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                        Click to upload or drag and drop
                      </p>
                      <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                        PDF or CSV (max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ 
                background: '#f0fdf4', 
                padding: '16px', 
                borderRadius: '8px',
                border: '2px solid #86efac'
              }}>
                <label className="checkbox-label" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => handleFormChange('published', e.target.checked)}
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ color: '#166534' }}>
                    ✓ Publish this resource (make it visible on the website)
                  </span>
                </label>
                <small style={{ display: 'block', marginTop: '8px', marginLeft: '32px', color: '#15803d' }}>
                  Uncheck to save as draft (only visible in admin)
                </small>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="btn-cancel" disabled={uploading}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : (editingResource ? 'Update Resource' : 'Create Resource')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardResources;
