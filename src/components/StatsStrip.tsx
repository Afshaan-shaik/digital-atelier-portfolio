import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const StatsStrip: React.FC = () => {
  // Real derived calculations directly from portfolioData
  const projectsCount = portfolioData.projects.length;
  const creativeCount = portfolioData.creativeWorks.length;
  const allSkills = portfolioData.skills.reduce((acc, cat) => acc + cat.skills.length, 0);
  const coreDisciplines = portfolioData.skills.length;

  return (
    <section className="stats-strip-section" aria-label="Portfolio Key Metrics">
      <div className="editorial-shell">
        <div className="stats-grid-row">
          {/* Stat 1: Projects Created */}
          <div className="stat-item">
            <span className="stat-value">0{projectsCount}</span>
            <span className="stat-label">Projects Created</span>
            <span className="stat-note">Production &amp; Prototypes</span>
          </div>

          {/* Stat 2: Creative Experiments */}
          <div className="stat-item">
            <span className="stat-value">0{creativeCount}</span>
            <span className="stat-label">Creative Works</span>
            <span className="stat-note">Art, Concepts &amp; Writing</span>
          </div>

          {/* Stat 3: Technologies Explored */}
          <div className="stat-item">
            <span className="stat-value">{allSkills}+</span>
            <span className="stat-label">Technologies &amp; Tools</span>
            <span className="stat-note">Modern Engineering Stack</span>
          </div>

          {/* Stat 4: Areas of Focus */}
          <div className="stat-item">
            <span className="stat-value">0{coreDisciplines}</span>
            <span className="stat-label">Core Disciplines</span>
            <span className="stat-note">Dev, UI/UX &amp; Direction</span>
          </div>
        </div>
      </div>
    </section>
  );
};
