import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Afshaan Shaikh',
    monogram: 'AS',
    eyebrow: 'PERSONAL PORTFOLIO • CREATIVE TECHNOLOGIST',
    headline: 'Building digital experiences, with imagination beyond the interface.',
    subheadline: 'Between logic & imagination.',
    bioIntro: "I'm a creative thinker and aspiring developer exploring the intersection of technology, design and artistic expression. I like building useful things with a little soul in them.",
    bioFull: [
      "I am drawn equally to the rigorous structural beauty of software engineering and the quiet emotional power of visual design. To me, code is not merely instructions for a machine; it is a canvas for human communication.",
      "My creative methodology balances engineering discipline with typographic restraint. Rather than building generic software interfaces, I treat every project as an editorial publication—crafted with deliberate hierarchy, intentional whitespace, and poetic pacing.",
      "Whether developing responsive web platforms, mapping kinetic spatial data, or exploring digital art forms, my goal remains consistent: to craft thoughtful digital spaces that feel tactile, memorable, and authentically crafted."
    ],
    quote: 'Technology is the instrument. Imagination is the composition.',
    currentlyExploring: [
      'Editorial Layout Systems & CSS Grid Architecture',
      'Kinetic Micro-interactions & Spatial UI',
      'Modern Frontend Performance & Accessibility',
      'Digital Typography & Monogram Design'
    ],
    location: 'Open to Worldwide Opportunities',
    availability: 'Available for Collaborative Projects'
  },

  socials: {
    github: 'https://github.com/Afshaan-shaik',
    instagram: 'https://www.instagram.com/_thenameisshaan/',
    linkedin: 'https://www.linkedin.com/in/afshaanshaikh',
    email: ''     // Configurable: add your contact inbox when ready
  },

  heroSlides: [
    {
      id: 'slide-1',
      number: '01',
      title: 'The Architectural Cosmos',
      subtitle: 'Where algorithmic precision meets celestial elegance',
      theme: 'cosmos',
      caption: 'FIG. 001 — THE ART OF MAKING'
    },
    {
      id: 'slide-2',
      number: '02',
      title: 'The Artisan’s Quill',
      subtitle: 'Digital manuscripts crafted with editorial distinction',
      theme: 'quill',
      caption: 'FIG. 002 — CORRESPONDENCE & WORDCRAFT'
    },
    {
      id: 'slide-3',
      number: '03',
      title: 'Cartographic Movement',
      subtitle: 'Topographical routing and dynamic spatial clarity',
      theme: 'contours',
      caption: 'FIG. 003 — SPATIAL EXPLORATION'
    }
  ],

  projects: [
    {
      id: 'khath-and-co',
      number: '01',
      title: 'Khath & Co.',
      tagline: 'A correspondence studio for thoughtful words & personal notes.',
      description: 'A bespoke letter-writing space designed for personal notes, poetic expression, and meaningful connections. Features a tactile stationery aesthetic with digital wax seals and vintage typography.',
      category: 'Creative Projects',
      techStack: ['React', 'CSS Modules', 'Web Typography', 'Editorial UI'],
      liveUrl: 'https://khath-and-co.vercel.app/#top',
      visualTheme: 'letters',
      featured: true
    },
    {
      id: 'the-artisans-quill',
      number: '02',
      title: 'The Artisans Quill',
      tagline: 'A creative sanctuary for visual works and digital art.',
      description: 'A curated digital gallery celebrating visual arts, illustration, and imaginative literature. Structured like an art exhibition with vaulted arches, golden ratios, and ambient atmosphere.',
      category: 'Digital Experiences',
      techStack: ['Next.js', 'Framer Motion', 'Canvas API', 'Dark Aesthetic'],
      liveUrl: 'https://the-artisans-quill.vercel.app/',
      visualTheme: 'quill',
      featured: true
    },
    {
      id: 'scale-link',
      number: '03',
      title: 'Scale Link',
      tagline: 'A minimalist link-focused utility exploring rapid workflows.',
      description: 'An architectural web utility designed to simplify URL operations and metadata organization. Emphasizes clean monospace typography, blueprint grids, and keyboard-first accessibility.',
      category: 'Development',
      techStack: ['TypeScript', 'Vite', 'REST APIs', 'Monospace UI'],
      liveUrl: 'https://scale-link-six.vercel.app/',
      visualTheme: 'scale'
    },
    {
      id: 'swiftly',
      number: '04',
      title: 'Swiftly',
      tagline: 'A map-based delivery tracking prototype exploring movement.',
      description: 'An interactive logistics prototype investigating how real-time geographic movement and delivery checkpoints can be rendered with spatial clarity and elegant cartographic styling.',
      category: 'Experiments',
      techStack: ['JavaScript', 'Leaflet / Mapbox', 'GeoJSON', 'Spatial UI'],
      liveUrl: 'https://swiftly-five-gold.vercel.app/',
      visualTheme: 'swiftly'
    }
  ],

  skills: [
    {
      id: 'frontend',
      title: 'Frontend Development',
      skills: ['HTML5 & Semantic Architecture', 'CSS3 & Custom Properties', 'JavaScript (ESNext)', 'TypeScript', 'Responsive Layout Systems']
    },
    {
      id: 'programming',
      title: 'Programming & Logic',
      skills: ['Python', 'Object-Oriented Programming', 'Data Structures & Algorithms', 'State Management', 'Asynchronous Workflows']
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Libraries',
      skills: ['React', 'Vite', 'Bootstrap 5', 'Framer Motion', 'Tailwind CSS']
    },
    {
      id: 'ui-ux',
      title: 'UI/UX & Design',
      skills: ['Editorial Layout Hierarchy', 'Design Systems', 'Typography & Kerning', 'Accessibility (WCAG 2.1)', 'Rapid Wireframing']
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      skills: ['Git & GitHub', 'VS Code', 'Vercel Deployment', 'Chrome DevTools', 'IndexedDB / Web Storage']
    },
    {
      id: 'creative',
      title: 'Creative Practice',
      skills: ['Digital Art & Illustration', 'Visual Storytelling', 'Atmospheric Lighting', 'Poetic Writing', 'Creative Direction']
    }
  ],

  journey: [
    {
      id: 'journey-1',
      year: '2024 — Present',
      period: 'Continuous Practice',
      title: 'Creative Technology & Bespoke Web Engineering',
      organization: 'Independent Atelier',
      category: 'Development',
      description: 'Dedicated exploration into the confluence of software architecture and fine typography. Developing independently hosted web applications, editorial interactive portfolios, and experimental UI systems.',
      tags: ['React', 'TypeScript', 'Web Architecture', 'UI Polish']
    },
    {
      id: 'journey-2',
      year: '2023 — 2024',
      period: 'Exploration & Prototyping',
      title: 'Modern Frontend & Interactive Prototyping',
      organization: 'Self-Directed Studio',
      category: 'Milestone',
      description: 'Engineered functional prototypes exploring real-world utilities (Scale Link), spatial map interactions (Swiftly), and digital correspondence platforms (Khath & Co.).',
      tags: ['Prototyping', 'Spatial Maps', 'Utility Apps', 'API Integration']
    },
    {
      id: 'journey-3',
      year: '2022 — 2023',
      period: 'Foundations',
      title: 'Computer Science & Software Foundations',
      organization: 'Academic & Technical Training',
      category: 'Education',
      description: 'Mastered foundational computing paradigms, algorithmic problem solving, Python programming, and core web standards (HTML, CSS, JavaScript).',
      tags: ['Python', 'Web Fundamentals', 'Algorithms', 'Logic']
    },
    {
      id: 'journey-4',
      year: '2021 — 2022',
      period: 'Creative Origins',
      title: 'Visual Arts, Typography & Digital Composition',
      organization: 'Creative Practice',
      category: 'Creative',
      description: 'Developed an artistic sensibility in classical composition, book design, editorial typography, and digital illustration—laying the aesthetic groundwork for The Digital Atelier.',
      tags: ['Editorial Design', 'Typography', 'Illustration', 'Aesthetics']
    }
  ],

  certifications: [
    {
      id: 'cert-1',
      title: 'Modern Web Development & Software Engineering Principles',
      issuer: 'Technical Learning Path',
      year: '2024',
      description: 'Rigorous coursework covering modern component architectures, TypeScript integration, responsive fluid typography, and performance optimization.',
      badge: 'Web Architecture'
    },
    {
      id: 'cert-2',
      title: 'Python for Problem Solving & Algorithmic Logic',
      issuer: 'Computer Science Track',
      year: '2023',
      description: 'In-depth mastery of programmatic logic, data manipulation, algorithm design, and automated workflows using Python.',
      badge: 'Programming'
    },
    {
      id: 'cert-3',
      title: 'Responsive Design & Web Accessibility Standards (a11y)',
      issuer: 'Interface Guidelines',
      year: '2023',
      description: 'Practical training on semantic web structures, ARIA standards, keyboard navigation, color contrast ratios, and cross-device testing.',
      badge: 'UI/UX & a11y'
    }
  ],

  creativeWorks: [
    {
      id: 'creative-1',
      title: 'Study in Midnight & Gold',
      category: 'Visual Concepts',
      year: '2024',
      aspectRatio: 'landscape',
      description: 'A digital composition exploring architectural archways, celestial orbits, and the warm luminous contrast of antique gold against deep charcoal.',
      contentSnippet: '“Architecture is frozen music; geometry is frozen thought.”'
    },
    {
      id: 'creative-2',
      title: 'The Cartographer’s Notebook',
      category: 'Digital Art',
      year: '2024',
      aspectRatio: 'portrait',
      description: 'Topographic contour drawings and interconnected route nodes exploring how human movement maps across abstract coordinates.',
      contentSnippet: '“Every line drawn across the map is a journey contemplated.”'
    },
    {
      id: 'creative-3',
      title: 'Ink & Correspondence',
      category: 'Illustrations',
      year: '2023',
      aspectRatio: 'square',
      description: 'A study of hand-folded letter sheets, antique wax impressions, and editorial typography paying homage to classic lettercraft.',
      contentSnippet: '“Some thoughts only find their truth when committed to paper.”'
    },
    {
      id: 'creative-4',
      title: 'Marginalia: On Making Things',
      category: 'Writing & Poetry',
      year: '2024',
      aspectRatio: 'landscape',
      description: 'Reflections on the intersection of engineering and emotion: why software feels warmer when crafted with poetic intention.',
      contentSnippet: '“Code with intention. Create with feeling. The machine remembers only what you cared enough to write.”'
    }
  ],

  testimonials: [
    // Genuine recommendations only: left empty or reserved for verified endorsements
  ]
};
