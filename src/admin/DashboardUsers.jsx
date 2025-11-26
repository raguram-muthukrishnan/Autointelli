import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import './DashboardResourceDownloads.css';

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const jwt = localStorage.getItem('jwt');
      const headers = {
        'Content-Type': 'application/json',
        ...(jwt && { 'Authorization': `Bearer ${jwt}` })
      };

      const response = await fetch(`${STRAPI_URL}/api/users?populate=*`, { headers });

      if (response.ok) {
        const data = await response.json();
        setUsers(data || []);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredUsers();
    const headers = ['Username', 'Email', 'Role', 'Confirmed', 'Blocked'];
    const rows = filteredData.map(user => [
      user.username || '',
      user.email || '',
      user.role?.name || 'User',
      user.confirmed ? 'Yes' : 'No',
      user.blocked ? 'Yes' : 'No'
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
    link.setAttribute('download', `users-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterRole === 'all' || user.role?.name === filterRole;
      
      return matchesSearch && matchesFilter;
    });
  };

  const getUniqueRoles = () => {
    const roles = users.map(u => u.role?.name).filter(Boolean);
    return [...new Set(roles)];
  };

  const filteredUsers = getFilteredUsers();
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleCounts = () => {
    const adminCount = users.filter(u => u.role?.name === 'Admin' || u.role?.name === 'Super Admin').length;
    const activeCount = users.filter(u => u.confirmed && !u.blocked).length;
    return { adminCount, activeCount };
  };

  const { adminCount, activeCount } = getRoleCounts();

  if (loading) {
    return (
      <div className="dashboard-resource-downloads">
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-resource-downloads">
      <div className="dashboard-header">
        <div>
          <h1>Admin Users</h1>
          <p className="dashboard-subtitle">
            Manage admin panel users and permissions
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
          <button onClick={loadUsers}>Retry</button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{activeCount}</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{adminCount}</div>
          <div className="stat-label">Admins</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Roles</option>
          {getUniqueRoles().map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="downloads-table-container">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  {searchTerm || filterRole !== 'all' 
                    ? 'No users match your filters' 
                    : 'No users yet'}
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="email-cell">{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="type-badge">{user.role?.name || 'User'}</span>
                  </td>
                  <td>
                    {user.blocked ? (
                      <span style={{ color: '#dc3545' }}>Blocked</span>
                    ) : user.confirmed ? (
                      <span style={{ color: '#28a745' }}>Active</span>
                    ) : (
                      <span style={{ color: '#ffc107' }}>Pending</span>
                    )}
                  </td>
                  <td>
                    <a 
                      href={`mailto:${user.email}`}
                      className="view-link"
                      title="Send Email"
                    >
                      Email
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredUsers.length}
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

export default DashboardUsers;
