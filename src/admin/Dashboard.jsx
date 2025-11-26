import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBlogs, fetchWebinars, fetchEvents } from '../api';
import './admin.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    webinars: 0,
    events: 0,
    careers: 0,
    applications: 0,
    inquiries: 0,
    loading: true
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [blogsData, webinarsData, eventsData] = await Promise.all([
          fetchBlogs().catch(() => ({ data: [] })),
          fetchWebinars().catch(() => ({ data: [] })),
          fetchEvents().catch(() => ({ data: [] }))
        ]);

        const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        
        // Fetch careers and applications (may not exist yet)
        let careersCount = 0;
        let applicationsCount = 0;
        
        try {
          const jwt = localStorage.getItem('jwt');
          const headers = jwt ? { 'Authorization': `Bearer ${jwt}` } : {};
          
          const careersRes = await fetch(`${STRAPI_URL}/api/jobs?populate=*`, { headers });
          if (careersRes.ok) {
            const careersData = await careersRes.json();
            careersCount = careersData.data?.length || 0;
          }
          // 404 is expected if content type doesn't exist yet
        } catch (err) {
          // Silently handle - content type may not exist yet
        }

        try {
          const jwt = localStorage.getItem('jwt');
          const headers = jwt ? { 'Authorization': `Bearer ${jwt}` } : {};
          
          const applicationsRes = await fetch(`${STRAPI_URL}/api/job-applications?populate=*`, { headers });
          if (applicationsRes.ok) {
            const applicationsData = await applicationsRes.json();
            applicationsCount = applicationsData.data?.length || 0;
          }
          // 404 is expected if content type doesn't exist yet
        } catch (err) {
          // Silently handle - content type may not exist yet
        }

        let inquiriesCount = 0;
        try {
          const jwt = localStorage.getItem('jwt');
          const headers = jwt ? { 'Authorization': `Bearer ${jwt}` } : {};
          
          const inquiriesRes = await fetch(`${STRAPI_URL}/api/cta-inquiries?populate=*`, { headers });
          if (inquiriesRes.ok) {
            const inquiriesData = await inquiriesRes.json();
            inquiriesCount = inquiriesData.data?.length || 0;
          }
        } catch (err) {
          // Silently handle - content type may not exist yet
        }
        
        setStats(prev => ({
          ...prev,
          blogs: blogsData.data?.length || 0,
          webinars: webinarsData.data?.length || 0,
          events: eventsData.data?.length || 0,
          careers: careersCount,
          applications: applicationsCount,
          inquiries: inquiriesCount,
          loading: false
        }));
      } catch (err) {
        console.error('Error loading stats:', err);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const StatCard = ({ to, title, count, color, icon }) => (
    <Link to={to} className={`bento-box ${color}`}>
      <div className="bento-content">
        <div className="bento-icon">
          {icon}
        </div>
        <div className="bento-stats">
          <h3>{stats.loading ? '...' : count}</h3>
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="modern-dashboard">
      {/* Header Section */}
      <div className="dashboard-header-section">
        <div className="dashboard-welcome">
          <h1>Hi, Admin</h1>
          <p>Ready to start your day managing content?</p>
          <span className="dashboard-date">{currentDate}</span>
        </div>
        <div className="dashboard-illustration">
          <img src="/src/assets/logo.png" alt="Autointelli Logo" className="dashboard-logo" />
        </div>
      </div>

      {/* Content Overview */}
      <h2 className="section-title">Content Overview</h2>
      <div className="bento-grid">
        <StatCard 
          to="/admin/dashboard/blogs" 
          title="Blogs" 
          count={stats.blogs} 
          color="bento-yellow"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          }
        />
        <StatCard 
          to="/admin/dashboard/webinars-events" 
          title="Webinars" 
          count={stats.webinars} 
          color="bento-purple"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          }
        />
        <StatCard 
          to="/admin/dashboard/webinars-events" 
          title="Events" 
          count={stats.events} 
          color="bento-pink"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }
        />
      </div>

      {/* Company & Inbound */}
      <h2 className="section-title" style={{marginTop: '30px'}}>Company & Inbound</h2>
      <div className="bento-grid">
        <StatCard 
          to="/admin/dashboard/careers" 
          title="Open Jobs" 
          count={stats.careers} 
          color="bento-pink"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          }
        />
        <StatCard 
          to="/admin/dashboard/applications" 
          title="Applications" 
          count={stats.applications} 
          color="bento-purple"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          }
        />
        <StatCard 
          to="/admin/dashboard/inquiries" 
          title="Inquiries" 
          count={stats.inquiries} 
          color="bento-yellow"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-bento">
          <Link to="/admin/dashboard/blogs" className="action-box action-blog">
            <div className="action-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div className="action-details">
              <h3 style={{ fontSize: '1rem' }}>Create New Blog</h3>
              <p style={{ fontSize: '0.85rem' }}>Write and publish a new blog post for your audience.</p>
            </div>
            <div className="action-buttons">
              <button className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
          </Link>

          <Link to="/admin/dashboard/careers" className="action-box action-webinar">
            <div className="action-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div className="action-details">
              <h3 style={{ fontSize: '1rem' }}>Post New Job</h3>
              <p style={{ fontSize: '0.85rem' }}>Create and publish a new job opening.</p>
            </div>
            <div className="action-buttons">
              <button className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
