import './IntegrationHub.css';
import seamlessIntegrations from '../assets/MainImages/seamless-integrations.png';

const integrations = ['Slack', 'Jira', 'ServiceNow', 'PagerDuty', 'AWS', 'Azure', 'Google Cloud', 'Datadog'];

const IntegrationHub = () => {
  return (
    <section className="integration-hub" aria-labelledby="integration-hub-title">
      <div className="integration-hub-inner">
        <div className="integration-visual" aria-hidden="true">
          <img src={seamlessIntegrations} alt="Seamless Integrations" className="integration-image" />
        </div>
        <div className="integration-copy">
          <span className="integration-tag">INTEGRATION HUB</span>
          <h2 id="integration-hub-title">Seamless Integrations</h2>
          <p>Connect with your existing tools and build a truly unified IT ecosystem.</p>
          <div className="integration-text-block">
            <h3>Your Favorite Tools, Connected</h3>
            <p>
              Our platform integrates effortlessly with hundreds of leading IT tools, ensuring a smooth transition and
              enhanced functionality within your existing environment.
            </p>
            <ul className="integration-list">
              {integrations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="/products" className="integration-cta">
              Explore All Integrations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationHub;
