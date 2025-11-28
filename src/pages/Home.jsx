import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SocialProofBar from '../components/SocialProofBar';
import PlatformOverview from '../components/PlatformOverview';
import MeasurableResults from '../components/MeasurableResults';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import FeaturesShowcase from '../components/FeaturesShowcase';
import WhyChooseUs from '../components/WhyChooseUs';
import AwardsRecognition from '../components/AwardsRecognition';
import IntegrationHub from '../components/IntegrationHub';
import NewsletterForm from '../components/NewsletterForm';
import FinalCta from '../components/FinalCta';
import './Home.css';

const Home = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 'platform-overview', name: 'Platform Overview' },
    { id: 'measurable-results', name: 'Results' },
    { id: 'features', name: 'Features' },
    { id: 'why-choose-us', name: 'Why Choose Us' },
    { id: 'awards', name: 'Awards' },
    { id: 'integrations', name: 'Integrations' },
    { id: 'newsletter', name: 'Newsletter' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      let currentSection = null;
      
      sectionElements.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <>
      <Hero />
      <SocialProofBar />
      
      {/* Secondary Navbar */}
      <nav className="home-secondary-navbar">
        <div className="home-secondary-navbar-content">
          {sections.map(section => (
            <a 
              key={section.id} 
              href={`#${section.id}`} 
              className={`home-secondary-nav-link ${activeSection === section.id ? 'active' : ''}`}
            >
              {section.name}
            </a>
          ))}
        </div>
      </nav>

      <div id="platform-overview" data-section>
        <PlatformOverview />
      </div>
      <div id="measurable-results" data-section>
        <MeasurableResults />
      </div>
      <div id="features" data-section>
        <FeaturesShowcase />
      </div>
      <div id="why-choose-us" data-section>
        <WhyChooseUs />
      </div>
      <div id="awards" data-section>
        <AwardsRecognition />
      </div>
      <div id="integrations" data-section>
        <IntegrationHub />
      </div>
      <section id="newsletter" data-section className="home-newsletter-section" style={{ background: '#FFFFFF', padding: 0, margin: 0 }}>
        <NewsletterForm 
          categories={['all']}
          title="Get monthly shortcuts to enhance your IT Ops productivity — No Fluffs."
          subtitle="Autointelli Community only insights not published anywhere else."
          horizontal={true}
        />
      </section>
      <FinalCta />
    </>
  );
};

export default Home;
