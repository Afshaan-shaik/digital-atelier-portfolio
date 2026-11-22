export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Development' | 'Creative Projects' | 'Digital Experiences' | 'Experiments';
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  visualTheme: 'letters' | 'quill' | 'scale' | 'swiftly';
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface JourneyMilestone {
  id: string;
  year: string;
  period?: string;
  title: string;
  organization?: string;
  category: 'Education' | 'Milestone' | 'Development' | 'Creative';
  description: string;
  tags?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  verificationUrl?: string;
  badge?: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: 'Digital Art' | 'Visual Concepts' | 'Illustrations' | 'Writing & Poetry';
  description: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  accentColor?: string;
  year: string;
  contentSnippet?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatarUrl?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    monogram: string;
    eyebrow: string;
    headline: string;
    subheadline: string;
    bioIntro: string;
    bioFull: string[];
    quote: string;
    currentlyExploring: string[];
    location: string;
    availability: string;
  };
  socials: {
    github: string;
    instagram: string;
    linkedin?: string;
    email?: string;
  };
  heroSlides: {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    theme: 'cosmos' | 'quill' | 'contours';
    caption: string;
  }[];
  projects: Project[];
  skills: SkillCategory[];
  journey: JourneyMilestone[];
  certifications: Certification[];
  creativeWorks: CreativeItem[];
  testimonials: Testimonial[];
}
