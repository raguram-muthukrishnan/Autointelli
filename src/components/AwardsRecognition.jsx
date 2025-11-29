import './AwardsRecogonition.css';
import medalIcon from '../assets/Awards/medal-award.svg';
import leafWreath from '../assets/Awards/leaf.svg';
import isoIcon from '../assets/iso-31.svg';
import gdprIcon from '../assets/Awards/gdpr.svg';

const awards = [
  {
    year: '2024',
    title: 'Department of Industry',
    subtitle: 'Govt of India National Award',
    achievement: 'Nominee for the year',
    color: '#F0CE1D'
  },
  {
    year: '2023',
    title: 'Supporting E-Governance',
    subtitle: 'Governor of Tamil Nadu',
    achievement: 'Best Automation Company',
    color: '#F0CE1D'
  },
  {
    year: '2022',
    title: 'UK Government',
    subtitle: 'London',
    achievement: 'Best IT Infrastructure Automation',
    color: '#F0CE1D'
  },
  {
    year: '2019',
    title: 'Bizlab Fintech',
    subtitle: 'Award from Kumar Mangalam Birla',
    achievement: 'Best Infrastructure Automation Firm',
    color: '#F0CE1D'
  }
];

const certifications = [
  { name: 'ISO 27001:2022', color: '#006BB6', icon: isoIcon },
  { name: 'ISO 9001:2025', color: '#006BB6', icon: isoIcon },
  { name: 'ISO/IEC 27034-1:2011', color: '#006BB6', icon: isoIcon },
  { name: 'EU-GDPR Compliance', color: '#006BB6', icon: gdprIcon }
];

const AwardsRecognition = () => {
  return (
    <section className="awards-recognition" aria-labelledby="awards-title">
      <div className="awards-inner">
        <h2 id="awards-title" className="awards-title">
          Industry Recognition & Achievements
        </h2>
        
        <div className="awards-grid">
          {awards.map((award, index) => (
            <div key={index} className="award-card">
              <div className="award-wreath-container">
                <img src={leafWreath} alt="Award Wreath" className="award-wreath" />
                <div className="award-center-content">
                  <img src={medalIcon} alt="Medal Award" className="award-medal" />
                  <div className="award-year" style={{ color: award.color }}>
                    {award.year}
                  </div>
                </div>
              </div>
              
              <div className="award-content">
                <h3 className="award-title">{award.title}</h3>
                <p className="award-subtitle">{award.subtitle}</p>
                <p className="award-achievement">{award.achievement}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <h3 className="certifications-heading">Security and Compliance</h3>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="certification-icon">
                <img src={cert.icon} alt={cert.name} className="iso-icon" />
              </div>
              <h3 className="certification-name" style={{ color: cert.color }}>{cert.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognition;
