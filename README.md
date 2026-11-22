# Afshaan Shaikh — Midnight Editorial Portfolio

A premium editorial personal portfolio website combining the visual aesthetics of a modern creative technology studio with a midnight literary atmosphere.

**Target Identity:** Afshaan Shaikh  
**Visual Direction:** Midnight Editorial  
**Palette:** Deep Midnight (`#0A0B10`), Ink Black (`#11121A`), Charcoal (`#1B1B24`), Warm Ivory (`#F2EADD`), Antique Parchment (`#DED1B9`), Muted Champagne (`#C5A574` / `#DFC499`), Soft Silver (`#AAA8AB`).

---

## Architecture & Technology Stack

The application is built with a modern, high-performance web development stack:

- **Framework & Language:** React 18 + TypeScript + Vite 6
- **CSS Architecture:** Custom responsive design token system, CSS Grid, Flexbox, and Bootstrap 5.3 layout foundations
- **Typography:** Google Fonts featuring *Cormorant Garamond* (editorial serif), *Manrope* (modern sans-serif), *DM Mono* (technical metadata), and *Caveat* (handwritten accents)
- **Central Configuration:** [`src/data/portfolioData.ts`](./src/data/portfolioData.ts) governs all editable content, projects, skills, journey milestones, certifications, and social links in a single location
- **Client-Side Image Studio:** In-browser Canvas crop, zoom, and framing with persistent storage

---

## Local Development & Preview

The Vite development server is configured to run at:

```bash
npm run dev
```

URL: [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```

---

## Sections Included

1. **Header & Sticky Navigation:** Wordmark, monogram `AS`, reading progress bar, smooth anchor scrolling, and an accessible 3-line mobile hamburger menu with a full-screen drawer overlay.
2. **Hero & Image-Led Carousel:** Full-width editorial split layout with 4 action links (`Explore My Work`, `About Me`, `My Creative Journey`, `Get In Touch`) and a 3-slide artistic carousel with slide numbering, previous/next controls, dot pagination, and reduced-motion support.
3. **Statistics Strip:** Real derived metrics computed dynamically from `portfolioData.ts` (Projects Created, Creative Works, Technologies Explored, Core Disciplines).
4. **About Me & Image Studio:** Split editorial biography with dropcap styling, poetic quote, "Currently Exploring" chips, and an interactive studio modal for uploading, cropping, zooming, and downloading custom portrait photos.
5. **Selected Projects Exhibition:** Curated showcase featuring the 4 verified projects (**Khath & Co.**, **The Artisans Quill**, **Scale Link**, **Swiftly**) with working category filters (*All Projects*, *Development*, *Creative Projects*, *Digital Experiences*, *Experiments*) and live demo links.
6. **Creative Journey (Timeline):** Chronological vertical timeline detailing education, technical foundations, and creative milestones.
7. **Skills & Technologies:** Organized into 6 categories (Frontend Development, Programming, Frameworks & Libraries, UI/UX & Design, Tools & Platforms, Creative Skills) without arbitrary percentage bars.
8. **Certifications & Credentials:** Verified coursework and specializations with organization and year metadata.
9. **Creative Space (Gallery & Lightbox):** Filterable gallery of visual concepts, digital art, illustrations, and poetic reflections with a fullscreen lightbox modal.
10. **Closing Contact:** Form validation (Name, Email, Subject, Message) with an honest clipboard copy fallback and direct mail client integration.
11. **Colophon Footer:** Monogram mark, poetic closing line, dynamic year, and back-to-top interaction.

---

## Centralized Data Management

All content can be edited in [`src/data/portfolioData.ts`](./src/data/portfolioData.ts). No content is scattered across components.
