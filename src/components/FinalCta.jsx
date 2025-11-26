import { Link } from 'react-router-dom';
import './FinalCta.css';
import logoRound from '../assets/MainImages/logo-round.png';

const FinalCta = () => {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta-inner">
        <div className="final-cta-content">
          <h2 id="final-cta-title">Ready to Transform Your ITOps?</h2>
          <p>Start your journey to smarter, more efficient IT operations today.</p>
          <div className="final-cta-actions">
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="final-cta-btn primary">
              Start Free Trial
            </Link>
            <a 
              href="https://calendly.com/autointelli" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="final-cta-btn secondary"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
        <div className="final-cta-visual">
          <div className="cta-circles">
            <div className="cta-circle circle-1"></div>
            <div className="cta-circle circle-2"></div>
            <div className="cta-circle circle-3"></div>
          </div>
          <div className="cta-image-container">
            <img src={logoRound} alt="Autointelli Logo" className="cta-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
