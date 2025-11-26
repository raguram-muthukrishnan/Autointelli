import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import './DashboardResourceDownloads.css';

const DashboardVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDevice, setFilterDevice] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadVisitors();
  }, []);

  const loadVisitors = async () => {
    try {
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const response = await fetch(`${STRAPI_URL}/api/visitors?pagination[pageSize]=1000&sort=lastVisit:desc`, { headers });

      if (response.ok) {
        const data = await response.json();
        setVisitors(data.data || []);
      } else {
        throw new Error('Failed to fetch visitors');
      }
    } catch (err) {
      setError('Failed to load visitors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredVisitors();
    const headers = ['Visitor ID', 'IP Address', 'Browser', 'Device', 'OS', 'Country', 'Visit Count', 'Last Visit'];
    const rows = filteredData.map(visitor => {
      const data = visitor.attributes || visitor;
      return [
        data.visitorId || '',
        data.ipAddress || '',
        data.browser || '',
        data.device || '',
        data.os || '',
        data.country || '',
        data.visitCount || 0,
        new Date(data.lastVisit).toLocaleString()
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
    link.setAttribute('download', `visitors-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredVisitors = () => {
    return visitors.filter(visitor => {
      const data = visitor.attributes || visitor;
      const matchesSearch = 
        data.visitorId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterDevice === 'all' || data.device === filterDevice;
      
      return matchesSearch && matchesFilter;
    });
  };

  const getUniqueDevices = () => {
    const devices = visitors.map(v => (v.attributes || v).device).filter(Boolean);
    return [...new Set(devices)];
  };

  const filteredVisitors = getFilteredVisitors();
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVisitors = filteredVisitors.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDevice]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTimeStats = () => {
    const now = new Date();
    const today = visitors.filter(v => {
      const lastVisit = new Date((v.attributes || v).lastVisit);
      return lastVisit.toDateString() === now.toDateString();
    }).length;

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = visitors.filter(v => {
      const lastVisit = new Date((v.attributes || v).lastVisit);
      return lastVisit >= weekAgo;
    }).length;

    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const thisMonth = visitors.filter(v => {
      const lastVisit = new Date((v.attributes || v).lastVisit);
      return lastVisit >= monthAgo;
    }).length;

    return { today, thisWeek, thisMonth };
  };

  const { today, thisWeek, thisMonth } = getTimeStats();

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading visitors...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Visitor Analytics</h1>
          <p className="dashboard-subtitle">
            Track and analyze website visitor data
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
          <button onClick={loadVisitors}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{visitors.length}</div>
          <div className="stat-label">Total Visitors</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{today}</div>
          <div className="stat-label">Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{thisWeek}</div>
          <div className="stat-label">This Week</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by visitor ID or IP address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterDevice}
          onChange={(e) => setFilterDevice(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Devices</option>
          {getUniqueDevices().map(device => (
            <option key={device} value={device}>{device}</option>
          ))}
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Last Visit</th>
              <th>Visitor ID</th>
              <th>IP Address</th>
              <th>Browser</th>
              <th>Device</th>
              <th>Visits</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVisitors.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  {searchTerm || filterDevice !== 'all' 
                    ? 'No visitors match your filters' 
                    : 'No visitors yet'}
                </td>
              </tr>
            ) : (
              paginatedVisitors.map((visitor) => {
                const data = visitor.attributes || visitor;
                return (
                  <tr key={visitor.id}>
                    <td>{new Date(data.lastVisit).toLocaleDateString()}</td>
                    <td className="email-cell">{data.visitorId?.substring(0, 12)}...</td>
                    <td>{data.ipAddress || '-'}</td>
                    <td>{data.browser || '-'}</td>
                    <td>
                      <span className="type-badge">{data.device || '-'}</span>
                    </td>
                    <td>{data.visitCount || 0}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredVisitors.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredVisitors.length}
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

export default DashboardVisitors;
