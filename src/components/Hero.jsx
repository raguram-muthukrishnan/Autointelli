import { useState, useRef, useEffect } from 'react';
import './Hero.css';
import laptopImage from '../assets/Laptop.png';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiX } from 'react-icons/fi';

export default function Hero() {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef(null);
  const videoRef = useRef(null);
  
  // YouTube video ID - replace with your actual video ID
  const videoId = 'KWC6-iVFpKQ';

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy load background video
  useEffect(() => {
    if (isMobile || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoLoaded) {
            const video = videoRef.current;
            if (video) {
              video.load();
              setIsVideoLoaded(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isMobile, isVideoLoaded]);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Listen for video end event
  useEffect(() => {
    if (!isVideoModalOpen) return;

    const handleMessage = (event) => {
      // YouTube iframe API sends messages
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          // Check if video ended (state 0 = ended)
          if (data.event === 'onStateChange' && data.info === 0) {
            setTimeout(() => {
              closeVideoModal();
            }, 1000); // Close after 1 second when video ends
          }
        } catch (e) {
          // Not a JSON message, ignore
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isVideoModalOpen]);

  return (
    <>
      <div className="hero-container" data-name="hero section">
        {/* Background video overlay - only on desktop */}
        {!isMobile && (
          <div className="hero-video-overlay">
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="none"
              className="hero-background-video"
              poster="/images/hero-poster.jpg"
            >
              <source src="/videos/hero-background.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        <div className="hero-content">
          <h1 className="hero-title">
            MASTER YOUR INCIDENTS:<br />
            TAKE CONTROL OF YOUR IT<br />
            OPERATIONS
          </h1>
          <p className="hero-subtitle">
            SAY "NO" TO APPLICATION DOWNTIME WITH AUTOINTELLI'S REAL TIME OBSERVABILITY PLATFORM
          </p>
          
          <div className="hero-button-set">
            <Button 
              onClick={() => navigate('/contact')}
              className="hero-primary-button"
              size="lg"
            >
              GET STARTED
            </Button>
            
            <Button 
              onClick={() => navigate('/contact')}
              variant="outline"
              className="hero-secondary-button"
              size="lg"
            >
              TALK TO SALES
            </Button>
          </div>

          {/* Mobile Video Link */}
          <button 
            className="hero-mobile-video-link"
            onClick={openVideoModal}
          >
            <FiPlay />
            <span>Watch Our Product Demo</span>
          </button>
        </div>

        <div className="hero-laptop-image">
          <img 
            alt="Laptop showing dashboard" 
            src={laptopImage}
            loading="lazy"
            decoding="async"
          />
          <button 
            className="hero-play-button"
            onClick={openVideoModal}
            aria-label="Play video"
          >
            <FiPlay />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="hero-video-modal" onClick={closeVideoModal}>
          <button 
            className="hero-video-close"
            onClick={closeVideoModal}
            aria-label="Close video"
          >
            <FiX />
          </button>
          <div className="hero-video-wrapper" onClick={(e) => e.stopPropagation()}>
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`}
              title="Autointelli Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

