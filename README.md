# Lamees Adel — Portfolio

Personal portfolio site: projects, experience, achievements, certifications, and a
small in-browser arcade (reaction test, memory match, tic-tac-toe vs. an AI).

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Framer Motion for scroll reveals and the tilt/hover interactions
- canvas-confetti for the arcade win states

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Editable data lives in `src/data/`:

- `projects.ts` — project cards (repo, live link, tags)
- `content.ts` — experience, volunteering, achievements, certifications, skills, socials

Images live in `public/images/`, the résumé in `public/cv/`.

## Deploy

Deploys as a standard Next.js app — push to a Vercel project pointed at this repo.
