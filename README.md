# Jai Krishna K — Portfolio

Personal portfolio website for Jai Krishna K, AI Engineer & Full-Stack Developer.

## Tech Stack

- **Framework** — React 18 + TypeScript + Vite
- **Styling** — Tailwind CSS v3
- **Animations** — Framer Motion (motion/react) + GSAP ScrollTrigger
- **Fonts** — Montserrat (display) · Inter (body) · JetBrains Mono (code)
- **UI Components** — MagicUI (BlurFade, BorderBeam, NumberTicker, Particles)
- **Icons** — Lucide React

## Sections

- **Hero** — Parallax particles, typewriter role animation, GSAP entrance
- **About** — Sticky scroll with three animated narrative blocks
- **Experience** — Horizontal scroll gallery driven by GSAP ScrollTrigger
- **Projects** — Bento grid with click-to-expand modal popover
- **Skills** — Animated category cards with skill tags
- **Achievements** — Animated number stats + achievement cards
- **Contact** — Two-column layout with mailto form

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # MagicUI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Achievements.tsx
│   └── Contact.tsx
├── data/
│   └── portfolio.ts     # All content — edit this to update the site
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Customization

All personal data (name, links, experience, projects, skills, achievements) lives in `src/data/portfolio.ts`. Edit that file to update the content without touching any component logic.
