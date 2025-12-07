import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import './DashboardResourceDownloads.css';

const DashboardChatbotInteractions = () => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const response = await fetch(`${STRAPI_URL}/api/chatbot-interactions?populate=*&sort=createdAt:desc`, { headers });

      if (response.ok) {
        const data = await response.json();
        setInteractions(data.data || []);
      } else {
        throw new Error('Failed to fetch chatbot interactions');
      }
    } catch (err) {
      setError('Failed to load chatbot interactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredInteractions();
    const headers = ['Date', 'Email', 'Source Page', 'First Message', 'Total Messages', 'Session ID'];
    const rows = filteredData.map(interaction => {
      const data = interaction.attributes || interaction;
      return [
        new Date(data.createdAt).toLocaleString(),
        data.email || '',
        data.source_page || '',
        data.first_message || '',
        data.total_messages || 0,
        data.session_id || ''
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
    link.setAttribute('download', `chatbot-interactions-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredInteractions = () => {
    return interactions.filter(interaction => {
      const data = interaction.attributes || interaction;
      const matchesSearch = 
        data.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.source_page?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.first_message?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  };

  const filteredInteractions = getFilteredInteractions();
  const totalPages = Math.ceil(filteredInteractions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInteractions = filteredInteractions.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (interaction) => {
    setSelectedInteraction(interaction);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedInteraction(null);
  };

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading chatbot interactions...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Chatbot Interactions</h1>
          <p className="dashboard-subtitle">
            Review user emails and conversations from the chatbot
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
          <button onClick={loadInteractions}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{interactions.length}</div>
          <div className="stat-label">Total Interactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {interactions.filter(i => {
              const createdAt = new Date((i.attributes || i).createdAt);
              const now = new Date();
              return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
            }).length}
          </div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {[...new Set(interactions.map(i => (i.attributes || i).email))].length}
          </div>
          <div className="stat-label">Unique Users</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by email, page, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Email</th>
              <th>Source Page</th>
              <th>Messages</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInteractions.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  {searchTerm 
                    ? 'No interactions match your search' 
                    : 'No chatbot interactions yet'}
                </td>
              </tr>
            ) : (
              paginatedInteractions.map((interaction) => {
                const data = interaction.attributes || interaction;
                return (
                  <tr key={interaction.id}>
                    <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                    <td className="email-cell">{data.email}</td>
                    <td>{data.source_page || '-'}</td>
                    <td>
                      <span className="type-badge">{data.total_messages || 0}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => handleViewDetails(interaction)}
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

      {filteredInteractions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredInteractions.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedInteraction && (
        <div className="modal-overlay" onClick={closeDetailsModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h2>Chatbot Interaction Details</h2>
              <button onClick={closeDetailsModal} className="modal-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="inquiry-details-content" style={{ padding: '24px' }}>
              {(() => {
                const data = selectedInteraction.attributes || selectedInteraction;
                return (
                  <>
                    <div className="detail-section">
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        User Information
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Email</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                            <a href={`mailto:${data.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                              {data.email || '-'}
                            </a>
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Source Page</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>{data.source_page || '-'}</p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Total Messages</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>{data.total_messages || 0}</p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Session ID</label>
                          <p style={{ margin: 0, fontSize: '13px', color: '#111827', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {data.session_id || '-'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section" style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        First Message
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
                        wordBreak: 'break-word'
                      }}>
                        {data.first_message || 'No message recorded'}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Interaction Info
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Started On</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                            {new Date(data.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Interaction ID</label>
                          <p style={{ margin: 0, fontSize: '15px', color: '#111827', fontFamily: 'monospace' }}>
                            #{selectedInteraction.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}&su=Following up on your AutoIntelli inquiry&body=Hi,%0D%0A%0D%0AThank you for chatting with Alice AI. I wanted to follow up on your inquiry.%0D%0A%0D%0A`}
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

export default DashboardChatbotInteractions;
