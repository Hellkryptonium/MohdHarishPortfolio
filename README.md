# Mohd Harish - Portfolio

Portfolio V2 is a lightweight Next.js portfolio for Mohd Harish, a software engineer and Computer Science student focused on backend engineering, cloud infrastructure, AI, and cybersecurity.

## Stack

- Next.js 16 App Router with Turbopack
- React 19 and TypeScript 7
- Tailwind CSS 4

## Structure

```text
src/
  app/                 Routes and metadata
  components/portfolio Reusable work, experience, and skills components
  components/site      Navigation and footer
  lib/                 Typed portfolio content
  lib/                 Typed portfolio content and live data fetchers
```

Public routes are `/`, `/work`, `/about`, and `/resume`.

## Local development

```bash
npm install
npm run dev
```

The public portfolio renders without external services. Competitive-programming ratings and recent public GitHub activity are fetched server-side with cached fallbacks.

## Validation

```bash
npm run lint
npm run build
```

The resume PDF is served from `public/assets/MohdHarish_Resume.pdf`.
