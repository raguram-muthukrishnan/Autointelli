import Hero from '../components/Hero';
import SocialProofBar from '../components/SocialProofBar';
import PlatformOverview from '../components/PlatformOverview';
import MeasurableResults from '../components/MeasurableResults';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import FeaturesShowcase from '../components/FeaturesShowcase';
import WhyChooseUs from '../components/WhyChooseUs';
import AwardsRecognition from '../components/AwardsRecognition';
import IntegrationHub from '../components/IntegrationHub';
import NewsletterForm from '../components/NewsletterForm';
import FinalCta from '../components/FinalCta';

const Home = () => {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <PlatformOverview />
      <MeasurableResults />
      <TestimonialsCarousel />
      <FeaturesShowcase />
      <WhyChooseUs />
      <AwardsRecognition />
      <IntegrationHub />
      <section className="home-newsletter-section" style={{ background: '#FFFFFF', padding: 0, margin: 0 }}>
        <NewsletterForm 
          categories={['all']}
          title="Subscribe To Our News letter"
          subtitle="Sign up today. Writing copy is time-consuming and difficult. Headline's artificial intelligence can take your thoughts."
          horizontal={true}
        />
      </section>
      <FinalCta />
    </>
  );
};

export default Home;
