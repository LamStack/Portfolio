# Lamees Adel, Portfolio

A scroll-driven, cinematic portfolio: kinetic hero typography, a pinned
"flagship project" reveal for Auctor, a horizontal-scroll gallery for the
rest of the projects, color-wipe reveals on the achievements grid, and a
mini arcade (reaction test, memory match, tic-tac-toe vs. an AI) at the end.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- GSAP + ScrollTrigger for the scroll-linked animation and pinned sections
- Lenis for smooth scrolling
- Framer Motion for the arcade and lightbox interactions
- canvas-confetti for the arcade win states

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Editable data lives in `src/data/`:

- `projects.ts`: project cards (repo, live link, tags). Auctor is pulled out
  as the flagship in `FlagshipProject.tsx`; everything else renders in the
  horizontal gallery.
- `content.ts`: experience, volunteering, achievements, certifications,
  skills, socials.

Images live in `public/images/`, the resume in `public/cv/`.

The scroll sections live in `src/components/scroll/`, one file per section,
assembled in `src/app/page.tsx`. `SmoothScroll.tsx` wires up Lenis and GSAP's
ticker; it also intercepts in-page anchor links so nav clicks scroll smoothly
instead of jumping.

## Deploy

Deploys as a standard Next.js app, push to a Vercel project pointed at this repo.
