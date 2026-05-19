# NTC Website v2 — Client Handover

> **Live URL:** https://ntc-website-red.vercel.app/
> **GitHub Repo:** https://github.com/unrealdesignsae/ntc-website-v2
> **Last deployed commit:** `31b9b970` — *chore: exclude large zip from git tracking*

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + GSAP |
| 3D / WebGL | Three.js |
| Icons | Lucide React + Tabler Icons |
| UI Components | shadcn/ui (Base UI) |
| Hosting | Vercel |

---

## 📁 Project Structure

```
ntc-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (metadata, fonts, global styles)
│   │   ├── page.tsx         # Homepage — assembles all sections
│   │   ├── globals.css      # Design tokens & global CSS
│   │   ├── robots.ts        # SEO: robots.txt generation
│   │   └── sitemap.ts       # SEO: sitemap.xml generation
│   ├── components/
│   │   ├── navbar.tsx       # Sticky navigation bar
│   │   ├── hero.tsx         # Hero section with background video
│   │   ├── hero-v2.tsx      # Alternative hero variant
│   │   ├── ticker.tsx       # Scrolling ticker / marquee
│   │   ├── services.tsx     # Services/offerings section
│   │   ├── projects.tsx     # Portfolio / case studies grid
│   │   ├── stats-section.tsx# Animated stats counters
│   │   ├── node-canvas.tsx  # Interactive WebGL globe (Three.js)
│   │   ├── founder.tsx      # Founder profile section
│   │   ├── halide-landing.tsx # Full-bleed editorial landing block
│   │   ├── tech-stack.tsx   # Technology logos grid
│   │   ├── process.tsx      # Our process / workflow section
│   │   ├── cta-band.tsx     # Call-to-action strip
│   │   ├── contact.tsx      # Contact form section
│   │   ├── footer.tsx       # Site footer
│   │   └── ui/              # Shared UI primitives (buttons, cards, etc.)
│   ├── lib/                 # Utility functions & helpers
│   └── videos/              # Bundled video assets
├── public/
│   └── images/              # Static images (logos, photos, media)
├── brand/                   # Brand guidelines & assets
├── deliverables/            # Client deliverable files
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment settings
└── package.json             # Dependencies
```

---

## 🛠 Local Development

### Prerequisites

- **Node.js** v20+ — [Download](https://nodejs.org/)
- **npm** v10+ (comes with Node.js)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/unrealdesignsae/ntc-website-v2.git
cd ntc-website-v2

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

The site will be available at **http://localhost:3000**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint code quality checks |

---

## 🌐 Deployment

The site is deployed on **Vercel** and automatically deploys on every push to the `master` branch.

- **Production URL:** https://ntc-website-red.vercel.app/
- **Vercel Project:** `ntc-website-v2`
- **GitHub Integration:** Auto-deploy on push to `master`

### Manual Deploy (via Vercel CLI)

```bash
# Install Vercel CLI globally (once)
npm install -g vercel

# Deploy to production
vercel --prod
```

---

## ✏️ Making Content Changes

### Update Text / Copy
All page content lives in the component files under `src/components/`. Each section is a self-contained `.tsx` file.

### Update Images
Place new images in the `public/images/` folder and reference them as `/images/your-file.jpg` in components.

### Update Videos
Replace or add `.mp4` files in `src/videos/` (bundled) or `public/` (static).

### Add a New Page
1. Create a folder under `src/app/your-page-name/`
2. Add a `page.tsx` file inside it
3. The route will automatically be available at `/your-page-name`

---

## 🎨 Design System

The site uses **Tailwind CSS v4** with a custom design token set defined in `src/app/globals.css`.

Key tokens:
- `--color-primary` — NTC brand primary
- `--color-accent` — Highlight / call-to-action colour
- `--font-heading` — Display typeface
- `--font-body` — Body copy typeface

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.6 | React framework |
| `react` | 19.2.4 | UI library |
| `framer-motion` | ^12 | Page/component animations |
| `gsap` | ^3.15 | Advanced scroll animations |
| `three` | ^0.184 | 3D globe WebGL render |
| `tailwindcss` | ^4 | Utility-first CSS |
| `@tabler/icons-react` | ^3.43 | Icon library |
| `lucide-react` | ^1.14 | Additional icons |

---

## 🔗 Useful Links

- **Live Site:** https://ntc-website-red.vercel.app/
- **GitHub Repo:** https://github.com/unrealdesignsae/ntc-website-v2
- **Vercel Dashboard:** https://vercel.com/unrealdesignsae-4610s-projects/ntc-website-v2
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs

---

## 📞 Handover Notes

- The `.env` file is **not included** in this repository. If you need environment variables (API keys, etc.), these are managed directly in the Vercel dashboard under **Settings → Environment Variables**.
- The `node_modules/` folder is excluded — run `npm install` to restore it.
- The `ntc-website.zip` (legacy backup) and `.next/` (build cache) are excluded from the handover zip as they are very large.
- The `brand/` folder contains logo files, colour references, and brand guidelines.
- The `deliverables/` folder contains assets prepared for the client.

---

*Developed by [Unreal Designs AE](https://unrealdesigns.ae) · Deployed May 2026*
