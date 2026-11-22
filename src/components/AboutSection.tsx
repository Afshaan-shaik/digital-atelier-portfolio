import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ImageEditorModal } from './ImageEditorModal';

export const AboutSection: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  useEffect(() => {
    // Restore saved profile settings from browser storage if present
    const savedImg = localStorage.getItem('afshaan_profile_image');
    const savedZoom = localStorage.getItem('afshaan_profile_zoom');
    const savedX = localStorage.getItem('afshaan_profile_x');
    const savedY = localStorage.getItem('afshaan_profile_y');

    if (savedImg) setProfileImage(savedImg);
    if (savedZoom) setZoom(Number(savedZoom));
    if (savedX) setPosX(Number(savedX));
    if (savedY) setPosY(Number(savedY));
  }, []);

  const handleSaveImage = (imgSrc: string, newZoom: number, newX: number, newY: number) => {
    setProfileImage(imgSrc);
    setZoom(newZoom);
    setPosX(newX);
    setPosY(newY);

    try {
      localStorage.setItem('afshaan_profile_image', imgSrc);
      localStorage.setItem('afshaan_profile_zoom', String(newZoom));
      localStorage.setItem('afshaan_profile_x', String(newX));
      localStorage.setItem('afshaan_profile_y', String(newY));
    } catch (e) {
      console.warn('Storage quota exceeded, displaying image in session.');
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('afshaan_profile_image');
    localStorage.removeItem('afshaan_profile_zoom');
    localStorage.removeItem('afshaan_profile_x');
    localStorage.removeItem('afshaan_profile_y');
  };

  return (
    <section id="about" className="about-section" aria-label="About the Creator">
      <div className="editorial-shell">
        <div className="about-split-layout">
          {/* Left Column: Portrait & Image Studio */}
          <div className="portrait-display-column">
            <div className="portrait-frame-card">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Portrait of Afshaan Shaikh"
                  className="portrait-actual-photo"
                  style={{
                    objectPosition: `${posX}% ${posY}%`,
                    transform: `scale(${zoom / 100})`,
                    transition: 'transform 0.3s ease, object-position 0.3s ease'
                  }}
                />
              ) : (
                <div className="portrait-fallback-art">
                  <div className="portrait-orbit-ring" />
                  <span className="portrait-monogram-initials">
                    {portfolioData.personal.monogram}
                  </span>
                  <span className="portrait-art-star">✳</span>
                </div>
              )}
              <div className="portrait-index-tag">PORTRAIT / 001</div>
            </div>

            <button
              className="portrait-manage-btn"
              type="button"
              onClick={() => setIsEditorOpen(true)}
            >
              <span>↗ {profileImage ? 'Adjust portrait framing' : 'Upload custom portrait'}</span>
              <small>LOCAL STUDIO</small>
            </button>
            <p className="portrait-help-text">
              Upload any photo in common formats and adjust the crop. Saved instantly in your browser.
            </p>
          </div>

          {/* Right Column: Editorial Biography & Narrative */}
          <div className="about-narrative-column">
            <div className="eyebrow-tag mb-3">( ABOUT ME )</div>
            <h2 className="about-headline-quote">
              Curiosity is where every creation <em>begins.</em>
            </h2>

            <div className="about-bio-text">
              <span className="about-dropcap-letter">I</span>
              {portfolioData.personal.bioFull.map((paragraph, idx) => (
                <p key={idx} className="about-bio-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Poetic Quote Highlight */}
            <div className="about-poetic-quote">
              <p>“{portfolioData.personal.quote}”</p>
              <span>— AFSHAAN SHAIKH · WORKING PHILOSOPHY</span>
            </div>

            {/* Currently Exploring Subsection */}
            <div className="currently-exploring-block">
              <h3 className="exploring-title">Currently Exploring &amp; Honing</h3>
              <div className="exploring-chips-grid">
                {portfolioData.personal.currentlyExploring.map((topic, index) => (
                  <span key={index} className="exploring-chip">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait Workshop Modal */}
      <ImageEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveImage}
        onRemove={handleRemoveImage}
        currentImage={profileImage}
        currentZoom={zoom}
        currentX={posX}
        currentY={posY}
      />
    </section>
  );
};
