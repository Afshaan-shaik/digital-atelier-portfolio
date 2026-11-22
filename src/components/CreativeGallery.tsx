import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { CreativeItem } from '../types/portfolio';

export const CreativeGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = portfolioData.creativeWorks;

  const categories = [
    'All',
    'Visual Concepts',
    'Digital Art',
    'Illustrations',
    'Writing & Poetry'
  ];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.classList.add('menu-open');
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.classList.remove('menu-open');
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeItem: CreativeItem | null = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="creative" className="creative-gallery-section" aria-labelledby="creativeGalleryTitle">
      <div className="editorial-shell">
        <div className="section-head">
          <div className="eyebrow-tag">
            <span>MARGINALIA &amp; EXPRESSION</span>
            <span className="star">✳</span>
            <span>06 — CREATIVE SPACE</span>
          </div>
          <h2 id="creativeGalleryTitle">
            Ideas beyond the <em>screen.</em>
          </h2>
          <p className="section-lead">
            An open sketchbook of visual experiments, typographic studies, and poetic marginalia exploring themes of memory, motion, and craft.
          </p>
        </div>

        {/* Category Filters */}
        <div className="filter-chips-row" role="group" aria-label="Filter creative items">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              <span>{cat}</span>
              <span className="pill-count">
                0{cat === 'All' ? items.length : items.filter((i) => i.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid-masonry">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="gallery-item-card"
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(idx);
                }
              }}
              aria-label={`View artwork: ${item.title}`}
            >
              <div className="gallery-artwork-canvas">
                <p className="snippet">{item.contentSnippet || item.title}</p>
              </div>

              <div className="gallery-item-head">
                <h3>{item.title}</h3>
                <span className="gallery-item-cat">{item.category}</span>
              </div>
              <p className="gallery-item-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div
          className="editorial-modal-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightboxTitle"
        >
          <div className="lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="eyebrow-tag">{activeItem.category} · {activeItem.year}</span>
                <h2 id="lightboxTitle">{activeItem.title}</h2>
              </div>
              <button
                className="modal-close-btn"
                type="button"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
              >
                ×
              </button>
            </div>

            <div className="lightbox-display-area">
              <blockquote className="quote-text">
                {activeItem.contentSnippet}
              </blockquote>
            </div>

            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
              {activeItem.description}
            </p>

            <div className="lightbox-controls-row mt-4 pt-3 border-top border-secondary">
              <button className="btn-outline-champagne" type="button" onClick={prevLightbox}>
                ← Previous Work
              </button>
              <span className="font-mono text-champagne" style={{ fontSize: '0.75rem' }}>
                0{(lightboxIndex ?? 0) + 1} / 0{filteredItems.length}
              </span>
              <button className="btn-outline-champagne" type="button" onClick={nextLightbox}>
                Next Work →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
