import './IntegrationHub.css';
import seamlessIntegrations from '../assets/MainImages/seamless-integrations.png';
import slackLogo from '../assets/integration/slack-new-logo.svg';
import jiraLogo from '../assets/integration/jira-1.svg';
import serviceNowLogo from '../assets/integration/ServiceNow_logo.svg';
import pagerDutyLogo from '../assets/integration/PagerDuty-GreenRGB.svg';
import awsLogo from '../assets/integration/Amazon_Web_Services_Logo.svg';
import azureLogo from '../assets/integration/Azure_DevOps_icon.svg';
import googleCloudLogo from '../assets/integration/Google_Cloud_logo.svg';
import datadogLogo from '../assets/integration/dd_icon_rgb.svg';

const integrations = [
  { name: 'Slack', logo: slackLogo },
  { name: 'Jira', logo: jiraLogo },
  { name: 'ServiceNow', logo: serviceNowLogo },
  { name: 'PagerDuty', logo: pagerDutyLogo },
  { name: 'AWS', logo: awsLogo },
  { name: 'Azure', logo: azureLogo },
  { name: 'Google Cloud', logo: googleCloudLogo },
  { name: 'Datadog', logo: datadogLogo }
];

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
                <li key={item.name} className="integration-item">
                  <img src={item.logo} alt={item.name} className="integration-logo" />
                </li>
              ))}
              <li className="integration-item integration-count-box">
                <span className="integration-count-text">with over 100+ integrations</span>
              </li>
            </ul>
            <p className="integration-disclaimer">
              All logos and trademarks are the property of their respective owners and are used here for display purposes only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationHub;
