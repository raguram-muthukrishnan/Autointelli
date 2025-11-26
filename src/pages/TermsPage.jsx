import React, { useEffect } from 'react';
import './LegalPage.css';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1>Terms of Service</h1>
        <span className="last-updated">Last Updated: November 21, 2025</span>

        <div className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the website and services provided by Autointelli ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Description of Service</h2>
          <p>
            Autointelli provides AIOps, IT operations management, and automation solutions (the "Service"). We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
          </p>
        </div>

        <div className="legal-section">
          <h2>3. User Accounts</h2>
          <p>
            To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Autointelli and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. User Conduct</h2>
          <p>
            You agree not to use the Service:
          </p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate Autointelli, an Autointelli employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Autointelli or users of the Service or expose them to liability.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Autointelli, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Autointelli is established, without regard to its conflict of law provisions.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:sales@autointelli.com">sales@autointelli.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
