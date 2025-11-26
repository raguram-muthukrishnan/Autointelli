import { Link } from 'react-router-dom';
import { opsData } from '../../data/data';
import './Ops.css';

const achievements = [
  {
    headline: '750+',
    detail: 'processes automated across real customer environments to remove repetitive toil at scale.'
  },
  {
    headline: '100M+',
    detail: 'events observed with reliability practices shaped by diverse, production-grade deployments.'
  },
  {
    headline: '15M / day',
    detail: 'events processed for the largest customer—evidence of enterprise-grade scale and stability.'
  },
  {
    headline: 'Recognized leadership',
    detail: 'Consistently acknowledged as a leader in IT automation and monitoring for customizable, scalable solutions.'
  },
  {
    headline: 'Value that compounds',
    detail: 'Fewer escalations, faster recoveries, and less manual effort—freeing budgets and engineering time for growth.'
  },
  {
    headline: 'Day-one clarity',
    detail: 'A single, comprehensible view of service health so teams focus on decisions that move the business forward.'
  }
];

const availabilitySeries = [
  { label: 'Today', value: '100%' },
  { label: 'Yesterday', value: '95%' },
  { label: 'This Week', value: '98%' },
  { label: 'Last Week', value: '99%' },
  { label: 'This Month', value: '98%' },
  { label: 'Last Month', value: '99%' }
];

const bandwidthStats = [
  { label: 'Inbound', value: '6.06 Mb/s' },
  { label: 'Outbound', value: '3.12 Mb/s' },
  { label: 'Total', value: '9.18 Mb/s' }
];

const uptimeLeaders = [
  { label: 'Autointelli PROD', value: '2222 days' },
  { label: 'Ecommerce App', value: '1954 days' },
  { label: 'OpsDuty Demo', value: '340 days' },
  { label: 'Workflow App', value: '62 days' }
];

const Ops = () => {
  return (
    <section className="ops-section" aria-labelledby="ops-title">
      <div className="ops-accent" aria-hidden="true" />
      <div className="ops-inner">
        <header className="ops-hero">
          <div className="ops-hero-left">
            <span className="ops-eyebrow">AIOps + ServiceOps Platform</span>
            <h1 id="ops-title">Keep your business applications Always ON.</h1>
            <p className="ops-lead">
              Autointelli empowers organizations with intelligent, scalable, and integrated solutions that reduce
              downtime and deliver seamless user experiences across cloud, on-premise, and hybrid environments.
            </p>

            <ul className="ops-hero-list">
              <li>
                <strong>Who we are.</strong> Led by industry veterans and technology pioneers, we simplify complex IT
                ecosystems through innovation, customer obsession, and measurable outcomes.
              </li>
              <li>
                <strong>What we stand for.</strong> Transform traditional IT operations into modern digital operations so
                teams spend less time firefighting and more time advancing the business.
              </li>
            </ul>

            <div className="ops-cta-group">
              <Link to="/products" onClick={() => window.scrollTo(0, 0)} className="ops-btn ops-btn-primary">
                See the platform in action
              </Link>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="ops-btn ops-btn-secondary">
                Start a free trial
              </Link>
            </div>
          </div>

          <div className="ops-hero-right" aria-label="Real-world telemetry">
            <div className="ops-telemetry-card">
              <h3>Availability snapshot</h3>
              <div className="ops-telemetry-grid">
                {availabilitySeries.map((item) => (
                  <div key={item.label} className="ops-telemetry-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="ops-telemetry-stack">
              <article className="ops-telemetry-panel">
                <h4>Bandwidth &amp; traffic</h4>
                <ul>
                  {bandwidthStats.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="ops-telemetry-panel">
                <h4>Long-run uptime</h4>
                <ul>
                  {uptimeLeaders.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </header>

        <section className="ops-achievements" aria-labelledby="ops-achievements-title">
          <div className="ops-section-heading">
            <h2 id="ops-achievements-title">Proof that builds trust</h2>
            <p>
              Leadership teams choose Autointelli for evidence-backed reliability, scale, and the confidence that day-one
              visibility brings.
            </p>
          </div>
          <div className="ops-achievements-grid">
            {achievements.map((item) => (
              <article key={item.detail} className="ops-achievement-card">
                <span>{item.headline}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ops-product-suite" aria-labelledby="ops-products-title">
          <div className="ops-section-heading">
            <h2 id="ops-products-title">A product suite built to de-risk operations</h2>
            <p>
              Bring observability, automation, service management, and secure access together with modules that can scale
              independently or operate as a unified fabric.
            </p>
          </div>
          <div className="ops-product-grid">
            {opsData.cards.map((card) => (
              <article key={card.title} className="ops-product-card">
                <div className="ops-product-icon">
                  <img src={card.icon} alt={`${card.title} icon`} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.paragraph}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ops-bottom-grid" aria-labelledby="ops-value-title">
          <div className="ops-value-card">
            <h3 id="ops-value-title">How customers experience value</h3>
            <p>
              Fewer escalations, faster recoveries, and less manual effort—freeing budgets and engineering time for
              growth, innovation, and customer experience improvements.
            </p>
          </div>
          <div className="ops-value-card">
            <h3>What you can expect on day one</h3>
            <p>
              A single, comprehensible view of service health, clear ownership, and fewer distractions—so teams can
              focus on decisions that move the business forward.
            </p>
          </div>
          <div className="ops-value-card">
            <h3>AIOps + ServiceOps, simply</h3>
            <p>
              Unified observability, alert intelligence, and rapid incident response coupled with intuitive help desk,
              inventory tracking, and self-service—so every stakeholder sees and acts on what matters.
            </p>
          </div>
        </section>

        <section className="ops-trusted-by" aria-labelledby="ops-trusted-title">
          <div className="ops-section-heading">
            <h2 id="ops-trusted-title">Trusted by teams that keep the world connected</h2>
            <p>{opsData.trustedBy.subtext}</p>
          </div>
          <div className="ops-trusted-logos">
            {opsData.trustedBy.logos.map((logo) => (
              <div key={logo.id} className="ops-trusted-logo">
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Ops;