import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

export const HeroCarousel: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = portfolioData.heroSlides;
  const timerRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused) return;

    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, 7500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <section id="hero" className="editorial-hero" aria-label="Introduction and Hero">
      <div className="editorial-shell">
        {/* Eyebrow & Status Strip */}
        <div className="hero-meta-status">
          <span className="status-beacon" aria-hidden="true" />
          <span className="eyebrow-tag">{portfolioData.personal.eyebrow}</span>
          <span className="meta-divider" aria-hidden="true" />
          <span className="eyebrow-tag" style={{ color: 'var(--soft-silver)' }}>EST. IN CURIOSITY</span>
        </div>

        <div className="hero-editorial-grid">
          {/* Left Column: Typographic Narrative & Action Links */}
          <div className="hero-copy-column">
            <p className="hero-main-title">{portfolioData.personal.name} <span style={{ color: 'var(--soft-silver)' }}>—</span> ATELIER</p>
            <h1 className="hero-headline">
              Between logic<br />
              &amp; <em>imagination.</em>
            </h1>
            <p className="hero-supporting-copy">
              {portfolioData.personal.bioIntro}
            </p>

            {/* Hero Action Buttons */}
            <div className="hero-action-buttons">
              <a href="#work" className="btn-champagne">
                <span>Explore My Work</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href="#about" className="btn-outline-champagne">
                <span>About Me</span>
                <span aria-hidden="true">↘</span>
              </a>
            </div>

            {/* Quick Navigation Anchors */}
            <div className="hero-quick-anchors" aria-label="Hero Quick Links">
              <a href="#work" className="hero-anchor-link">
                <span>01. Selected Work</span>
                <span className="arrow">↓</span>
              </a>
              <a href="#journey" className="hero-anchor-link">
                <span>02. Creative Journey</span>
                <span className="arrow">↓</span>
              </a>
              <a href="#skills" className="hero-anchor-link">
                <span>03. Technical Atelier</span>
                <span className="arrow">↓</span>
              </a>
              <a href="#contact" className="hero-anchor-link">
                <span>04. Get In Touch</span>
                <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Editorial Carousel */}
          <div
            className="hero-carousel-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            aria-roledescription="carousel"
            aria-label="Artistic composition showcase"
          >
            <div className="carousel-stage">
              {/* Overlay Top Bar: Caption and Slide Counter */}
              <div className="carousel-overlay-header">
                <span>{currentSlide.caption}</span>
                <span className="carousel-slide-counter">
                  {currentSlide.number} / 0{slides.length}
                </span>
              </div>

              {/* Slide 1 Visual Theme: Cosmos */}
              {currentSlide.theme === 'cosmos' && (
                <div className="visual-canvas-cosmos">
                  <div className="cosmos-orbit-1" />
                  <div className="cosmos-orbit-2" />
                  <div className="cosmos-sun-ring" />
                  <div className="cosmos-arch" />
                  <div className="cosmos-monogram">A<span>S</span></div>
                </div>
              )}

              {/* Slide 2 Visual Theme: Quill */}
              {currentSlide.theme === 'quill' && (
                <div className="visual-canvas-quill">
                  <div className="quill-disk" />
                  <div className="quill-feather-glyph">✦</div>
                  <div className="quill-typography">
                    THE<br />
                    <i>ARTISAN’S</i><br />
                    QUILL
                  </div>
                </div>
              )}

              {/* Slide 3 Visual Theme: Contours */}
              {currentSlide.theme === 'contours' && (
                <div className="visual-canvas-contours">
                  <div className="contour-lines" />
                  <div className="contour-route">
                    <span className="contour-waypoint" style={{ left: '6%', top: '65%' }} />
                    <span className="contour-waypoint" style={{ left: '48%', top: '-4%' }} />
                    <span className="contour-waypoint" style={{ right: '-3%', top: '50%' }} />
                  </div>
                  <div className="contour-tag-card">
                    <small>DELIVERY / ROUTE STUDY</small>
                    <strong>Swiftly</strong>
                  </div>
                </div>
              )}

              {/* Overlay Bottom Bar: Title, Subtitle, and Arrows */}
              <div className="carousel-caption-bottom">
                <div className="slide-text-info">
                  <h3 className="slide-text-title">{currentSlide.title}</h3>
                  <p className="slide-text-sub">{currentSlide.subtitle}</p>
                </div>
                <div className="carousel-nav-arrows">
                  <button
                    className="carousel-nav-btn"
                    onClick={prevSlide}
                    type="button"
                    aria-label="Previous Slide"
                  >
                    ←
                  </button>
                  <button
                    className="carousel-nav-btn"
                    onClick={nextSlide}
                    type="button"
                    aria-label="Next Slide"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination Indicators */}
            <div className="carousel-dots-row">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  className={`carousel-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  aria-current={idx === currentSlideIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
