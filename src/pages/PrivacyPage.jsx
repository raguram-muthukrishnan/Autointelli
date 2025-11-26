import React, { useEffect } from 'react';
import './LegalPage.css';

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1>Privacy Policy</h1>
        <span className="last-updated">Last Updated: November 21, 2025</span>

        <div className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Autointelli ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect includes:
          </p>
          <ul>
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Service.</li>
            <li>Increase the efficiency and operation of the Service.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>4. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware that any data we have collected is from children under the age of 13, please contact us using the contact information provided below.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at <a href="mailto:sales@autointelli.com">sales@autointelli.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
