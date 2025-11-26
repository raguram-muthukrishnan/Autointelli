import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import './DashboardResourceDownloads.css';

const DashboardInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const response = await fetch(`${STRAPI_URL}/api/cta-inquiries?populate=*&sort=createdAt:desc`, { headers });

      if (response.ok) {
        const data = await response.json();
        setInquiries(data.data || []);
      } else {
        throw new Error('Failed to fetch inquiries');
      }
    } catch (err) {
      setError('Failed to load inquiries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredInquiries();
    const headers = ['Date', 'Name', 'Email', 'Company', 'Service', 'Phone', 'Message'];
    const rows = filteredData.map(inquiry => {
      const data = inquiry.attributes || inquiry;
      return [
        new Date(data.createdAt).toLocaleString(),
        data.name || '',
        data.email || '',
        data.company || '',
        data.service_requested || '',
        data.phone || '',
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
    link.setAttribute('download', `inquiries-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredInquiries = () => {
    return inquiries.filter(inquiry => {
      const data = inquiry.attributes || inquiry;
      const matchesSearch = 
        data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterService === 'all' || data.service_requested === filterService;
      
      return matchesSearch && matchesFilter;
    });
  };

  const getUniqueServices = () => {
    const services = inquiries.map(i => (i.attributes || i).service_requested).filter(Boolean);
    return [...new Set(services)];
  };

  const filteredInquiries = getFilteredInquiries();
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterService]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedInquiry(null);
  };

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading inquiries...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Contact Inquiries</h1>
          <p className="dashboard-subtitle">
            Review and manage customer inquiries from contact forms
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
          <button onClick={loadInquiries}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{inquiries.length}</div>
          <div className="stat-label">Total Inquiries</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {inquiries.filter(i => {
              const createdAt = new Date((i.attributes || i).createdAt);
              const now = new Date();
              return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
            }).length}
          </div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{getUniqueServices().length}</div>
          <div className="stat-label">Service Types</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Services</option>
          {getUniqueServices().map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  {searchTerm || filterService !== 'all' 
                    ? 'No inquiries match your filters' 
                    : 'No inquiries yet'}
                </td>
              </tr>
            ) : (
              paginatedInquiries.map((inquiry) => {
                const data = inquiry.attributes || inquiry;
                return (
                  <tr key={inquiry.id}>
                    <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                    <td className="email-cell">{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.company || '-'}</td>
                    <td>
                      <span className="type-badge">{data.service_requested || '-'}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => handleViewDetails(inquiry)}
                          className="view-link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          title="View Full Details"
                        >
                          View
                        </button>
                        <a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`}
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

      {filteredInquiries.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredInquiries.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedInquiry && (
        <div className="modal-overlay" onClick={closeDetailsModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h2>Inquiry Details</h2>
              <button onClick={closeDetailsModal} className="modal-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="inquiry-details-content" style={{ padding: '24px' }}>
              {(() => {
                const data = selectedInquiry.attributes || selectedInquiry;
                return (
                  <>
                    <div className="detail-section">
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Contact Information
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Name</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827', fontWeight: '500' }}>{data.name || '-'}</p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Email</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                            <a href={`mailto:${data.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                              {data.email || '-'}
                            </a>
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Phone</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                            {data.phone ? (
                              <a href={`tel:${data.phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                {data.phone}
                              </a>
                            ) : '-'}
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Company</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>{data.company || '-'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section" style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Inquiry Details
                      </h3>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Service Requested</label>
                        <span className="type-badge" style={{ fontSize: '14px' }}>{data.service_requested || '-'}</span>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>Message</label>
                        <div style={{ 
                          background: '#f9fafb', 
                          padding: '16px', 
                          borderRadius: '8px', 
                          border: '1px solid #e5e7eb',
                          fontSize: '15px',
                          lineHeight: '1.6',
                          color: '#374151',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}>
                          {data.message || 'No message provided'}
                        </div>
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
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Inquiry ID</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827', fontFamily: 'monospace' }}>
                            #{selectedInquiry.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}&su=Re: ${data.service_requested || 'Your Inquiry'}&body=Hi ${data.name},%0D%0A%0D%0A`}
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

export default DashboardInquiries;
