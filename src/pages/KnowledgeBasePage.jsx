import { useState } from 'react';
import { FiSearch, FiChevronRight, FiBook } from 'react-icons/fi';
import './KnowledgeBasePage.css';
import { knowledgeBaseData } from '../../data/knowledgeBaseData.jsx';

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Filter articles based on search
  const filteredSections = knowledgeBaseData.sections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  const handleArticleClick = (section, article) => {
    setSelectedSection(section);
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    setSelectedSection(null);
  };

  return (
    <div className="kb-page">
      {/* Hero Section */}
      <section className="kb-hero">
        <div className="kb-hero-content">
          <FiBook className="kb-hero-icon" />
          <h1>{knowledgeBaseData.pageTitle}</h1>
          <p>{knowledgeBaseData.pageSubtitle}</p>
          
          {/* Search Bar */}
          <div className="kb-search-container">
            <FiSearch className="kb-search-icon" />
            <input
              type="text"
              placeholder="Search for articles, guides, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="kb-search-input"
            />
          </div>
        </div>
      </section>

      <div className="kb-main-container">
        {selectedArticle ? (
          /* Article Detail View */
          <div className="kb-article-detail">
            <button onClick={handleBackToList} className="kb-back-button">
              ← Back to Knowledge Base
            </button>
            
            <div className="kb-article-header">
              <span className="kb-article-category" style={{ backgroundColor: selectedSection.color }}>
                {selectedSection.title}
              </span>
              <h1>{selectedArticle.title}</h1>
              <p className="kb-article-description">{selectedArticle.description}</p>
            </div>

            <div className="kb-article-content">
              <p>{selectedArticle.content}</p>
              
              {/* Placeholder for more content */}
              <div className="kb-article-body">
                <h2>Overview</h2>
                <p>This article provides comprehensive information about {selectedArticle.title.toLowerCase()}. Follow the steps and guidelines below to successfully implement this in your environment.</p>
                
                <h2>Prerequisites</h2>
                <ul>
                  <li>Access to Autointelli dashboard</li>
                  <li>Appropriate user permissions</li>
                  <li>Basic understanding of IT operations</li>
                </ul>

                <h2>Step-by-Step Guide</h2>
                <p>Detailed instructions will be provided here based on the specific topic.</p>

                <h2>Best Practices</h2>
                <ul>
                  <li>Always test in a non-production environment first</li>
                  <li>Document your configurations</li>
                  <li>Follow security guidelines</li>
                  <li>Monitor the results after implementation</li>
                </ul>

                <h2>Troubleshooting</h2>
                <p>If you encounter issues, check the following:</p>
                <ul>
                  <li>Verify all prerequisites are met</li>
                  <li>Check system logs for error messages</li>
                  <li>Ensure network connectivity</li>
                  <li>Contact support if the issue persists</li>
                </ul>

                <h2>Related Articles</h2>
                <div className="kb-related-articles">
                  {selectedSection.articles
                    .filter(a => a.id !== selectedArticle.id)
                    .slice(0, 3)
                    .map(article => (
                      <div
                        key={article.id}
                        className="kb-related-card"
                        onClick={() => handleArticleClick(selectedSection, article)}
                      >
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Sections Grid View */
          <div className="kb-sections-container">
            {filteredSections.length === 0 ? (
              <div className="kb-no-results">
                <p>No articles found matching "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className="kb-clear-search">
                  Clear Search
                </button>
              </div>
            ) : (
              filteredSections.map((section) => (
                <div key={section.id} className="kb-section">
                  <div className="kb-section-header">
                    <h2>{section.title}</h2>
                    <span className="kb-article-count">{section.articles.length} articles</span>
                  </div>

                  <div className="kb-articles-list">
                    {section.articles.map((article) => (
                      <div
                        key={article.id}
                        className="kb-article-card"
                        onClick={() => handleArticleClick(section, article)}
                      >
                        <div className="kb-article-card-content">
                          <h3>{article.title}</h3>
                          <p>{article.description}</p>
                        </div>
                        <FiChevronRight className="kb-article-arrow" />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Help CTA */}
      {!selectedArticle && (
        <section className="kb-help-cta">
          <h2>Still need help?</h2>
          <p>Can't find what you're looking for? Our support team is here to help.</p>
          <a href="/contact" className="kb-contact-button">
            Contact Support
          </a>
        </section>
      )}
    </div>
  );
};

export default KnowledgeBasePage;
