# Vishal Jadhav — Portfolio

A premium, multi-page portfolio built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

- `src/pages/` — one file per route (Home, About, Skills, Projects, ProjectDetail, DevOpsLab, Resume, Contact, NotFound)
- `src/components/` — shared UI (Navbar, Footer, GlassCard, SectionHeading, BrandIcons, PageTransition)
- `src/data/` — mock content (projects.ts, skills.ts, timeline.ts) — edit these to update site content
- `src/assets/vishal-portrait.jpg` — your portrait, used on Home (card) and blended into the hero background

## Notes

- Dark theme only, tokens defined in `src/index.css` under `@theme`.
- Contact form validates with `react-hook-form` + `zod`; it currently simulates a submit (no backend yet) — wire up `onSubmit` in `src/pages/Contact.tsx` to a real endpoint when ready.
- Resume page has a disabled "Download Resume" button until a PDF is ready — drop the file in `public/` and update `src/pages/Resume.tsx`.
- Reserved routes for Blog/Admin were intentionally left out of `App.tsx`; add them the same way as existing routes when ready.
