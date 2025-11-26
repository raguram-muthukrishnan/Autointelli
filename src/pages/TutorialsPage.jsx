import { useState } from 'react';
import { FiPlay, FiYoutube, FiFilter, FiZap, FiBook, FiSettings } from 'react-icons/fi';
import './TutorialsPage.css';
import { tutorialsData } from '../../data/tutorialsData.jsx';

// Category icon mapping
const categoryIcons = {
  'getting-started': <FiBook />,
  'advanced': <FiZap />,
  'integrations': <FiSettings />
};

const TutorialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter videos by category
  const filteredVideos = selectedCategory === 'all' 
    ? tutorialsData.videos 
    : tutorialsData.videos.filter(video => video.category === selectedCategory);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="tutorials-page">
      {/* Hero Section */}
      <section className="tutorials-hero">
        <div className="tutorials-hero-content">
          <FiYoutube className="tutorials-hero-icon" />
          <h1>{tutorialsData.pageTitle}</h1>
          <p>{tutorialsData.pageSubtitle}</p>
          
          <a 
            href={tutorialsData.channelLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="youtube-channel-link"
          >
            Subscribe to Our YouTube Channel
          </a>
        </div>
      </section>

      <div className="tutorials-main-container">
        {selectedVideo ? (
          /* Video Player View */
          <div className="video-detail-view">
            <button onClick={handleBackToList} className="tutorials-back-button">
              ← Back to Tutorials
            </button>

            <div className="video-player-container">
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
              </div>
            </div>

            <div className="video-info">
              <div className="video-category-badge" style={{ 
                backgroundColor: tutorialsData.categories.find(c => c.id === selectedVideo.category)?.color 
              }}>
                {tutorialsData.categories.find(c => c.id === selectedVideo.category)?.title}
              </div>
              
              <h1>{selectedVideo.title}</h1>
              <p className="video-description">{selectedVideo.description}</p>
              
              <div className="video-meta">
                <span className="video-duration">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                  </svg>
                  {selectedVideo.duration}
                </span>
                <div className="video-tags">
                  {selectedVideo.tags.map((tag, index) => (
                    <span key={index} className="video-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <a 
                href={selectedVideo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="watch-on-youtube"
              >
                <FiYoutube />
                Watch on YouTube
              </a>
            </div>

            {/* Related Videos */}
            <div className="related-videos">
              <h2>More Tutorials</h2>
              <div className="related-videos-grid">
                {tutorialsData.videos
                  .filter(v => v.id !== selectedVideo.id && v.category === selectedVideo.category)
                  .slice(0, 3)
                  .map(video => (
                    <div
                      key={video.id}
                      className="related-video-card"
                      onClick={() => handleVideoClick(video)}
                    >
                      <div className="related-video-thumbnail">
                        <img 
                          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                          alt={video.title}
                        />
                        <div className="play-overlay">
                          <FiPlay />
                        </div>
                      </div>
                      <div className="related-video-info">
                        <h4>{video.title}</h4>
                        <span className="related-video-duration">{video.duration}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          /* Tutorials Grid View */
          <>
            {/* Category Filter */}
            <div className="tutorials-filter-section">
              <div className="filter-header">
                <FiFilter />
                <span>Filter by Category</span>
              </div>
              <div className="category-filters">
                <button
                  className={`category-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Tutorials ({tutorialsData.videos.length})
                </button>
                {tutorialsData.categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{ 
                      borderColor: selectedCategory === category.id ? category.color : 'transparent',
                      backgroundColor: selectedCategory === category.id ? `${category.color}20` : 'transparent'
                    }}
                  >
                    {category.title} ({tutorialsData.videos.filter(v => v.category === category.id).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Overview */}
            {selectedCategory === 'all' && (
              <div className="categories-overview">
                {tutorialsData.categories.map(category => (
                  <div key={category.id} className="category-overview-card">
                    <div className="category-icon" style={{ backgroundColor: category.color }}>
                      {categoryIcons[category.id]}
                    </div>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <button 
                      className="view-category-btn"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      View Tutorials
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Videos Grid */}
            <div className="tutorials-grid">
              {filteredVideos.map(video => (
                <div
                  key={video.id}
                  className="tutorial-card"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="tutorial-thumbnail">
                    <img 
                      src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                      alt={video.title}
                    />
                    <div className="play-overlay">
                      <FiPlay />
                    </div>
                    <span className="video-duration-badge">{video.duration}</span>
                  </div>
                  
                  <div className="tutorial-content">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <div className="tutorial-tags">
                      {video.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      {!selectedVideo && (
        <section className="tutorials-cta">
          <h2>Want to Learn More?</h2>
          <p>Subscribe to our YouTube channel for the latest tutorials and product updates</p>
          <a 
            href={tutorialsData.channelLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-youtube-button"
          >
            <FiYoutube />
            Visit Our YouTube Channel
          </a>
        </section>
      )}
    </div>
  );
};

export default TutorialsPage;
