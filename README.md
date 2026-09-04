# Lamees Adel, Portfolio

An interactive desktop-style portfolio: a boot screen, draggable windows, a taskbar
and start menu, and apps for projects, experience, achievements, certifications,
a resume viewer, contact, a working terminal, and a small arcade (reaction test,
memory match, tic-tac-toe vs. an AI).

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Framer Motion for window transitions and the arcade
- canvas-confetti for the arcade win states

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Editable data lives in `src/data/`:

- `projects.ts`: project cards (repo, live link, tags)
- `content.ts`: experience, volunteering, achievements, certifications, skills, socials

Images live in `public/images/`, the resume in `public/cv/`.

The desktop shell (window manager, taskbar, apps) lives in `src/components/os/`.
Each app is a small component in `src/components/os/apps/`, registered in
`src/components/os/apps/registry.tsx`.

## Deploy

Deploys as a standard Next.js app, push to a Vercel project pointed at this repo.
