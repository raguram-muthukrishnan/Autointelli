import './WhyChooseUs.css';
import whyChooseImg from '../assets/MainImages/why_choose.png';

const WhyChooseUs = () => {
  return (
    <section className="why-choose" aria-labelledby="why-choose-title">
      <div className="why-choose-inner">
        <div className="why-choose-content">
          <span className="why-choose-tag">WHY CHOOSE US</span>
          <h2 id="why-choose-title">
            Why Choose Our ITOps Platform?
          </h2>
          <blockquote className="why-choose-quote">
            "Experience the difference of a truly integrated and intelligent solution."
          </blockquote>
          
          <ul className="why-choose-features">
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFC800"/>
                <path d="M8 12L11 15L16 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Comprehensive Visibility: Monitor every layer of your IT stack.</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFC800"/>
                <path d="M8 12L11 15L16 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>AI-Driven Insights: Proactive detection and root cause analysis.</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFC800"/>
                <path d="M8 12L11 15L16 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Scalable & Flexible: Adapts to businesses of all sizes.</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFC800"/>
                <path d="M8 12L11 15L16 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Robust Security: Built with enterprise-grade protection.</span>
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFC800"/>
                <path d="M8 12L11 15L16 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Dedicated Support: 24/7 expert assistance.</span>
            </li>
          </ul>

          <button 
            className="why-choose-cta"
            onClick={() => window.location.href = '/products'}
          >
            View All Features
          </button>
        </div>

        <div className="why-choose-visual">
          <div className="why-choose-dashboard-image">
            <img src={whyChooseImg} alt="Why Choose Our ITOps Platform" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
