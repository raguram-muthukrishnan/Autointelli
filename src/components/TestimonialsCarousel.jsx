import { useState, useEffect } from 'react';
import './TestimonialsCarousel.css';
import { FaUser } from 'react-icons/fa';
import { testimonialsData } from '../data/testimonialsData';

const testimonials = testimonialsData.testimonials;

const TestimonialsCarousel = () => {
  // Split testimonials into 3 columns
  const column1 = testimonials.filter((_, i) => i % 3 === 0);
  const column2 = testimonials.filter((_, i) => i % 3 === 1);
  const column3 = testimonials.filter((_, i) => i % 3 === 2);

  // Mobile carousel state - only show first 3 testimonials
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileTestimonials = testimonials.slice(0, 3);

  // Auto-slide effect for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileTestimonials.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [mobileTestimonials.length]);

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-inner">
        <h2 id="testimonials-title">{testimonialsData.title}</h2>

        {/* Desktop: Masonry columns */}
        <div className="testimonials-container testimonials-desktop">
          <div className="testimonials-fade-top"></div>
          
          <div className="testimonials-columns">
            <div className="testimonials-column">
              {column1.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      <FaUser />
                    </div>
                    <div className="testimonial-info">
                      <strong>{testimonial.name}</strong>
                      <span className="testimonial-handle">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
              ))}
            </div>

            <div className="testimonials-column">
              {column2.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      <FaUser />
                    </div>
                    <div className="testimonial-info">
                      <strong>{testimonial.name}</strong>
                      <span className="testimonial-handle">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
              ))}
            </div>

            <div className="testimonials-column">
              {column3.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      <FaUser />
                    </div>
                    <div className="testimonial-info">
                      <strong>{testimonial.name}</strong>
                      <span className="testimonial-handle">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonials-fade-bottom"></div>
        </div>

        {/* Mobile: Carousel */}
        <div className="testimonials-mobile-carousel">
          <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {mobileTestimonials.map((testimonial, index) => (
              <div key={index} className="carousel-slide">
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      <FaUser />
                    </div>
                    <div className="testimonial-info">
                      <strong>{testimonial.name}</strong>
                      <span className="testimonial-handle">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel indicators */}
          <div className="carousel-indicators">
            {mobileTestimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
