import { useState, useEffect } from 'react';
import './ProductsPage.css';
import { productsData } from '../../data/productsData';
import CardSwap, { Card } from '../components/CardSwap';
import { getFeatureIcon } from '../components/FeatureIcons';
import FinalCta from '../components/FinalCta'; 

// Import product images
import nmsImage from '../assets/Products/nms.webp';
import opsDutyImage from '../assets/Products/opsduty.webp';
import intelliFlowImage from '../assets/Products/intelliflow.webp';
import securitaImage from '../assets/Products/securita.png';
import aliceImage from '../assets/Products/alice.png';
import intelliDeskImage from '../assets/Products/Intellidesk.png';
import assetImage from '../assets/Products/intelli_asset.png';

const ProductsPage = () => {
  // Hero animation uses these 4 images:
  // 1. nmsImage (nms.webp)
  // 2. opsDutyImage (opsduty.webp) 
  // 3. intelliFlowImage (intelliflow.webp)
  // 4. aliceImage (alice.png)
  
  // Map product IDs to their images
  const productImages = {
    'nms': nmsImage,
    'securita': securitaImage,
    'incident-response': opsDutyImage,
    'flow': intelliFlowImage,
    'alice-ai': aliceImage,
    'it-desk': intelliDeskImage,
    'asset': assetImage
  };

  const [activeSection, setActiveSection] = useState(null);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all product sections
    const sections = document.querySelectorAll('.product-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);



  return (
    <div className="products-page-container">
      {/* --- Main Page Hero with CardSwap Animation --- */}
      <header className="products-page-hero">
        {/* The content wrapper contains both text and animation */}
        <div className="hero-content-wrapper">
          {/* Text on the left */}
          <div className="hero-text-container">
            <h1 className="products-page-title">{productsData.pageHero.title}</h1>
            <p className="products-page-subtitle">{productsData.pageHero.subtitle}</p>
          </div>
          
          {/* CardSwap animation on the right */}
          <div className="hero-animation-container">
            <CardSwap
              cardDistance={30}
              verticalDistance={35}
              delay={4000}
              width={450}
              height={350}
            >
              {productsData.products.slice(0, 4).map(product => (
                <Card key={product.id}>
                  <div className="card-image-container">
                    <img 
                      src={productImages[product.id] || 'https://placehold.co/450x200/1a202c/fff?text=' + encodeURIComponent(product.name)} 
                      alt={product.name} 
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <p>{product.hero?.tagline || 'Discover powerful IT solutions'}</p>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </header>

      {/* Secondary Navbar - Sticky below hero */}
      <nav className="secondary-navbar">
        <div className="secondary-navbar-content">
          {productsData.products.map(product => (
            <a 
              key={product.id} 
              href={`#${product.id}`} 
              className={`secondary-nav-link ${activeSection === product.id ? 'active' : ''}`}
            >
              {product.name}
            </a>
          ))}
        </div>
      </nav>

      {/* --- The rest of the page remains the same --- */}
       <main className="products-list">
        {productsData.products.map((product) => (
          <section key={product.id} id={product.id} className="product-section">
            <div className="product-content-container">
              <div className="product-hero-content">
                <div className="product-text-content">
                  <h2 className="product-name">{product.name}</h2>
                  <h3 className="product-tagline">{product.hero?.headline || product.hero?.tagline || 'Advanced IT Solutions'}</h3>
                  <p className="product-description">{product.hero?.subheadline || product.intro?.solution || 'Comprehensive IT solutions designed to optimize your operations and enhance efficiency.'}</p>
                  <a href={product.slug} className="learn-more-link">Learn More</a>
                </div>
                <div className="product-image-content">
                  <img src={productImages[product.id] || 'https://placehold.co/600x450/1a202c/fff?text=' + encodeURIComponent(product.name)} alt={`${product.name} illustration`} className="product-hero-image" />
                </div>
              </div>

              <div className="product-details">
                <p className="product-summary">{product.platformOverview?.summary || product.intro?.solution || 'Discover how this powerful solution can transform your IT operations and drive business success.'}</p>
                <div className="features-grid">
                  {(product.keyFeatures?.features || []).slice(0, 4).map((feature, idx) => {
                    return (
                      <div key={idx} className="feature-card">
                        <div className="feature-icon">{getFeatureIcon(feature.title, feature.description, idx, idx === 0, product.id)}</div>
                        <h4 className="feature-title">{feature.title}</h4>
                        <p className="feature-description">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <FinalCta />
    </div>
  );
};

export default ProductsPage;

