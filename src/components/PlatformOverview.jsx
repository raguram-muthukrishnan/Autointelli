import './PlatformOverview.css';
import { Button } from './ui/button';
import { RefreshCw, Zap, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import aiCustomerOps from '../assets/MainImages/ai-powered-customer-operations-suite.png';
import itOpsManagement from '../assets/MainImages/it-operations-management.png';
import itOpsManagementV2 from '../assets/MainImages/it-operations-management-suitev2.png';
import securityCompliance from '../assets/MainImages/security-compliance.png';
import automationOrchestration from '../assets/MainImages/automation-orchestration.png';
import unifiedAccess from '../assets/MainImages/unified-access-portal.png';
import customizableCommand from '../assets/MainImages/customizable-command-center.png';
import customizableCommandV2 from '../assets/MainImages/customizable-command-center-v2.png';

const automationFeatures = [
  {
    icon: RefreshCw,
    title: 'Intelligent Runbooks',
    description: 'Automate resolutions, approvals, and delivery workflows using intelligent runbooks'
  },
  {
    icon: Zap,
    title: 'Event Correlation',
    description: 'Streamline IT operations with automated event correlation and response'
  },
  {
    icon: Target,
    title: 'Smart Orchestration',
    description: 'Orchestrate complex workflows across multiple systems seamlessly'
  }
];

const features = [
  {
    title: 'AI-powered customer operations suite',
    description: 'Lower agent costs while scaling efficient support. Maintain exceptional customer experiences as you grow.',
    image: aiCustomerOps,
    gradient: 'purple',
    type: 'simple'
  },
  {
    title: 'IT Operations Management Suite',
    description: 'Orchestrate observability, optimize capacity, and improve performance with a unified digital command center.',
    image: itOpsManagement,
    gradient: 'dark',
    type: 'simple'
  },
  {
    title: 'Security & Compliance',
    description: 'Enable proactive threat detection, automated compliance reporting, and robust governance for secure IT environments.',
    image: securityCompliance,
    gradient: 'dark',
    type: 'simple'
  },
  {
    title: 'Automation & Orchestration',
    description: 'Automate resolutions, approvals, and delivery workflows using intelligent runbooks. Streamline IT operations for efficiency.',
    image: automationOrchestration,
    gradient: 'dark',
    type: 'scanner'
  },
  {
    title: 'Unified Access Portal',
    description: 'Log in for centralized management of observability, security, and automation from one hub.',
    image: unifiedAccess,
    gradient: 'dark',
    type: 'simple'
  },
  {
    title: 'Customizable Command Center',
    description: 'Instantly switch visual themes to match your IT operations style and branding.',
    image: customizableCommand,
    gradient: 'purple',
    type: 'simple'
  }
];

const PlatformOverview = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 992);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the appropriate image based on screen size
  const getFeatureImage = (index) => {
    if (index === 1) { // Card 2 (IT Operations Management)
      return isDesktop ? itOpsManagementV2 : itOpsManagement;
    }
    if (index === 5) { // Card 6 (Customizable Command Center)
      return isDesktop ? customizableCommandV2 : customizableCommand;
    }
    return features[index].image;
  };

  return (
    <section className="platform-overview" aria-labelledby="platform-overview-title">
      <div className="platform-overview-inner">
        {/* Hero Section */}
        <header className="platform-hero">
          <span className="platform-tag">Automation</span>
          <h2 id="platform-overview-title">
            Automate conversations<br />
            with the power of AI
          </h2>
          <p>
            Reduce support volumes and increase satisfaction in minutes<br />
            with Autointelli's AI-powered chatbots and automation tools.
          </p>
          <Button 
            className="platform-hero-cta" 
            size="lg"
            onClick={() => window.location.href = '/products'}
          >
            Learn about Automation
          </Button>
        </header>

        {/* Features Grid */}
        <div className="platform-features-grid">
          {features.map((feature, index) => (
            <article key={index} className={`platform-feature-card ${feature.gradient} ${feature.type === 'scanner' ? 'scanner-card' : ''}`}>
              {feature.type === 'scanner' ? (
                <>
                  <div className="scanner-left">
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                    <div className="scanner-features-list">
                      {automationFeatures.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={idx} className="scanner-feature-item">
                            <div className="scanner-icon">
                              <IconComponent size={20} strokeWidth={2.5} />
                            </div>
                            <div className="scanner-text">
                              <h4>{item.title}</h4>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="scanner-right">
                    <div className="feature-image-container">
                      <img src={getFeatureImage(index)} alt={feature.title} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="feature-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                  <div className="feature-image-container">
                    <img src={getFeatureImage(index)} alt={feature.title} />
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
