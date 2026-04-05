# Changelog

All notable changes to the HMDG Astro Base Template will be documented here.

Format: `[version] — YYYY-MM-DD`

---

## [1.0.0] — 2026-04-06

### Initial release

#### Core setup
- Astro + Tailwind CSS v4 base template
- Global CSS design token system (`--color-*`, `--font-*`, `--radius-*`, `--shadow-*`)
- `BaseLayout.astro` — shared layout with header, footer, and global styles
- Reusable component architecture

#### Design system
- Typography scale (Inter Tight headings, Inter body)
- Colour tokens with primary, surface, border, accent, headline, body, caption
- Spacing system with consistent section padding
- Button variants: `btn-default`, `btn-white`, `btn-outline`
- Card, badge, and eyebrow patterns

#### Pages included
- `/` — Documentation and design system reference (index.astro)
- `/privacy-policy` — Premium two-column legal page with scroll progress + active sidebar
- `/terms-conditions` — Premium two-column legal page with scroll progress + active sidebar
- `/cookie-policy` — Premium two-column legal page with cookie tables, compliance badges
- `/thank-you` — Animated checkmark thank you page
- `/thank-you-booking` — Animated checkmark thank you page with next steps
- `/contact` — Contact page (placeholder, ready to build)

#### Security (applied globally)
- Content Security Policy (CSP) via meta tag in BaseLayout
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera, mic, geolocation, payment blocked
- `public/_headers` — Netlify HTTP security headers with HSTS
- `vercel.json` — Vercel HTTP security headers with HSTS
- `.env.example` — Environment variable template (secrets never hardcoded)

#### Standards
- `CLAUDE.md` — Full design, development, and security standards for AI-assisted development
- `.claude/memory/` — Shared team knowledge base (image formats, colour rules, code quality, security)
- OWASP Top 10 compliance built into development workflow

---

## Versioning guide

| Bump | When to use |
|---|---|
| Patch `1.0.x` | Bug fixes, copy changes, minor style tweaks |
| Minor `1.x.0` | New sections, new pages, new components |
| Major `x.0.0` | Breaking changes, full redesign, stack upgrade |
