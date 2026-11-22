import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="editorial-footer" role="contentinfo">
      <div className="editorial-shell">
        <div className="footer-top-row">
          <div className="brand-monogram-wrap">
            <span className="brand-monogram">{portfolioData.personal.monogram}</span>
            <div className="brand-info">
              <span className="brand-name">{portfolioData.personal.name.toUpperCase()}</span>
              <span className="brand-tag">THE DIGITAL ATELIER</span>
            </div>
          </div>

          <p className="footer-quote mb-0">
            “Stay curious. Make something with a little soul in it.”
          </p>

          <button
            type="button"
            className="back-to-top-link"
            onClick={scrollToTop}
            aria-label="Scroll back to the top of the page"
          >
            BACK TO THE TOP ↑
          </button>
        </div>

        <div className="footer-bottom-row">
          <span>© {currentYear} {portfolioData.personal.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>
          <span>MADE WITH INTENTION <i aria-hidden="true">✳</i></span>
          <span>MIDNIGHT EDITORIAL DESIGN SYSTEM</span>
        </div>
      </div>
    </footer>
  );
};
