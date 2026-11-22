import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

interface ContactSectionProps {
  onShowToast: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastPreparedText, setLastPreparedText] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please include a subject topic.';
    if (!formData.message.trim()) {
      errs.message = 'Please write a brief message.';
    } else if (formData.message.trim().length < 6) {
      errs.message = 'Message should be at least 6 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatusMessage('Please correct the highlighted fields above.');
      setIsSuccess(false);
      return;
    }

    const recipient = portfolioData.socials.email;
    const emailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const emailBody = `Hello Afshaan,\n\n${formData.message}\n\n—\nFrom: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nSent via Midnight Editorial Portfolio`;

    setLastPreparedText(`Subject: ${formData.subject}\n\n${emailBody}`);

    if (recipient && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      window.location.href = `mailto:${recipient}?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;
      setStatusMessage('Your default mail client has opened with your prepared inquiry.');
      setIsSuccess(true);
      onShowToast('Mail client opened.');
    } else {
      // Honest clipboard copy fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(`Subject: ${formData.subject}\n\n${emailBody}`).then(() => {
          setStatusMessage('Direct email sending is unconfigured. Your message has been prepared and copied to your clipboard so you can paste and send it directly!');
          setIsSuccess(true);
          onShowToast('Message copied to clipboard.');
        }).catch(() => {
          setStatusMessage('Direct email sending is unconfigured. Please copy the message text manually below.');
          setIsSuccess(false);
        });
      } else {
        setStatusMessage('Direct email sending is unconfigured. Configure email in portfolioData.ts to enable automatic mail opening.');
        setIsSuccess(false);
      }
    }
  };

  const handleCopyAgain = () => {
    if (lastPreparedText && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastPreparedText).then(() => {
        onShowToast('Message re-copied to clipboard.');
      });
    }
  };

  return (
    <section id="contact" className="closing-contact-section" aria-labelledby="contactTitle">
      <div className="editorial-shell">
        <div className="contact-editorial-card">
          <span className="contact-card-star" aria-hidden="true">✳</span>
          <div className="eyebrow-tag">
            <span>THE NEXT CHAPTER</span>
            <span className="star">✳</span>
            <span>07 — CONVERSATION</span>
          </div>

          <h2 id="contactTitle" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', fontWeight: 400, lineHeight: 0.95, margin: '16px 0 20px', color: 'var(--warm-ivory)' }}>
            Every interesting idea deserves a <em>conversation.</em>
          </h2>

          <p style={{ color: 'var(--antique-parchment)', maxWidth: '480px', fontSize: '0.95rem', lineHeight: '1.8' }}>
            I am always receptive to thoughtful inquiries, collaborative opportunities, or meaningful discussions about software craft and creative direction.
          </p>

          {/* Form */}
          <form className="contact-form-layout" onSubmit={handleSubmit} noValidate>
            <div className="contact-field-group">
              <label htmlFor="senderName" className="field-label">YOUR NAME *</label>
              <input
                id="senderName"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="How should I address you?"
                required
              />
              <span className="contact-field-error">{errors.name}</span>
            </div>

            <div className="contact-field-group">
              <label htmlFor="senderEmail" className="field-label">YOUR EMAIL *</label>
              <input
                id="senderEmail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@domain.com"
                required
              />
              <span className="contact-field-error">{errors.email}</span>
            </div>

            <div className="contact-field-group field-full-width">
              <label htmlFor="senderSubject" className="field-label">TOPIC / SUBJECT *</label>
              <input
                id="senderSubject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Collaboration on an upcoming web experience"
                required
              />
              <span className="contact-field-error">{errors.subject}</span>
            </div>

            <div className="contact-field-group field-full-width">
              <label htmlFor="senderMessage" className="field-label">MESSAGE *</label>
              <textarea
                id="senderMessage"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me a little about your project, vision, or idea…"
                required
              />
              <span className="contact-field-error">{errors.message}</span>
            </div>

            <div className="form-actions-bar">
              <button className="btn-champagne" type="submit">
                <span>Prepare Message</span>
                <span aria-hidden="true">↗</span>
              </button>
              {lastPreparedText && (
                <button
                  type="button"
                  className="btn-outline-champagne"
                  onClick={handleCopyAgain}
                >
                  <span>Re-Copy Prepared Message</span>
                  <span aria-hidden="true">⎘</span>
                </button>
              )}
            </div>

            {statusMessage && (
              <p className={`contact-status-feedback ${isSuccess ? 'success' : 'text-danger'}`} role="status">
                {statusMessage}
              </p>
            )}
          </form>

          {/* Social Channels List (Only render available destinations) */}
          <div className="contact-social-channels">
            <span className="socials-heading">FIND ME ELSEWHERE</span>
            {portfolioData.socials.github && (
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-nav-link"
                aria-label="Visit Afshaan Shaikh on GitHub"
              >
                GitHub ↗
              </a>
            )}
            {portfolioData.socials.instagram && (
              <a
                href={portfolioData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-nav-link"
                aria-label="Visit Afshaan Shaikh on Instagram"
              >
                Instagram ↗
              </a>
            )}
            {portfolioData.socials.linkedin && (
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-nav-link"
                aria-label="Visit Afshaan Shaikh on LinkedIn"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
