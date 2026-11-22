import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Project } from '../types/portfolio';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Projects');
  const allProjects = portfolioData.projects;

  const categories = [
    'All Projects',
    'Development',
    'Creative Projects',
    'Digital Experiences',
    'Experiments'
  ];

  const filteredProjects = selectedFilter === 'All Projects'
    ? allProjects
    : allProjects.filter((p) => p.category === selectedFilter);

  const getCategoryCount = (category: string) => {
    if (category === 'All Projects') return allProjects.length;
    return allProjects.filter((p) => p.category === category).length;
  };

  return (
    <section id="work" className="projects-section" aria-labelledby="projectsSectionTitle">
      <div className="editorial-shell">
        <div className="section-head">
          <div className="eyebrow-tag">
            <span>THE WORKSHELF</span>
            <span className="star">✳</span>
            <span>02 — SELECTED EXHIBITION</span>
          </div>
          <h2 id="projectsSectionTitle">
            Made with <em>intention.</em>
          </h2>
          <p className="section-lead">
            A curated collection of digital spaces, prototypes and utilities. Each piece begins with a deliberate question and evolves through craft.
          </p>
        </div>

        {/* Working Category Filters */}
        <div className="filter-chips-row" role="group" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
              aria-pressed={selectedFilter === cat}
            >
              <span>{cat}</span>
              <span className="pill-count">0{getCategoryCount(cat)}</span>
            </button>
          ))}
        </div>

        {/* Editorial Projects Grid */}
        <div className="projects-editorial-grid">
          {filteredProjects.map((project: Project) => (
            <article key={project.id} className="project-editorial-card">
              {/* Asymmetric Visual Artwork Thumbnail */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-visual-canvas theme-${project.visualTheme}`}
                aria-label={`Open live project demo: ${project.title}`}
              >
                <div className="project-canvas-badge">
                  <span>{project.category.toUpperCase()}</span>
                  <span>№ {project.number}</span>
                </div>

                {project.visualTheme === 'letters' && (
                  <div className="letters-paper" aria-hidden="true">
                    <span className="letters-small">DEAR YOU,</span>
                    <span className="letters-script">some words<br />deserve to stay.</span>
                    <span className="letters-seal">K</span>
                  </div>
                )}

                {project.visualTheme === 'quill' && (
                  <>
                    <div className="quill-arch-art" aria-hidden="true" />
                    <div className="quill-feather-art" aria-hidden="true">✦</div>
                  </>
                )}

                {project.visualTheme === 'scale' && (
                  <div className="scale-window-art" aria-hidden="true">
                    <div className="scale-dots"><i /><i /><i /></div>
                    <div className="scale-url">scale.link/<b>your-idea</b></div>
                  </div>
                )}

                {project.visualTheme === 'swiftly' && (
                  <div className="swiftly-pin" aria-hidden="true">✦</div>
                )}

                <span className="project-canvas-action" aria-hidden="true">↗</span>
              </a>

              {/* Project Card Meta Information */}
              <div className="project-card-meta">
                <div>
                  <p className="project-category-tag">{project.category} · {project.number}</p>
                  <h3>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <p className="project-card-desc">{project.description}</p>
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-arrow-icon"
                  aria-label={`Visit ${project.title}`}
                >
                  ↗
                </a>
              </div>

              {/* Tech Stack Pills */}
              <div className="project-tech-pills">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
