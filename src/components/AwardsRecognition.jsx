import './AwardsRecogonition.css';
import medalIcon from '../assets/Awards/medal-award.svg';
import { ShieldCheck } from 'lucide-react';

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
  { name: 'ISO 27001:2022', color: '#F0CE1D' },
  { name: 'ISO 9001:2025', color: '#F0CE1D' },
  { name: 'ISO/IEC 27034-1:2011', color: '#F0CE1D' }
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
              <div className="award-icon-wrapper">
                <img src={medalIcon} alt="Medal Award" className="award-icon" />
              </div>
              
              <div className="award-content">
                <h3 className="award-title">{award.title}</h3>
                <p className="award-subtitle">{award.subtitle}</p>
                
                <div className="award-year" style={{ color: award.color }}>
                  {award.year}
                </div>
                
                <p className="award-achievement">{award.achievement}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <h3 className="certifications-heading">ISO Certificates</h3>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="certification-icon">
                <ShieldCheck size={48} strokeWidth={2} color={cert.color} />
              </div>
              <h3 className="certification-name">{cert.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognition;
