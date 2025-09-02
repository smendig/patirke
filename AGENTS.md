# Repo Guide (for Coding Agents)

This project is a Nuxt 4 static site (SSG) using TypeScript and SCSS. Node version is pinned via `.nvmrc` (22).

## Structure
- `app/pages` — Route-driven Vue pages (kebab-case).
- `app/layouts` — Shared layouts.
- `app/components` — Reusable SFCs (PascalCase).
- `app/assets` — Global styles and plugin CSS (`css/`, keep `ls.css` for LightGallery icons).
- `public/` — Route-addressable static files (e.g., `/icons/...`, `/gallery/...`).
- Root config: `nuxt.config.ts`, `eslint.config.mjs`, `tsconfig.json`.

## Commands
- `npm run dev` — Nuxt dev server with HMR.
- `npm run generate` — SSG output to `.output/public`.
- `npm run preview` — Serve the build locally.
- `npm run lint` — ESLint. CI treats warnings as errors.
- `npm run typecheck` — Strict type check with `vue-tsc`.

## CI/CD (GitHub Actions)
- PRs: lint (no warnings), typecheck, generate, then smoke test by serving `.output/public` and curling key routes.
- Deploys (Cloudflare Pages): build `.output/public`, smoke test, then deploy. Concurrency cancels superseded runs; npm install is cached.
- Keep routes list in smoke tests up to date when adding pages.

## Conventions
- SEO: Canonical link is keyed to avoid duplicates and follows current trailing-slash style. If strictness is desired, configure router `trailingSlash`.


Keep it simple, static-friendly, and consistent.
