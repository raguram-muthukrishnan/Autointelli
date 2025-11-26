import { Link, Outlet, useNavigate } from 'react-router-dom';
import './admin.css';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
          
          <div className="nav-section-label">Content</div>
          <Link to="/admin/dashboard/blogs" className="nav-link">
            Blogs
          </Link>
          <Link to="/admin/dashboard/webinars-events" className="nav-link">
            Webinars & Events
          </Link>
          <Link to="/admin/dashboard/resources" className="nav-link">
            Resources
          </Link>

          <div className="nav-section-label">Company</div>
          <Link to="/admin/dashboard/careers" className="nav-link">
            Careers
          </Link>

          <div className="nav-section-label">Inbound</div>
          <Link to="/admin/dashboard/applications" className="nav-link">
            Job Applications
          </Link>
          <Link to="/admin/dashboard/inquiries" className="nav-link">
            Contact Inquiries
          </Link>
          <Link to="/admin/dashboard/partner-requests" className="nav-link">
            Partner Requests
          </Link>
          <Link to="/admin/dashboard/newsletter" className="nav-link">
            Newsletter Subscribers
          </Link>

          <div className="nav-section-label">Analytics</div>
          <Link to="/admin/dashboard/visitors" className="nav-link">
            Visitor Analytics
          </Link>
          <Link to="/admin/dashboard/resource-downloads" className="nav-link">
            Resource Downloads
          </Link>

          <div className="nav-section-label">System</div>
          <Link to="/admin/dashboard/users" className="nav-link">
            Admin Users
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
