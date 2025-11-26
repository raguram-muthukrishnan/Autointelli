import React, { useState, useEffect } from 'react';
import { getResourceDownloads, exportResourceDownloadsCSV, downloadCSV } from '../api/resourceDownloadApi';
import './DashboardResourceDownloads.css';

const DashboardResourceDownloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const response = await getResourceDownloads();
      setDownloads(response.data || []);
      setError('');
    } catch (err) {
      setError('Failed to load resource downloads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredDownloads();
    const csvContent = exportResourceDownloadsCSV(filteredData);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(csvContent, `resource-downloads-${timestamp}.csv`);
  };

  const getFilteredDownloads = () => {
    return downloads.filter(download => {
      const data = download.attributes || download;
      const matchesSearch = 
        data.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.resourceName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || data.resourceType === filterType;
      
      return matchesSearch && matchesFilter;
    });
  };

  const getUniqueResourceTypes = () => {
    const types = downloads.map(d => (d.attributes || d).resourceType).filter(Boolean);
    return [...new Set(types)];
  };

  const filteredDownloads = getFilteredDownloads();

  // Pagination calculations
  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDownloads = filteredDownloads.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading resource downloads...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Resource Downloads</h1>
          <p className="dashboard-subtitle">
            Track and manage resource download requests
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
          <button onClick={fetchDownloads}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{downloads.length}</div>
          <div className="stat-label">Total Downloads</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{new Set(downloads.map(d => (d.attributes || d).email)).size}</div>
          <div className="stat-label">Unique Emails</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{getUniqueResourceTypes().length}</div>
          <div className="stat-label">Resource Types</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by email, name, or resource..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          {getUniqueResourceTypes().map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Email</th>
              <th>Name</th>
              <th>Resource</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDownloads.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  {searchTerm || filterType !== 'all' 
                    ? 'No downloads match your filters' 
                    : 'No resource downloads yet'}
                </td>
              </tr>
            ) : (
              paginatedDownloads.map((download) => {
                const data = download.attributes || download;
                return (
                  <tr key={download.id}>
                    <td>{new Date(data.downloadedAt).toLocaleDateString()}</td>
                    <td className="email-cell">{data.email}</td>
                    <td>{data.name || '-'}</td>
                    <td className="resource-cell">{data.resourceName}</td>
                    <td>
                      <span className="type-badge">{data.resourceType}</span>
                    </td>
                    <td>
                      <a 
                        href={data.resourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-link"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredDownloads.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredDownloads.length)} of {filteredDownloads.length} downloads
          </div>
          
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                aria-label="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
          
          <div className="items-per-page">
            <label htmlFor="items-per-page">Items per page:</label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="items-select"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardResourceDownloads;
