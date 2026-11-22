import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const JourneySection: React.FC = () => {
  const milestones = portfolioData.journey;

  return (
    <section id="journey" className="journey-section" aria-labelledby="journeySectionTitle">
      <div className="editorial-shell">
        <div className="section-head text-center mx-auto" style={{ maxWidth: '640px' }}>
          <div className="eyebrow-tag justify-content-center">
            <span>CHRONOLOGY</span>
            <span className="star">✳</span>
            <span>03 — CREATIVE JOURNEY</span>
          </div>
          <h2 id="journeySectionTitle">
            The path of <em>becoming.</em>
          </h2>
          <p className="section-lead mx-auto">
            A chronological record of milestones, technical investigations and creative disciplines that shape my practice.
          </p>
        </div>

        {/* Vertical Chronological Timeline */}
        <div className="timeline-vertical-flow">
          {milestones.map((item) => (
            <article key={item.id} className="timeline-item-entry">
              <span className="timeline-marker-dot" aria-hidden="true" />
              <div className="timeline-entry-header">
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-category-badge">{item.category}</span>
                {item.period && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--soft-silver)', fontFamily: 'var(--font-mono)' }}>
                    ({item.period})
                  </span>
                )}
              </div>
              <h3 className="timeline-entry-title">{item.title}</h3>
              {item.organization && (
                <p className="timeline-entry-org">{item.organization.toUpperCase()}</p>
              )}
              <p className="timeline-entry-desc">{item.description}</p>
              {item.tags && item.tags.length > 0 && (
                <div className="timeline-entry-tags">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tech-pill">{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
