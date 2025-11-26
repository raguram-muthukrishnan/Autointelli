import './SuccessStories.css';

const stories = [
  {
    title: 'Reducing Downtime by 30%',
    description: 'Learn how a leading e-commerce brand optimized their infrastructure.',
    linkText: 'Read Story',
    label: 'E-commerce'
  },
  {
    title: 'Scaling Cloud Operations',
    description: 'Discover how a SaaS provider streamlined their multi-cloud environment.',
    linkText: 'Read Story',
    label: 'SaaS'
  },
  {
    title: 'Enhancing Security Posture',
    description: 'See how a financial institution achieved robust compliance.',
    linkText: 'Read Story',
    label: 'Finance'
  },
  {
    title: 'Improving Team Collaboration',
    description: 'Explore how an IT team unified their workflows and communication.',
    linkText: 'Read Story',
    label: 'Enterprise IT'
  }
];

const SuccessStories = () => {
  return (
    <section className="success-stories" aria-labelledby="success-stories-title">
      <div className="success-stories-inner">
        <header className="success-header">
          <span className="success-tag">CUSTOMER STORIES</span>
          <h2 id="success-stories-title">Customer Success Stories</h2>
          <p>See how organizations like yours are achieving operational excellence.</p>
        </header>

        <div className="success-cards">
          {stories.map((story) => (
            <article key={story.title} className="success-card">
              <div className="success-thumb" aria-hidden="true">
                <span>{story.label}</span>
              </div>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <a href="#stories" className="success-link">
                {story.linkText}
              </a>
            </article>
          ))}
        </div>

        <a href="#stories" className="success-cta">
          View All Case Studies
        </a>
      </div>
    </section>
  );
};

export default SuccessStories;
