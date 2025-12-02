import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../../data/productsData';
import { getProductColors, getProductCSSVars } from '../config/productColors';
import DotGrid from '../components/DotGrid';
import './ProductDetailPage.css';
import './ProductDetailPageTheme.css';

// Import stock images
import databaseMonitoring from '../assets/stockimages/database-monitoring.png';
import bandwidthMonitoring from '../assets/stockimages/bandwidth-monitoring.png';
import cloudMonitoring from '../assets/stockimages/cloud-monitoring.png';
import hypervisorMonitoring from '../assets/stockimages/hypervisor-monitoring.png';
import serviceMonitoring from '../assets/stockimages/service-monitoring.png';
import orchestration from '../assets/stockimages/orchestration.png';
import ticketingSystem from '../assets/stockimages/ticketing-system-automation.png';
import ir1 from '../assets/stockimages/ir1.png';
import ir2 from '../assets/stockimages/ir2.png';
import ir3 from '../assets/stockimages/ir3.png';

// A custom hook for the animated counter
const useCountUp = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / (duration * 1000), 1);
            setCount(parseFloat((progress * end).toFixed(2)));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
};


const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = productsData.products.find(p => p.id === productId);

  const [activeTab, setActiveTab] = useState(0);

  // Get product colors from centralized configuration
  const colors = getProductColors(productId);
  const cssVars = getProductCSSVars(productId);

  // Apply CSS custom properties to the component
  // Using a ref to apply styles directly to the component instead of document root
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      // Apply CSS variables directly to the component
      Object.entries(cssVars).forEach(([key, value]) => {
        pageRef.current.style.setProperty(key, value);
      });
    }
  }, [productId, cssVars]);

  // Stock images array for random selection
  const stockImages = [
    databaseMonitoring,
    bandwidthMonitoring,
    cloudMonitoring,
    hypervisorMonitoring,
    serviceMonitoring,
    orchestration,
    ticketingSystem,
    ir1,
    ir2,
    ir3
  ];

  // Get random stock image
  const getRandomStockImage = (index) => {
    return stockImages[index % stockImages.length];
  };

  // Load GSAP for hover animations
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.gsap) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products">← Back to All Products</Link>
      </div>
    );
  }

  const StatCounter = ({ value, unit, label }) => {
    const { count, ref } = useCountUp(value);
    const displayValue = Math.min(count, value);
    return (
      <div className="roi-stat" ref={ref}>
        <span className="roi-value">{displayValue}{unit}</span>
        <span className="roi-label">{label}</span>
      </div>
    );
  };

  // GSAP hover effect for bento cards
  const handleCardHover = (card, isEntering) => {
    const glow = card.querySelector('.bento-glow');
    const image = card.querySelector('.bento-card-image');
    const content = card.querySelector('.bento-card-content');
    
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      if (isEntering) {
        gsap.to(glow, {
          opacity: 1,
          scale: 1.1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: 'power2.out'
        });
        gsap.to(content, {
          y: -5,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.in'
        });
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: 'power2.in'
        });
        gsap.to(content, {
          y: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  };

  return (
    <div ref={pageRef} className={`product-detail-page product-${productId}`}>
      {/* 1. HERO SECTION - Now checks if 'hero' data exists */}
      {product.hero && (
        <header className="pdp-hero">
          {/* DotGrid Background */}
          <div className="pdp-hero-background">
            <DotGrid
              dotSize={6}
              gap={19}
              baseColor={colors.dotColor}
              activeColor={colors.primary}
              proximity={290}
              shockRadius={250}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}
            />
          </div>
          
          {/* Hero Content */}
          <div className="pdp-hero-content">
            <div className="pdp-hero-text">
              <h1 className="pdp-hero-headline">{product.hero.headline}</h1>
              <p className="pdp-hero-subheadline">{product.hero.subheadline}</p>
              <div className="pdp-hero-ctas">
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button className="pdp-cta-primary">{product.hero.ctaPrimary}</button>
                </Link>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button className="pdp-cta-secondary">{product.hero.ctaSecondary}</button>
                </Link>
              </div>
            </div>
            <div className="pdp-hero-image-container">
              <img src={product.hero.image} alt={product.name} className="pdp-hero-image" />
            </div>
          </div>
          {product.hero.microStats && product.hero.microStats.length > 0 && (
            <div className="pdp-hero-stats">
              {product.hero.microStats.map(stat => (
                <div key={stat.label} className="pdp-micro-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </header>
      )}

      <main className="pdp-main-content">
        {/* 2. INTRO SECTION - Now checks if 'intro' data exists */}
        {product.intro && (
          <section className="pdp-section pdp-intro">
            <div className="pdp-intro-wrapper">
              {/* Problem Card */}
              <div className="pdp-intro-card problem-card">
                <div className="card-content-wrapper">
                  <div className="card-text-section">
                    <div className="card-header">
                      <div className="card-icon problem-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="card-title">The Challenge</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-description">{product.intro.problem}</p>
                    </div>
                  </div>
                  <div className="card-image-section">
                    <img 
                      src={product.intro.problemImage || getRandomStockImage(0)}
                      alt="The Challenge" 
                      className="card-image"
                    />
                  </div>
                </div>
              </div>

              {/* Connector */}


              {/* Solution Card */}
              <div className="pdp-intro-card solution-card">
                <div className="card-content-wrapper">
                  <div className="card-image-section">
                    <img 
                      src={product.intro.solutionImage || getRandomStockImage(1)}
                      alt="The Solution" 
                      className="card-image"
                    />
                  </div>
                  <div className="card-text-section">
                    <div className="card-header">
                      <div className="card-icon solution-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="card-title">The Solution</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-description">{product.intro.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* 6. KEY FEATURES SECTION - Bento Box Layout */}
        {product.keyFeatures && product.keyFeatures.features && (
          <section className="pdp-section pdp-features-bento">
            <h2 className="pdp-section-title">{product.keyFeatures.headline}</h2>
            <div className="bento-grid">
              {product.keyFeatures.features.map((feature, index) => {
                // Determine card size based on index (creating variety)
                const cardClass = index === 0 || index === 3 ? 'bento-card bento-large' : 'bento-card bento-small';
                const textPosition = index % 2 === 0 ? 'text-bottom' : 'text-top';
                
                return (
                  <div 
                    key={index} 
                    className={`${cardClass} ${textPosition}`}
                    onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
                    onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
                  >
                    <div className="bento-card-bg">
                      {/* Placeholder for future reference:
                      <img src={`https://placehold.co/800x600/1a202c/${colors.primary.replace('#', '')}?text=${encodeURIComponent(feature.title)}`} alt={feature.title} className="bento-card-image" />
                      */}
                      <img 
                        src={getRandomStockImage(index + 2)}
                        alt={feature.title}
                        className="bento-card-image"
                      />
                      <div className="bento-card-overlay"></div>
                    </div>
                    <div className="bento-card-content">
                      <h3 className="bento-card-title">{feature.title}</h3>
                      <p className="bento-card-description">{feature.description}</p>
                    </div>
                    <div className="bento-glow"></div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        
         {/* 7. BENEFITS BY ROLE - Card-based Layout */}
        {product.benefitsByRole && product.benefitsByRole.roles && (
          <section className="pdp-section pdp-benefits-section">
            <div className="pdp-benefits-header">
              <span className="pdp-benefits-tag">Features Services</span>
              <h2 className="pdp-section-title">{product.benefitsByRole.headline}</h2>
            </div>
            <div 
              className="pdp-benefits-grid"
              style={{
                justifyContent: product.benefitsByRole.roles.length % 2 !== 0 ? 'center' : 'flex-start'
              }}
            >
              {product.benefitsByRole.roles.map((role, index) => (
                <div 
                  key={index} 
                  className="benefit-card"
                  onMouseEnter={(e) => {
                    if (typeof window !== 'undefined' && window.gsap) {
                      window.gsap.to(e.currentTarget, {
                        y: -8,
                        boxShadow: '0 20px 40px rgba(240, 206, 29, 0.15)',
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof window !== 'undefined' && window.gsap) {
                      window.gsap.to(e.currentTarget, {
                        y: 0,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        duration: 0.3,
                        ease: 'power2.in'
                      });
                    }
                  }}
                >
                  <div className="benefit-card-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="#2e3591" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12l2 2 4-4" stroke="#2e3591" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="benefit-card-title">{role.name}</h3>
                  <p className="benefit-card-subtitle">{role.benefit}</p>
                  <ul className="benefit-card-list">
                    {role.points.slice(0, 3).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. ROI SECTION - Now checks if 'roi' data exists */}
        {product.roi && product.roi.stats && (
            <section className="pdp-section pdp-roi alternate-bg">
                <h2 className="pdp-section-title">{product.roi.headline}</h2>
                <div className="pdp-roi-grid">
                    {product.roi.stats.map(stat => (
                        <StatCounter key={stat.label} value={stat.value} unit={stat.unit} label={stat.label} />
                    ))}
                </div>
            </section>
        )}
        
        {/* 13. FINAL CTA - Now checks if 'finalCta' data exists */}
        {product.finalCta && product.finalCta.buttons && (
          <section className="pdp-section pdp-final-cta">
            <div className="pdp-cta-container">
              {/* Left Side - Single Image */}
              <div className="pdp-cta-left">
                <div className="pdp-cta-image-wrapper">
                  {/* Placeholder for future reference:
                  <img src={`https://placehold.co/600x700/${colors.primary.replace('#', '')}/ffffff?text=Product+Illustration`} alt={product.finalCta.headline} className="pdp-cta-image" />
                  */}
                  <img 
                    src={getRandomStockImage(9)}
                    alt={product.finalCta.headline} 
                    className="pdp-cta-image"
                  />
                </div>
              </div>

              {/* Right Side - CTA Content */}
              <div className="pdp-cta-right">
                <div className="pdp-cta-content">
                  <h2>{product.finalCta.headline}</h2>
                  <p className="pdp-cta-description">
                    {product.finalCta.subheadline}
                  </p>

                  <div className="pdp-final-cta-buttons">
                    {product.finalCta.buttons.map(button => (
                      <Link to="/contact" key={button.text} style={{ textDecoration: 'none' }}>
                        <button className={`pdp-cta-btn-${button.type}`}>
                          {button.text}
                        </button>
                      </Link>
                    ))}
                  </div>

                  <p className="pdp-cta-footer-text">
                    Join over <strong>100+ companies</strong> already using our platform
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductDetailPage;

