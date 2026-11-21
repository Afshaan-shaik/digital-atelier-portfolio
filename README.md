# The Digital Atelier — Afshan Sheikh

A completely independent, bespoke personal portfolio website exploring the intersection of creative technology, interface craft, and poetic editorial storytelling.

**Visual Direction:** Concept 02 — Dark Academia / Ink  
**Core Palette:** Obsidian (`#100F0E`), Dark Walnut (`#211B16`), Deep Brown (`#241E18`), Antique Parchment (`#E8D9BD`), Warm Muted (`#B4A58F`), Antique Gold (`#B99865` / `#D0B17C`).

---

## Architecture & Technology Stack

The site is built with pure, high-performance web standards (HTML5, CSS3, JavaScript ESNext) with zero heavy external dependencies. It loads instantly, delivers pristine typography, and provides smooth, accessible interactions across all modern browsers and viewport sizes.

- **Semantic HTML5:** Full landmark layout (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), ARIA attributes, and accessible labels.
- **Modern CSS3:** Custom properties design token system, CSS Grid & Flexbox, smooth transitions, ambient grain filter, and `prefers-reduced-motion` compliance.
- **Typography:** Google Fonts featuring *Cormorant Garamond* (editorial serif), *Manrope* (humanistic body), *DM Mono* (technical metadata), and *Caveat* (marginalia script).
- **Client Storage:** IndexedDB (`digital-atelier-local`) for persistent browser-local portrait editing and cropping.

---

## File Structure

```
digital-atelier-portfolio/
├── .gitignore               # Clean git exclusion rules
├── ANTIGRAVITY_PROMPT.md    # Master creative specification
├── README.md                # Documentation and deployment instructions
├── app.js                   # Client interactions, navigation, filter, and portrait workshop
├── assets/
│   └── favicon.svg          # Custom Dark Academia monogram favicon
├── index.html               # Main portfolio markup and exhibition content
├── styles.css               # Design tokens, responsive grid, and Dark Academia aesthetic
└── vercel.json              # Vercel deployment headers and routing
```

---

## Running Locally

To run and preview the site locally, launch any standard HTTP static server from the project root:

### Option A: Python (Recommended)
```bash
python -m http.server 5173
```
Then visit [http://localhost:5173](http://localhost:5173) in your browser.

### Option B: Node / npx
```bash
npx serve .
```

---

## Selected Projects & Real Links

The initial digital exhibition is seeded with Afshan Sheikh's verified web projects:

1. **Khath & Co.** — [https://khath-and-co.vercel.app/#top](https://khath-and-co.vercel.app/#top)  
   *A correspondence studio and letter-writing space for thoughtful words, personal notes and meaningful connections.*
2. **The Artisans Quill** — [https://the-artisans-quill.vercel.app/](https://the-artisans-quill.vercel.app/)  
   *A creative home for visual works, digital art and the many forms that imagination can take.*
3. **Scale Link** — [https://scale-link-six.vercel.app/](https://scale-link-six.vercel.app/)  
   *A link-focused web utility exploring quick actions, clear workflows and a practical interface.*
4. **Swiftly** — [https://swiftly-five-gold.vercel.app/](https://swiftly-five-gold.vercel.app/)  
   *A map-based delivery-tracking prototype exploring how location and movement can be made intuitive.*

---

## Personalization & Configuration Guide

### 1. Contact Form Email Destination
By default, direct backend email sending is intentionally unconfigured to prevent sending to dummy or unauthorized addresses. When a visitor submits the form:
- Form fields are validated client-side.
- The message is formatted with a subject, sender details, and message body.
- The prepared message is automatically copied to the visitor's clipboard with confirmation toast feedback.

To configure direct opening of your preferred email client via `mailto`:
1. Open `app.js`.
2. Locate line 8:
   ```javascript
   const CONTACT_EMAIL = '';
   ```
3. Set your valid email address:
   ```javascript
   const CONTACT_EMAIL = 'your-email@example.com';
   ```

### 2. Portrait Workshop Workflow
The About section includes an interactive portrait workshop:
- Click **"Edit portrait"** to open the modal studio.
- Upload any image (JPG, PNG, WebP up to 12 MB).
- Adjust the Zoom slider (100% – 250%) and Horizontal / Vertical pan sliders.
- Click **"Save Local Preview"** to crop and save your portrait into your browser's IndexedDB. Your framing persists automatically across page reloads in that browser.
- Click **"Download cropped portrait asset file"** to export the high-resolution JPEG (`afshan-sheikh-portrait-atelier.jpg`).
- **To publish worldwide:** Place your exported image into the `assets/` directory (e.g. `assets/portrait.jpg`), update the `src` attribute of `#portraitImage` in `index.html`, and redeploy.

### 3. Social Profiles
Verified social destinations are integrated in the header, contact module, and footer:
- **GitHub:** [https://github.com/Afshaan-shaik](https://github.com/Afshaan-shaik)
- **Instagram:** [https://www.instagram.com/_thenameisshaan/](https://www.instagram.com/_thenameisshaan/)

---

## Deploying to Vercel (Independent New Deployment)

This is a brand-new website requiring its own independent Vercel project (do not connect to or overwrite any other existing site):

### Step 1: Push to a New GitHub Repository
```bash
git add .
git commit -m "feat: initial commit of The Digital Atelier portfolio"
git branch -M main
git remote add origin https://github.com/Afshaan-shaik/<YOUR-NEW-REPO-NAME>.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Select your new GitHub repository.
4. Framework Preset: **Other** (Static Site).
5. Root Directory: `./` (leave default).
6. Build Command: Leave blank (static HTML).
7. Output Directory: Leave blank.
8. Click **Deploy**.

Vercel will build and assign your new production URL (e.g., `the-digital-atelier.vercel.app`).
