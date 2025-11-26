import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { buildImageUrl } from "../utils/imageUtils";
import NewsletterForm from "../components/NewsletterForm";
import Pagination from "../components/Pagination";
import "./BlogPage.css";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
        const res = await axios.get(`${STRAPI_URL}/api/blogs?populate=*`);
        
        console.log('Fetched blogs:', res.data.data.length);

        const formatted = res.data.data.map((item) => {
          const attr = item.attributes || item;
          
          // Use data URI placeholder
          const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect fill="%23f0f0f0" width="800" height="500"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="36" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EBlog Post%3C/text%3E%3C/svg%3E';

          return {
            id: item.id,
            documentId: item.documentId,
            slug: attr.slug || item.id,
            title: attr.title,
            category: attr.category,
            date: attr.date,
            readTime: attr.readTime,
            excerpt: attr.excerpt,
            featured: attr.featured,
            description: attr.description,
            author: attr.author || "Autointelli Team",
            image: buildImageUrl(attr.image, placeholderImage),
          };
        });

        setBlogPosts(formatted);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Sort all blogs by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="blog-page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page-container">
      {/* Hero Header */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Autointelli Blog</h1>
          <p className="blog-hero-subtitle">
            Insights, best practices, and updates from the world of IT operations and automation
          </p>
          <div className="blog-stats">
            <div className="stat-item">
              <span className="stat-number">{blogPosts.length}</span>
              <span className="stat-label">Articles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-content-wrapper">
        {/* Blog Grid - All Posts */}
        {sortedPosts.length > 0 ? (
          <>
            <section className="blog-grid">
              {currentPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card">
                <div className="blog-card-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-card-image" />
                  <div className="blog-card-overlay">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="category-badge small">{post.category}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-text small">{post.date}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="author-info small">
                      <div className="author-avatar small">
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="author-name">{post.author}</span>
                    </div>
                    <span className="read-time-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
        ) : (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <h3>No blog posts yet</h3>
            <p>Check back soon for new articles and insights</p>
          </div>
        )}

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h2 className="newsletter-title">Stay in the Loop</h2>
            <p className="newsletter-subtitle">Get the latest insights, tips, and product updates delivered straight to your inbox</p>
            <NewsletterForm 
              categories={['blog', 'all']}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
