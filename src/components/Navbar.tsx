import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state
      setScrolled(window.scrollY > 40);

      // Reading progress
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Active section spy
      const sections = ['hero', 'work', 'about', 'journey', 'skills', 'credentials', 'creative', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const next = !mobileMenuOpen;
    setMobileMenuOpen(next);
    if (next) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  return (
    <>
      <div className="reading-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <header className={`site-nav-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="editorial-shell nav-container">
          {/* Brand Monogram & Name */}
          <a href="#hero" className="brand-monogram-wrap" aria-label="Afshaan Shaikh — Return to top">
            <span className="brand-monogram">{portfolioData.personal.monogram}</span>
            <div className="brand-info">
              <span className="brand-name">{portfolioData.personal.name.toUpperCase()}</span>
              <span className="brand-tag">MIDNIGHT EDITORIAL</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav-menu" aria-label="Primary Navigation">
            <a href="#work" className={`nav-item-link ${activeSection === 'work' ? 'active' : ''}`}>Selected Work</a>
            <a href="#about" className={`nav-item-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a href="#journey" className={`nav-item-link ${activeSection === 'journey' ? 'active' : ''}`}>Journey</a>
            <a href="#skills" className={`nav-item-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
            <a href="#credentials" className={`nav-item-link ${activeSection === 'credentials' ? 'active' : ''}`}>Credentials</a>
            <a href="#creative" className={`nav-item-link ${activeSection === 'creative' ? 'active' : ''}`}>Creative Space</a>
          </nav>

          {/* Quick Action Link */}
          <div className="d-flex align-items-center gap-3">
            <a href="#contact" className="nav-quick-cta" onClick={onOpenContact}>
              <span>Let’s Talk</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>

            {/* Accessible Mobile Hamburger (3 lines) */}
            <button
              className="mobile-hamburger"
              type="button"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobileDrawer"
            >
              <span className="bar bar-1" aria-hidden="true" />
              <span className="bar bar-2" aria-hidden="true" />
              <span className="bar bar-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        id="mobileDrawer"
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="mobile-nav-links" aria-label="Mobile Navigation">
          <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Home</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#work" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Selected Work</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>About Me</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#journey" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Creative Journey</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#skills" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Skills &amp; Tech</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#credentials" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Credentials</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#creative" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Creative Space</span>
            <span className="arrow">↗</span>
          </a>
          <a href="#contact" className="mobile-nav-link text-champagne" onClick={closeMobileMenu}>
            <span>Get In Touch</span>
            <span className="arrow">↗</span>
          </a>
        </nav>

        <div className="mobile-nav-footer">
          <span className="eyebrow-tag">CONNECT DIRECTLY</span>
          <div className="mobile-socials-row">
            <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={portfolioData.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          </div>
        </div>
      </div>
    </>
  );
};
