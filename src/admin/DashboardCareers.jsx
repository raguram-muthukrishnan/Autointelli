import { useState, useEffect } from 'react';
import { uploadFile, updateResource, deleteResource } from '../api';
import './admin.css';

const DashboardCareers = () => {
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    employment_type: 'Full-time',
    experience_level: 'Mid Level',
    short_description: '',
    description: '',
    requirements: '',
    responsibilities: '',
    salary_range: '',
    application_deadline: '',
    is_remote: true,
    is_featured: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');

      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      // Suppress 404 errors in console for missing content types
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      
      const fetchSilent = async (url) => {
        try {
          const res = await fetch(url, { headers });
          return res;
        } catch (err) {
          return { ok: false, status: 404 };
        }
      };

      const [careersRes, applicationsRes] = await Promise.all([
        fetchSilent(`${STRAPI_URL}/api/jobs?populate=*`),
        fetchSilent(`${STRAPI_URL}/api/job-applications?populate=*`)
      ]);

      if (careersRes.ok) {
        const careersData = await careersRes.json();
        const transformedCareers = (careersData.data || []).map((item) => {
          const attrs = item.attributes || item;
          return {
            id: item.id,
            documentId: item.documentId,
            ...attrs
          };
        });
        setCareers(transformedCareers);
      } else if (careersRes.status === 404) {
        setError('⚠️ Job content type not found. Please create it in Strapi: Content-Type Builder → Create "Job" collection type.');
        setCareers([]);
      }

      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        const transformedApplications = (applicationsData.data || []).map((item) => {
          const attrs = item.attributes || item;
          return {
            id: item.id,
            documentId: item.documentId,
            ...attrs,
            resume: attrs.resume?.data?.attributes?.url 
              ? `${STRAPI_URL}${attrs.resume.data.attributes.url}`
              : null
          };
        });
        setApplications(transformedApplications);
      } else if (applicationsRes.status === 404) {
        // Application content type not created yet - this is expected
        setApplications([]);
      }
    } catch (err) {
      setError('Failed to fetch data. Make sure Strapi is running.');
      console.error('Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: 'Engineering',
      location: 'Remote',
      employment_type: 'Full-time',
      experience_level: 'Mid Level',
      short_description: '',
      description: '',
      requirements: '',
      responsibilities: '',
      salary_range: '',
      application_deadline: '',
      is_remote: true,
      is_featured: false
    });
    setShowForm(false);
    setEditMode(false);
    setCurrentJobId(null);
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title || '',
      department: job.department || 'Engineering',
      location: job.location || 'Remote',
      employment_type: job.employment_type || 'Full-time',
      experience_level: job.experience_level || 'Mid Level',
      short_description: job.short_description || '',
      description: job.description || '',
      requirements: job.requirements || '',
      responsibilities: job.responsibilities || '',
      salary_range: job.salary_range || '',
      application_deadline: job.application_deadline || '',
      is_remote: job.is_remote !== undefined ? job.is_remote : true,
      is_featured: job.is_featured || false
    });
    
    setCurrentJobId(job.documentId || job.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id, documentId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      const deleteId = documentId || id;
      await deleteResource('jobs', deleteId);
      
      setSuccessMessage('Job deleted successfully!');
      await loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`Failed to delete job: ${err.message}`);
    }
  };

  const handleDeleteApplication = async (id, documentId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      const deleteId = documentId || id;
      await deleteResource('job-applications', deleteId);
      
      setSuccessMessage('Application deleted successfully!');
      await loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`Failed to delete application: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        employment_type: formData.employment_type,
        experience_level: formData.experience_level,
        short_description: formData.short_description,
        description: formData.description,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        salary_range: formData.salary_range,
        application_deadline: formData.application_deadline,
        is_remote: formData.is_remote,
        is_featured: formData.is_featured
      };

      if (editMode) {
        await updateResource('jobs', currentJobId, jobData);
        setSuccessMessage('Job updated successfully!');
      } else {
        const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        const jwt = localStorage.getItem('jwt');
        const headers = {
          'Content-Type': 'application/json',
          ...(jwt && { 'Authorization': `Bearer ${jwt}` })
        };

        const response = await fetch(`${STRAPI_URL}/api/jobs`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ data: jobData })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to create job');
        }

        setSuccessMessage('Job created successfully!');
      }

      resetForm();
      await loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`${err.message}`);
      console.error('Submit error:', err);
    }
  };

  const getFilteredJobs = () => {
    return careers.filter((job) => {
      const matchesSearch = searchQuery === '' || 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  const getFilteredApplications = () => {
    return applications.filter((app) => {
      const matchesSearch = searchQuery === '' || 
        app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job_title?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  const filteredJobs = getFilteredJobs();
  const filteredApplications = getFilteredApplications();

  if (loading) {
    return (
      <div className="modern-dashboard">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading careers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-dashboard">
      {/* Modern Header */}
      <div className="modern-header">
        <div className="header-text">
          <h1>Careers Management</h1>
          <p>Manage job postings and applications</p>
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
          {activeTab === 'jobs' && (
            <button
              className="btn-add-modern"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              + Add New Job
            </button>
          )}
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="modern-tabs">
        <div className="tab-group">
          <button
            className={`modern-tab ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Postings ({careers.length})
          </button>
          <button
            className={`modern-tab ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({applications.length})
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}
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

      {/* Modern Form Modal */}
      {showForm && (
        <div className="form-overlay-modern">
          <div className="form-container-modern">
            <div className="form-header-modern">
              <h2>{editMode ? 'Edit Job Posting' : 'Create New Job Posting'}</h2>
              <button className="btn-close-modern" onClick={resetForm} type="button">×</button>
            </div>

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-fields-scrollable" style={{ overflowY: 'auto', maxHeight: 'calc(85vh - 180px)' }}>
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>Department *</label>
                    <select name="department" value={formData.department} onChange={handleInputChange} required>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Location *</label>
                    <select name="location" value={formData.location} onChange={handleInputChange} required>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                      <option value="New York">New York</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="London">London</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>Employment Type *</label>
                    <select name="employment_type" value={formData.employment_type} onChange={handleInputChange} required>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Experience Level *</label>
                    <select name="experience_level" value={formData.experience_level} onChange={handleInputChange} required>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Lead/Principal">Lead/Principal</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Salary Range</label>
                  <input
                    type="text"
                    name="salary_range"
                    value={formData.salary_range}
                    onChange={handleInputChange}
                    placeholder="e.g., $80,000 - $120,000"
                  />
                </div>

                <div className="form-group">
                  <label>Application Deadline</label>
                  <input
                    type="date"
                    name="application_deadline"
                    value={formData.application_deadline}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Short Description *</label>
                  <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    placeholder="Brief summary of the role (1-2 sentences)..."
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Job Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role and what the candidate will be doing..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Requirements *</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="List the required skills, qualifications, and experience..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Responsibilities *</label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    placeholder="List the key responsibilities of this role..."
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className="form-actions-modern">
                <button type="button" onClick={resetForm} className="btn-text">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-modern">
                  {editMode ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content Display */}
      {activeTab === 'jobs' ? (
        // Jobs Grid
        filteredJobs.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <h3>No job postings found</h3>
            <p>Create your first job posting to get started!</p>
            <button className="btn-add-modern" onClick={() => { resetForm(); setShowForm(true); }}>
              + Create Job
            </button>
          </div>
        ) : (
          <div className="modern-grid">
            {filteredJobs.map((job) => (
              <div key={job.id} className="modern-card">
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  </div>
                  <div className="card-actions">
                    <button className="action-btn" onClick={() => handleEdit(job)} title="Edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className="action-btn" onClick={() => handleDelete(job.id, job.documentId)} title="Delete">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{job.title}</h3>
                  <p className="card-subtitle">{job.department} • {job.location}</p>
                  
                  <div className="card-badges">
                    <span className={`badge ${job.status === 'active' ? 'live' : 'recorded'}`}>
                      {job.status}
                    </span>
                    <span className="badge recorded">{job.type}</span>
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
                    {job.posted_date}
                  </div>
                  <div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {job.experience}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // Applications List
        filteredApplications.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <h3>No applications yet</h3>
            <p>Applications will appear here when candidates apply.</p>
          </div>
        ) : (
          <div className="modern-grid">
            {filteredApplications.map((app) => (
              <div key={app.id} className="modern-card">
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="card-actions">
                    {app.resume && (
                      <a href={app.resume} target="_blank" rel="noopener noreferrer" className="action-btn" title="View Resume">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </a>
                    )}
                    <button className="action-btn" onClick={() => handleDeleteApplication(app.id, app.documentId)} title="Delete">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{app.name}</h3>
                  <p className="card-subtitle">{app.email}</p>
                  <p className="card-subtitle" style={{ marginTop: '8px', fontWeight: '600' }}>
                    Applied for: {app.job_title}
                  </p>
                  {app.cover_letter && (
                    <p className="card-subtitle" style={{ marginTop: '8px' }}>
                      {app.cover_letter.substring(0, 100)}...
                    </p>
                  )}
                </div>

                <div className="card-footer">
                  <div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {app.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default DashboardCareers;
