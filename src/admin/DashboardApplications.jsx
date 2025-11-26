import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import './DashboardResourceDownloads.css';

const DashboardApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const response = await fetch(`${STRAPI_URL}/api/job-applications?populate=resume&sort=createdAt:desc`, { headers });

      if (response.ok) {
        const data = await response.json();
        const transformedApplications = (data.data || []).map((item) => {
          const attrs = item.attributes || item;
          const resumeData = attrs.resume?.data || attrs.resume;
          const resumeAttrs = resumeData?.attributes || resumeData;
          const resumeUrl = resumeAttrs?.url;
          
          return {
            id: item.id,
            documentId: item.documentId,
            ...attrs,
            resume: resumeUrl ? `${STRAPI_URL}${resumeUrl}` : null,
            resumeName: resumeAttrs?.name || null,
            status: attrs.status || 'new'
          };
        });
        setApplications(transformedApplications);
      } else {
        throw new Error('Failed to fetch applications');
      }
    } catch (err) {
      setError('Failed to load applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredApplications();
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Position', 'Status'];
    const rows = filteredData.map(app => [
      new Date(app.createdAt).toLocaleString(),
      app.name || '',
      app.email || '',
      app.phone || '',
      app.job_title || '',
      app.status || 'new'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `applications-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredApplications = () => {
    return applications.filter(app => {
      const matchesSearch = 
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job_title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  };

  const filteredApplications = getFilteredApplications();
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusCounts = () => {
    return {
      new: applications.filter(a => a.status === 'new').length,
      reviewed: applications.filter(a => a.status === 'reviewed').length,
      shortlisted: applications.filter(a => a.status === 'shortlisted').length
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Job Applications</h1>
          <p className="dashboard-subtitle">
            Review and manage candidate applications
          </p>
        </div>
        <button onClick={handleExportCSV} className="export-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export CSV
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadApplications}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{applications.length}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statusCounts.new}</div>
          <div className="stat-label">New</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statusCounts.reviewed}</div>
          <div className="stat-label">Reviewed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statusCounts.shortlisted}</div>
          <div className="stat-label">Shortlisted</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by name, email, or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplications.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'No applications match your filters' 
                    : 'No applications yet'}
                </td>
              </tr>
            ) : (
              paginatedApplications.map((app) => (
                <tr key={app.id}>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="email-cell">{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.job_title}</td>
                  <td>
                    <span className="type-badge">{app.status || 'new'}</span>
                  </td>
                  <td>
                    {app.resume ? (
                      <a 
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-link"
                        title="View Resume"
                      >
                        View CV
                      </a>
                    ) : (
                      <span style={{ color: '#6c757d' }}>No CV</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredApplications.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredApplications.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
};

export default DashboardApplications;
