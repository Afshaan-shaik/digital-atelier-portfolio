# ANTIGRAVITY MASTER PROMPT — BUILD A BRAND-NEW PERSONAL PORTFOLIO

## Project identity

Build a completely new, independent personal portfolio website named **The Digital Atelier** for **Afshan Sheikh**.

**Visual reference:** https://akshathegde.vercel.app/

**Design direction:** Concept 02 — Dark Academia / Ink, with a balanced mixture of technical professionalism, artistic expression, old-school literary aesthetics and poetic editorial storytelling.

**Important project boundary:** This is a NEW website built from a NEW project directory and a NEW deployment. It is NOT a redesign, conversion, migration, fork, continuation or replacement of Cinnestock or any other existing website. Do not import Cinnestock code, its repository, database, storage, authentication, environment variables, deployment settings, components or assets. Do not modify Cinnestock. Treat the reference URL only as visual inspiration for polish and storytelling; do not copy its source, identity or content.

## 1. Start from a clean project

1. Create a new project directory and a new Git repository (or clearly prepare a fresh repository for the owner).
2. Bootstrap a clean application using a suitable modern stack. Prefer the simplest maintainable architecture; do not add dependencies without a reason.
3. Establish new project configuration, metadata, assets, routing (if needed), and deployment setup.
4. Keep all source code, environment configuration and assets independent from every other existing website.
5. Do not claim that the site has been deployed until a real deployment URL is returned and verified.
6. Before implementation, write a concise build plan and component map. Then build the complete site, not just a hero mockup.

## 2. Core creative direction

The experience should feel like an old literary artist's private library meeting a contemporary creative technology studio. It must be elegant, distinctive, spacious and professional — not a generic developer template, not a SaaS landing page, and not an overdecorated vintage scrapbook.

Use the following palette consistently:
- Obsidian: `#100F0E` (main background)
- Dark walnut: `#211B16` (raised sections)
- Deep brown: `#241E18` (cards)
- Antique parchment: `#E8D9BD` (main text)
- Warm muted text: `#B4A58F`
- Antique gold: `#B99865` (restrained accents)
- Muted border: `rgba(185,152,101,.24)`

Typography:
- Cormorant Garamond or a comparable high-quality editorial serif for hero titles, project names and poetic statements.
- Manrope or Inter for readable body text and navigation.
- IBM Plex Mono or DM Mono for labels, metadata and technical details.
- Handwritten typography only for very occasional signature/annotation elements.

Use fine gold rules, old-paper details, botanical or astronomical line art, classical architectural silhouettes, subtle grain and editorial annotations. Keep decorative detail controlled and ensure it never interferes with readability.

## 3. Full site structure and components

### A. Header and navigation
- Monogram and wordmark: `AS / AFSHAN SHEIKH / THE DIGITAL ATELIER`.
- Links: Selected Work, Atelier, About, Journal and Contact.
- Transparent or near-black header with a delicate gold divider.
- Underline and color transitions on hover; smooth anchor navigation.
- Responsive three-line mobile menu with a large, readable overlay/panel.
- All menu controls must work by keyboard and touch.

### B. Hero / opening composition
- Editorial eyebrow such as “Developer × Creative Mind”.
- Large serif headline: “Between logic & imagination.”
- Supporting copy: “I’m Afshan Sheikh — exploring the space where thoughtful technology meets artistic expression. I like building useful things with a little soul in them.” Keep all copy editable.
- Primary CTA: Explore selected work. Secondary CTA: A little about me.
- Art-directed side composition: classical arch, botanical line art, orbital diagram, personal portrait or a refined abstract technical illustration.
- Use gentle entrance motion and clear hierarchy. Do not let animation delay the first usable screen.

### C. Selected work / digital exhibition
Seed the initial portfolio with these real project destinations and editable descriptions:
1. **Khath & Co.** — https://khath-and-co.vercel.app/#top — a letter-writing space for thoughtful words, personal notes and meaningful connections.
2. **The Artisans Quill** — https://the-artisans-quill.vercel.app/ — a creative home for digital art, visual works and artistic expression.
3. **Scale Link** — https://scale-link-six.vercel.app/ — a link-focused web utility project.
4. **Swiftly** — https://swiftly-five-gold.vercel.app/ — a map-based delivery-tracking prototype exploring location and movement.

