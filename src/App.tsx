import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { StatsStrip } from './components/StatsStrip';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { CreativeGallery } from './components/CreativeGallery';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  };

  return (
    <>
      {/* Ambient Film Grain Overlay */}
      <div className="ambient-grain" aria-hidden="true" />

      {/* Navigation Header */}
      <Navbar onOpenContact={() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Main Editorial Content */}
      <main>
        {/* 01. Hero & Art-Directed Carousel */}
        <HeroCarousel />

        {/* 02. Professional Statistics Strip */}
        <StatsStrip />

        {/* 03. Selected Projects Exhibition */}
        <ProjectsSection />

        {/* 04. Split About Section & Image Studio */}
        <AboutSection />

        {/* 05. Experience & Creative Journey Timeline */}
        <JourneySection />

        {/* 06. Skills & Technologies Grid */}
        <SkillsSection />

        {/* 07. Certifications & Credentials */}
        <CertificationsSection />

        {/* 08. Creative Space / Artistic Gallery */}
        <CreativeGallery />

        {/* 09. Closing Contact Invitation */}
        <ContactSection onShowToast={showToast} />
      </main>

      {/* 10. Colophon Footer */}
      <Footer />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="editorial-toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default App;
