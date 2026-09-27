# Mohd Harish - Portfolio

Portfolio V2 is a lightweight Next.js portfolio for Mohd Harish, a software engineer and Computer Science student focused on backend engineering, cloud infrastructure, AI, and cybersecurity.

## Stack

- Next.js 14 App Router
- React and TypeScript
- Tailwind CSS
- Supabase for the writing CMS and admin authentication
- Markdown rendering with `marked`

## Structure

```text
src/
  app/                 Routes and metadata
  components/portfolio Reusable work, experience, and skills components
  components/site      Navigation and footer
  lib/                 Typed portfolio content
  utils/               Supabase client
```

Public routes are `/`, `/work`, `/about`, `/writing`, `/writing/[slug]`, and `/resume`. The `/admin` route remains available for authenticated blog management but is not part of the public navigation.

## Local development

```bash
npm install
npm run dev
```

The public portfolio renders without external services. To use writing, authentication, and the admin CMS, configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
```

The Supabase client uses safe placeholders during builds when those variables are absent, while CMS requests require a configured project.

## Validation

```bash
npm run lint
npm run build
```

The resume PDF is served from `public/assets/MohdHarish_Resume.pdf`.