Present projects as an editorial exhibition, not four identical SaaS cards. Include a featured project, asymmetric image compositions, titles, genuine descriptions, category labels, technology tags only when known, and real live-demo links. Add working category filters: All, Web Experiences, Creative Platforms and Experiments. Every external link should open safely in a new tab. Do not invent client names, awards, statistics or outcomes. Do not use fake metrics.

### D. Technical Atelier / skills
Create a refined skills section using categories such as Development, Interface & Experience, and Creative Practice. Use editable entries and only claim skills confirmed by the owner. Avoid made-up percentages and empty progress bars. Make this section credible to recruiters and technical visitors while retaining the literary visual identity.

### E. About the creator
- Editorial split layout with personal portrait and concise personal story.
- Explain the balance between technical building and artistic curiosity.
- Make name, copy and interests easy to update.
- Include a portrait-selection workflow that accepts common image dimensions and provides preview, crop, zoom and reposition controls.
- Preserve the original uploaded image; never overwrite it destructively.
- The portrait editor must be owner-only in production. Do not expose an unsecured public write endpoint.
- For globally shared changes, use a secure owner-authenticated backend/storage only when the owner configures it. Otherwise provide a local preview/export workflow and clearly explain that local edits are visible only in that browser until the edited asset is deployed.

### F. Journal / marginalia
An optional parchment-inspired note section for short reflections, creative observations and meaningful quotations. All text must be editable. Do not invent personal diary entries. If the owner has no entries, show a quiet optional placeholder or hide the section.

### G. Contact
- Clear invitation for thoughtful projects and conversations.
- Name, email and message fields with client-side validation.
- Do not create a decorative form that silently does nothing.
- Use a real configured email destination or a real backend provider after owner configuration. If neither exists, offer an honest copy-message fallback and state that direct email sending is not configured.
- Do not invent an email address.

### H. Social links
Use these exact destinations:
- Instagram: https://www.instagram.com/_thenameisshaan/
- GitHub: https://github.com/Afshaan-shaik

Use restrained icons and accessible labels. Test both links.

### I. Footer / final chapter
- Poetic closing line, social links, navigation shortcuts, current year and a small monogram/signature.
- Make the ending feel like the final page of a literary book, not a default template footer.

## 4. Interaction and motion

Implement functional navigation, project filtering, buttons, contact validation, portrait editor, scrolling progress and small interaction feedback. Use smooth section reveals and delicate image/line animations. Respect `prefers-reduced-motion`. Avoid excessive parallax, cursor gimmicks, constant movement, huge glows or long preloader delays. Every interactive component must work on both touch and mouse devices.

## 5. Responsive and accessible implementation

Build mobile-first and test at 360px, 390px, 430px, 768px, 1024px, 1280px and 1440px. Desktop should use generous margins and editorial columns; tablets should rebalance columns; mobile should use clean single-column layouts with appropriate spacing. No horizontal overflow, overlapping text, clipped content or hover-only functionality. Use semantic landmarks, labels, accessible names, keyboard focus, sufficient contrast and meaningful image alt text.

## 6. Quality and deployment

- Optimize image assets and lazy-load below-the-fold images.
- Maintain good Core Web Vitals and avoid layout shifts.
- Add page title, description, favicon and social-sharing metadata.
- Test every internal anchor, social URL, project URL and interactive control.
- Run the actual build, lint and tests available in the chosen stack; fix errors before completion.
- Provide a clean README with local run and independent Vercel deployment steps.
- Prepare a NEW Vercel project connected only to this new repository. Do not reuse or overwrite another Vercel project.
- A successful local build is not proof of a live deployment. Report the actual deployment URL only after Vercel confirms it.

## 7. Non-negotiable completion criteria

Deliver the complete working portfolio with all sections above. Do not stop after a screenshot, static concept, hero-only implementation or unconnected mockup. Do not leave dead buttons, fake contact submission, placeholder project links, missing mobile behavior or misleading success messages. Do not delete or alter any other website. At the end, provide a factual implementation report: files created, sections completed, interactions tested, responsive widths checked, build results, any services that still require owner configuration, and the verified new deployment URL if deployment was actually completed.
