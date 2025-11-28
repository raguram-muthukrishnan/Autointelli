import './MeasurableResults.css';
import { FiMonitor, FiCpu, FiCalendar, FiUsers } from 'react-icons/fi';

const results = [
  {
    icon: <FiMonitor />,
    number: '100K+',
    label: 'Devices Managed',
    color: '#F0CE1D'
  },
  {
    icon: <FiCpu />,
    number: '750+',
    label: 'Processes Deployed',
    color: '#F0CE1D'
  },
  {
    icon: <FiCalendar />,
    number: '10M+',
    label: 'Events',
    color: '#F0CE1D'
  },
  {
    icon: <FiUsers />,
    number: '35+',
    label: 'Channel Partners',
    color: '#F0CE1D'
  }
];

const MeasurableResults = () => {
  return (
    <section className="measurable-results" aria-labelledby="results-title">
      <div className="results-inner">
        <h2 id="results-title" className="results-title">Our Proven Impact</h2>
        
        <div className="results-grid">
          {results.map((result, index) => (
            <div key={index} className="result-card">
              <div className="result-icon" style={{ backgroundColor: result.color }}>
                {result.icon}
              </div>
              <div className="result-number">{result.number}</div>
              <div className="result-label">{result.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeasurableResults;
