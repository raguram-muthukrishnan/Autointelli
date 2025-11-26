import { useState, useEffect } from 'react';
import './ImageSlider.css';
import img1 from '../assets/MainImages/it-operations-management.png';
import img2 from '../assets/MainImages/security-compliance.png';
import img3 from '../assets/MainImages/automation-orchestration.png';
import img4 from '../assets/MainImages/intelligent-incident-response.png';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: img1, label: 'IT Operations Management' },
    { src: img2, label: 'Security & Compliance' },
    { src: img3, label: 'Automation & Orchestration' },
    { src: img4, label: 'Intelligent Incident Response' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider-container">
      <div className="image-slider-wrapper">
        <div 
          className="image-slider" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="image-slide">
              <img src={image.src} alt={image.label} />
            </div>
          ))}
        </div>
      </div>

      <div className="slider-loaders">
        {images.map((img, index) => (
          <div key={index} className="loader-item">
            <span className="loader-label">{img.label}</span>
            <div className="loader-bar-track">
              <div 
                className={`loader-bar-fill ${index === currentIndex ? 'active' : ''}`}
                style={{ 
                  animation: index === currentIndex ? 'loading 5s linear forwards' : 'none'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
