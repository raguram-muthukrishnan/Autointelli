import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { buildImageUrl } from '../utils/imageUtils';
import './BlogDetailPage.css';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        setLoading(true);
        
        const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        
        // Fetch all blogs
        const res = await axios.get(`${STRAPI_URL}/api/blogs?populate=*`);
        const allBlogs = res.data.data;

        // Find the current blog by slug or id
        const currentBlog = allBlogs.find(item => {
          const attr = item.attributes || item;
          return attr.slug === slug || item.id.toString() === slug;
        });

        if (!currentBlog) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }

        const attr = currentBlog.attributes || currentBlog;
        const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"%3E%3Crect fill="%23f0f0f0" width="1200" height="600"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="48" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EBlog Post%3C/text%3E%3C/svg%3E';

        const formattedBlog = {
          id: currentBlog.id,
          title: attr.title,
          category: attr.category,
          date: attr.date,
          readTime: attr.readTime,
          excerpt: attr.excerpt,
          description: attr.description,
          author: attr.author || 'Autointelli Team',
          image: buildImageUrl(attr.image, placeholderImage),
        };

        setBlog(formattedBlog);

        // Get related posts (same category, exclude current)
        const related = allBlogs
          .filter(item => {
            const itemAttr = item.attributes || item;
            return itemAttr.category === attr.category && item.id !== currentBlog.id;
          })
          .slice(0, 3)
          .map(item => {
            const itemAttr = item.attributes || item;
            return {
              id: item.id,
              slug: itemAttr.slug || item.id,
              title: itemAttr.title,
              category: itemAttr.category,
              date: itemAttr.date,
              readTime: itemAttr.readTime,
              excerpt: itemAttr.excerpt,
              image: buildImageUrl(itemAttr.image, placeholderImage),
            };
          });

        setRelatedPosts(related);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-container">
        <div className="error-container">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2>{error || 'Blog post not found'}</h2>
          <Link to="/blog" className="back-link">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-nav">
        <Link to="/blog" className="breadcrumb-link">Blog</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{blog.title}</span>
      </div>

      {/* Article Header */}
      <article className="blog-article">
        <header className="article-header">
          <div className="article-meta">
            <span className="category-badge">{blog.category}</span>
            <span className="meta-divider">•</span>
            <span className="meta-text">{blog.date}</span>
            <span className="meta-divider">•</span>
            <span className="meta-text">{blog.readTime}</span>
          </div>
          
          <h1 className="article-title">{blog.title}</h1>
          
          {blog.excerpt && (
            <p className="article-excerpt">{blog.excerpt}</p>
          )}

          <div className="article-author">
            <div className="author-avatar-large">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div className="author-details">
              <div className="author-name">{blog.author}</div>
              <div className="author-role">Content Writer</div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="article-image-wrapper">
          <img src={blog.image} alt={blog.title} className="article-image" />
        </div>

        {/* Article Content */}
        <div className="article-content">
          {blog.description && blog.description.length > 0 ? (
            <BlocksRenderer content={blog.description} />
          ) : (
            <p>No content available for this article.</p>
          )}
        </div>

        {/* Article Footer */}
        <footer className="article-footer">
          <div className="article-tags">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span className="tag-item">{blog.category}</span>
          </div>

          <div className="share-section">
            <span className="share-label">Share:</span>
            <div className="share-buttons">
              <button className="share-btn" title="Share on Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </button>
              <button className="share-btn" title="Share on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </button>
              <button className="share-btn" title="Share on Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </button>
              <button className="share-btn" title="Copy Link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-section">
          <div className="section-header">
            <h2 className="section-title">Related Articles</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="related-grid">
            {relatedPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="related-card">
                <div className="related-image-wrapper">
                  <img src={post.image} alt={post.title} className="related-image" />
                  <div className="related-overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
                <div className="related-content">
                  <div className="related-meta">
                    <span className="category-badge small">{post.category}</span>
                    <span className="meta-text small">{post.readTime}</span>
                  </div>
                  <h3 className="related-title">{post.title}</h3>
                  <p className="related-excerpt">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your IT Operations?</h2>
          <p className="cta-subtitle">
            Discover how Autointelli can help you automate and optimize your IT infrastructure
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-btn primary">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link to="/blog" className="cta-btn secondary">
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
