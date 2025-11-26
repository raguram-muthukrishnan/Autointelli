import { Link } from 'react-router-dom';
import './Ops2.css';

const milestones = [
  'Integrated NLP with events to detect and resolve issues proactively in production environments.',
  'Consistently recognized as a leader in IT automation and monitoring for adaptable, scalable solutions.',
  'Delivered client-centric innovations with seamless cloud and on-prem integrations to support hybrid realities.',
  'Serving SMBs to large enterprises with proven capacity at 15M events per day for the largest customer.'
];

const recognitions = [
  'Recognized leadership in automation and monitoring.',
  'Industry awards and compliance certifications that reinforce enterprise-readiness.'
];

const roiSignals = [
  'Leaders see fewer disruptions, quicker recoveries, and less manual effort.',
  'Reclaimed budgets and time flow into product roadmaps, customer initiatives, and expansion.'
];

const stakeholderClarity = [
  'Clear dashboards with service-level views that translate to every audience.',
  'Dependency insights that make performance and accountability obvious.'
];

const operatingModes = [
  'Fully managed SaaS for the fastest time-to-value.',
  'On-prem deployments for full control.',
  'Hybrid models when teams need confidence and choice without compromise.'
];

const outcomes = [
  { title: 'Peace of mind', detail: 'Keep business services available and resilient across environments and seasons.' },
  { title: 'Clarity with less noise', detail: 'A single narrative of health and impact that directs action from engineers to the board.' },
  { title: 'Momentum that lasts', detail: 'Sustained reductions in operational effort compound into stronger execution and happier customers.' }
];

const Ops2 = () => {
  return (
    <section className="ops2-section" aria-labelledby="ops2-title">
      <div className="ops2-accent" aria-hidden="true" />
      <div className="ops2-inner">
        <header className="ops2-hero">
          <div className="ops2-hero-copy">
            <span className="ops2-eyebrow">Mission &amp; Momentum</span>
            <h2 id="ops2-title">Empower organizations with Always ON operations.</h2>
            <p>
              We provide intelligent, scalable, and integrated tools that transform how IT operations are managed so
              business-facing applications stay resilient, predictable, and calm—no matter the environment.
            </p>
          </div>
          <div className="ops2-hero-panel">
            <h3>Customer success, by design</h3>
            <p>
              A hands-on executive approach ensures every deployment is optimized for performance, tailored to unique
              business needs, and grounded in outcomes that build long-lasting partnerships.
            </p>
          </div>
        </header>

        <div className="ops2-grid">
          <article className="ops2-card" aria-label="Milestones we are proud of">
            <h3>Milestones we’re proud of</h3>
            <ul>
              {milestones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="ops2-card" aria-label="Awards & certifications">
            <h3>Awards &amp; certifications</h3>
            <ul>
              {recognitions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="ops2-card" aria-label="Where value shows up">
            <h3>Where value shows up</h3>
            <ul>
              {roiSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="ops2-card" aria-label="Simple language for all stakeholders">
            <h3>Simple language for all stakeholders</h3>
            <ul>
              {stakeholderClarity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="ops2-split">
          <div className="ops2-panel">
            <h3>Flexible ways to run with us</h3>
            <ul>
              {operatingModes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="ops2-panel">
            <h3>What we help you achieve</h3>
            <ul className="ops2-outcomes">
              {outcomes.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ops2-merge">
          <div className="ops2-merge-card">
            <h3>AIOps and ServiceOps, in one place</h3>
            <p>
              Autointelli unifies observability, automation, and an intuitive service layer—help desk, inventory,
              self-service, and central dashboards—so work flows smoothly and accountability is shared.
            </p>
          </div>
          <div className="ops2-cta">
            <p>
              Ready to map your outcomes to our approach? Schedule a live demo or start a free trial to feel the
              difference in focus, continuity, and confidence.
            </p>
            <div className="ops2-cta-actions">
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="ops2-btn ops2-btn-primary">
                Schedule a live demo
              </Link>
              <Link to="/products" onClick={() => window.scrollTo(0, 0)} className="ops2-btn ops2-btn-outline">
                Start a free trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ops2;
