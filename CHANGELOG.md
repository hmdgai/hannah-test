# Changelog

All notable changes to the HMDG Astro Base Template will be documented here.

Format: `[version] — YYYY-MM-DD`

---

## [1.1.0] — 2026-04-06

### Session 2 — Agent system, design standards, and project cleanup

#### AI Agent system (10-agent pipeline)
- Added `visual-qa-reviewer` agent — sits between `frontend-builder` and `a11y-reviewer`, checks built output against design intent, rates output quality
- Rewrote `ui-designer.md` — now includes clinic section anatomy, section variety rules, hero standards, mobile-first guidance, full design token awareness, component standards, animation direction, and visual quality checklist
- Strengthened `frontend-builder.md` — added existing class system reference, Swiper.js guidance, `decoding="async"` in image pattern, transition standards, responsive breakpoint order, 44px touch target rule
- Strengthened `a11y-reviewer.md` — WCAG 2.1 AA contrast ratios (4.5:1 / 3:1), `prefers-reduced-motion` check, form a11y (labels, aria-required, aria-describedby), focus ring contrast (3:1), touch target sizes, severity levels
- Updated all 10-agent sequences across `CLAUDE.md`, memory files, and `index.astro`

#### Documentation (index.astro)
- Updated hero: "HMDG Base Template" title, version badges (Astro v5, Tailwind v4, 10 AI Agents, v1.0.0)
- Added 6 new documentation sections: Utility Classes, Design Tokens, global.css Structure, Image Format Rules, Security Reference, Agent System
- Fixed `<pre><code>` CSS blocks — escaped curly braces with HTML entities to prevent Astro parse error
- Removed all inline `style=""` attributes — replaced with class-based alternatives and CSS variable approach

#### Global CSS improvements
- Added custom scrollbar styling globally — 6px thin thumb, transparent track, rounded pill, slate colour scale with hover/active states
- Firefox: `scrollbar-width: thin` on `*` (not just `html`) so all scroll containers match
- WebKit: `::-webkit-scrollbar` pseudo-elements apply to all scroll containers including sidebar

#### Sidebar navigation
- Active and hover states changed from `--color-primary` (red) to `--color-headline` (dark) — number spans use `--color-caption` as default

#### Project cleanup
- Removed Copilot-era Python files: `analyze_styles.py`, `style_analyzer.py`
- Removed generated analysis artifacts: `inline-styles-analysis.json`, `style-analysis-report.json`, `QUICK_REFERENCE.txt`, `README_ANALYSIS.md`, `STYLE_ANALYSIS_SUMMARY.md`, `ANALYSIS_COMPLETE.txt`
- Fixed `cookie-policy.astro` empty `style=""` attribute

#### Standards sync
- Added `decoding="async"` to CLAUDE.md required picture pattern
- Fixed `conversion-reviewer` card to list CTA clarity before CTA placement (matches agent file)
- All agent descriptions in `index.astro` updated to match actual agent file content

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
