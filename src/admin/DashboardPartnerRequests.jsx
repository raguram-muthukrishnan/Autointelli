import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import './DashboardResourceDownloads.css';

const DashboardPartnerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const response = await fetch(`${STRAPI_URL}/api/partner-requests?populate=*&sort=createdAt:desc`, { headers });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.data || []);
      } else {
        throw new Error('Failed to fetch partner requests');
      }
    } catch (err) {
      setError('Failed to load partner requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredRequests();
    const headers = ['Date', 'Company', 'Contact Name', 'Email', 'Phone', 'Partnership Type', 'Message'];
    const rows = filteredData.map(request => {
      const data = request.attributes || request;
      return [
        new Date(data.createdAt).toLocaleString(),
        data.company_name || '',
        data.contact_name || '',
        data.email || '',
        data.phone || '',
        data.partnership_type || '',
        data.message || ''
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
    link.setAttribute('download', `partner-requests-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredRequests = () => {
    return requests.filter(request => {
      const data = request.attributes || request;
      const matchesSearch = 
        data.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || data.partnership_type === filterType;
      
      return matchesSearch && matchesFilter;
    });
  };

  const getUniqueTypes = () => {
    const types = requests.map(r => (r.attributes || r).partnership_type).filter(Boolean);
    return [...new Set(types)];
  };

  const filteredRequests = getFilteredRequests();
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading partner requests...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Partner Requests</h1>
          <p className="dashboard-subtitle">
            Review and manage partnership inquiries
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
          <button onClick={loadRequests}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{requests.length}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {requests.filter(r => {
              const createdAt = new Date((r.attributes || r).createdAt);
              const now = new Date();
              return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
            }).length}
          </div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{getUniqueTypes().length}</div>
          <div className="stat-label">Partnership Types</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by company, name, or email..."
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
          {getUniqueTypes().map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Contact Name</th>
              <th>Email</th>
              <th>Partnership Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  {searchTerm || filterType !== 'all' 
                    ? 'No requests match your filters' 
                    : 'No partner requests yet'}
                </td>
              </tr>
            ) : (
              paginatedRequests.map((request) => {
                const data = request.attributes || request;
                return (
                  <tr key={request.id}>
                    <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                    <td className="email-cell">{data.company_name}</td>
                    <td>{data.contact_name}</td>
                    <td>{data.business_email || data.email}</td>
                    <td>
                      <span className="type-badge">{data.partner_type || data.partnership_type || '-'}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="view-link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          title="View Full Details"
                        >
                          View
                        </button>
                        <a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.business_email || data.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-link"
                          title="Send Email via Gmail"
                          style={{ marginLeft: '8px' }}
                        >
                          Email
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredRequests.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredRequests.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="modal-overlay" onClick={closeDetailsModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h2>Partner Request Details</h2>
              <button onClick={closeDetailsModal} className="modal-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="partner-details-content" style={{ padding: '24px' }}>
              {(() => {
                const data = selectedRequest.attributes || selectedRequest;
                return (
                  <>
                    <div className="detail-section" style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Partner Information
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Company Name</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#111827', fontWeight: '600' }}>{data.company_name || '-'}</p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Contact Name</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827', fontWeight: '500' }}>{data.contact_name || '-'}</p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Business Email</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                            <a href={`mailto:${data.business_email || data.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                              {data.business_email || data.email || '-'}
                            </a>
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Phone Number</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                            {(data.phone_number || data.phone) ? (
                              <a href={`tel:${data.phone_number || data.phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                {data.phone_number || data.phone}
                              </a>
                            ) : '-'}
                          </p>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Partner Type</label>
                          <span className="type-badge" style={{ fontSize: '14px' }}>{data.partner_type || data.partnership_type || '-'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section" style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Tell Us About Your Business
                      </h3>
                      <div style={{ 
                        background: '#f9fafb', 
                        padding: '16px', 
                        borderRadius: '8px', 
                        border: '1px solid #e5e7eb',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        color: '#374151',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        minHeight: '100px'
                      }}>
                        {data.about_business || data.message || 'No message provided'}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Submission Info
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Submitted On</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                            {new Date(data.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Request ID</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827', fontFamily: 'monospace' }}>
                            #{selectedRequest.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.business_email || data.email}&su=Re: Partnership Inquiry - ${data.partner_type || data.partnership_type || 'Partnership'}&body=Hi ${data.contact_name},%0D%0A%0D%0AThank you for your interest in partnering with us.%0D%0A%0D%0A`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-submit"
                        style={{ textDecoration: 'none', textAlign: 'center', flex: 1 }}
                      >
                        Reply via Gmail
                      </a>
                      <button onClick={closeDetailsModal} className="btn-cancel" style={{ flex: 1 }}>
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPartnerRequests;
