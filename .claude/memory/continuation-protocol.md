# Continuation Protocol

> This file is overwritten every time. Never append. Always replace with latest state.

---

## To Be Continued

### Completed

* Fixed Astro parse error — curly braces in `<pre><code>` blocks escaped with `&lbrace;` / `&rbrace;`
* Sidebar nav colour changed from primary red to headline dark
* Global custom scrollbar — thin, slate, rounded, cross-browser (WebKit + Firefox)
* Firefox scrollbar applied to `*` selector (not `html`) so all scroll containers match
* Full project audit — removed Copilot/Python artifacts and analysis JSONs
* Removed all inline styles from `cookie-policy.astro`, `index.astro` — replaced with class/data attribute approaches
* Agent documentation sync — all 10 agent files cross-referenced against CLAUDE.md and index.astro
* Agent strengthening — all 10 agents fully rewritten to HMDG UK agency standard
* CLAUDE.md updated — role redefined as premium UK agency replacing Elementor premium builds
* visual-qa-reviewer.md created and added to agent pipeline (now 10 agents)
* v1.1.0 and v1.2.0 released and pushed to GitHub
* Cookie consent Astro plan created — `.claude/memory/cookieconsent.md`
* Plan rewritten with accuracy fixes and improvements over WordPress plugin
* `CookieConsentReadme.md` created in project root — marketing team guide (plain English, copy-paste only)
* continuation-protocol.md created (this file)

### In Progress

* Nothing currently in progress

### Remaining Tasks

* [ ] Implement cookie consent in Astro when first client site build begins (plan is ready in `.claude/memory/cookieconsent.md`)
* [ ] Install `@astrojs/netlify` adapter when adding API routes for cookie consent
* [ ] Create `src/config/cookie-consent.config.ts` per client build
* [ ] Create `CookieConsent.astro` component (extract from WordPress plugin)
* [ ] Create `src/pages/api/book-now.ts` and `booking-complete.ts`
* [ ] Add `.env.example` to project root when implementing cookie consent
* [ ] Bump to v1.3.0 when cookie consent is implemented

### Important Context to Keep

**Project:** Astro Base Template — HMDG UK web design agency, replacing Elementor premium builds
**Repo:** https://github.com/felmerald-hmdg/astro-base-template
**Current version:** v1.2.0
**Astro version:** 6.1.3
**Stack:** Astro + Tailwind CSS v4 + Netlify

**Key files:**
- `CLAUDE.md` — project instructions and agent workflow (10-agent pipeline)
- `src/styles/global.css` — all design tokens, scrollbar, global styles
- `src/pages/index.astro` — documentation/showcase page
- `src/layouts/BaseLayout.astro` — shared layout (header + footer)
- `.claude/agents/` — 10 specialist agents (IA → UI → Build → Visual QA → a11y → Performance → SEO → Marketing → Security → Conversion)
- `.claude/memory/cookieconsent.md` — full Astro cookie consent implementation plan
- `CookieConsentReadme.md` — marketing team guide (project root)

**Cookie consent plan key points:**
- Source: https://github.com/felmerald-hmdg/hmdg-cookie-consent (WordPress plugin)
- DO NOT use `output: 'hybrid'` — not valid in Astro v6. Use default static + `export const prerender = false` on API routes
- Head consent script MUST use `is:inline` or GTM fires before consent defaults
- Rate limiting replaced with HMAC-SHA256 signing (stateless, works on Netlify Functions)
- GA4 client_id must parse from `_ga` cookie, not UUID
- Cliniko uses URL redirect (not postMessage) — detect via URL pattern on thank-you page
- Marketing edits only 8 fields in `src/config/cookie-consent.config.ts`
- Secrets (GA4_API_SECRET, GA4_MEASUREMENT_ID, SITE_ORIGIN, HMAC_SECRET) go in Netlify env vars only

**Design standards:**
- No inline styles ever (`style=""` is banned)
- Class-based styling only (Tailwind utilities or stylesheet classes)
- All images: `<picture>` with `.avif` primary + `.webp` fallback + `decoding="async"`
- Header and footer must be global/shared — never duplicated per page
- Design quality benchmark: Webflow-level polish, exceeding Elementor premium builds

**Agent workflow (mandatory for important builds):**
IA reviewer → UI designer → Frontend builder → Visual QA → a11y → Performance → SEO → Marketing → Security → Conversion

### Handoff Note

Continue immediately from remaining tasks without restarting. The cookie consent implementation is fully planned — when the time comes, read `.claude/memory/cookieconsent.md` first and follow the step-by-step plan exactly. Preserve all design standards, no inline styles, no output: hybrid, is:inline on head scripts.
