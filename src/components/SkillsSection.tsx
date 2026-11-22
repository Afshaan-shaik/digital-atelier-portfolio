import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const categories = portfolioData.skills;

  return (
    <section id="skills" className="skills-section" aria-labelledby="skillsSectionTitle">
      <div className="editorial-shell">
        <div className="section-head">
          <div className="eyebrow-tag">
            <span>THE ATELIER TOOLKIT</span>
            <span className="star">✳</span>
            <span>04 — CAPABILITIES</span>
          </div>
          <h2 id="skillsSectionTitle">
            Curiosity, meet <em>craft.</em>
          </h2>
          <p className="section-lead">
            A considered set of languages, frameworks and creative methodologies used to translate abstract ideas into resilient, polished digital systems.
          </p>
        </div>

        {/* 6 Skills Categories Grid */}
        <div className="skills-categories-grid">
          {categories.map((category, index) => (
            <div key={category.id} className="skill-category-card">
              <div className="skill-card-head">
                <h3>{category.title}</h3>
                <span className="skill-card-index">0{index + 1}</span>
              </div>
              <div className="skill-items-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item-row">
                    <span className="star-bullet" aria-hidden="true">✦</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
