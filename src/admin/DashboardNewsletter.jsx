import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import './DashboardResourceDownloads.css';

const DashboardNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const response = await fetch(`${STRAPI_URL}/api/newsletter-subscriptions?populate=*&sort=createdAt:desc`, { headers });

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.data || []);
      } else {
        throw new Error('Failed to fetch subscribers');
      }
    } catch (err) {
      setError('Failed to load subscribers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredSubscribers();
    const headers = ['Date', 'Email', 'Categories', 'Status'];
    const rows = filteredData.map(sub => {
      const data = sub.attributes || sub;
      const categories = Array.isArray(data.categories) ? data.categories.join('; ') : data.categories || '';
      return [
        new Date(data.createdAt).toLocaleString(),
        data.email || '',
        categories,
        data.status || 'active'
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
    link.setAttribute('download', `newsletter-subscribers-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredSubscribers = () => {
    return subscribers.filter(sub => {
      const data = sub.attributes || sub;
      const matchesSearch = data.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || data.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  };

  const filteredSubscribers = getFilteredSubscribers();
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusCounts = () => {
    return {
      active: subscribers.filter(s => (s.attributes || s).status !== 'unsubscribed').length,
      unsubscribed: subscribers.filter(s => (s.attributes || s).status === 'unsubscribed').length
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading subscribers...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Newsletter Subscribers</h1>
          <p className="dashboard-subtitle">
            Manage newsletter subscriptions and email lists
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
          <button onClick={loadSubscribers}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{subscribers.length}</div>
          <div className="stat-label">Total Subscribers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statusCounts.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statusCounts.unsubscribed}</div>
          <div className="stat-label">Unsubscribed</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by email..."
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
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Email</th>
              <th>Categories</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubscribers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'No subscribers match your filters' 
                    : 'No subscribers yet'}
                </td>
              </tr>
            ) : (
              paginatedSubscribers.map((sub) => {
                const data = sub.attributes || sub;
                const categories = Array.isArray(data.categories) ? data.categories.join(', ') : data.categories || '-';
                return (
                  <tr key={sub.id}>
                    <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                    <td className="email-cell">{data.email}</td>
                    <td>{categories}</td>
                    <td>
                      <span className="type-badge">{data.status || 'active'}</span>
                    </td>
                    <td>
                      <a 
                        href={`mailto:${data.email}`}
                        className="view-link"
                        title="Send Email"
                      >
                        Email
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredSubscribers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredSubscribers.length}
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

export default DashboardNewsletter;
