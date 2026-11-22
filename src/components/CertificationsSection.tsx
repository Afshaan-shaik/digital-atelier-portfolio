import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const certifications = portfolioData.certifications;

  return (
    <section id="credentials" className="credentials-section" aria-labelledby="credentialsSectionTitle">
      <div className="editorial-shell">
        <div className="section-head">
          <div className="eyebrow-tag">
            <span>VERIFIED RIGOR</span>
            <span className="star">✳</span>
            <span>05 — CREDENTIALS</span>
          </div>
          <h2 id="credentialsSectionTitle">
            Studied with <em>discipline.</em>
          </h2>
          <p className="section-lead">
            Formal learning tracks and certified specializations demonstrating foundational computing logic, interface engineering, and modern standards.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="credentials-grid">
          {certifications.map((cert) => (
            <article key={cert.id} className="credential-card">
              <div>
                {cert.badge && <span className="credential-badge">{cert.badge}</span>}
                <h3>{cert.title}</h3>
                <p className="credential-desc">{cert.description}</p>
              </div>

              <div className="credential-footer">
                <span>{cert.issuer.toUpperCase()}</span>
                <span>{cert.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
