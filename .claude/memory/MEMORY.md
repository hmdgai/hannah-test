# MEMORY.md

- [CSS variables rule](feedback_css_variables.md) — Always use var(--...) for colours, font-weights, and font-sizes; never hardcode values that have a matching token
- [Readability, spacing, and responsiveness rules](feedback_readability_responsiveness.md) — Mandatory contrast, spacing, and responsive checks required before any design output is considered finished
- [Primary colour usage rules](feedback_primary_colour_usage.md) — Use primary colour intentionally on active states, labels, section numbers, and brand accents — especially on legal/policy pages and sidebar navs
- [Image format rules (AVIF + WebP)](feedback_image_formats.md) — For Claude prompts use .webp; for website output use .avif as primary + .webp fallback; prompt compatibility must not change production image standards
- [Code quality and DOM rules](feedback_code_quality.md) — No unnecessary wrappers, no deep nesting, no duplicate markup; extract reusable components; every line of markup must have a purpose
- [Security rules](feedback_security.md) — OWASP Top 10 compliance, no exposed secrets, no unsafe innerHTML, CSP-compatible patterns, env vars for all secrets; security is non-negotiable
- [Agent review and build workflow](project_agent_workflow.md) — Mandatory 10-agent pipeline: IA → UX → UI → Build → a11y → Performance → SEO → Marketing → Security → Conversion; full prompt template included
- [Automatic Agent Delegation system](project_agent_delegation.md) — 5-tier task classification (Tier 0 advisory → Tier 5 full pipeline), intermediate pipelines, handoff protocol per agent, escalation rules, parallel execution waves
- [Agent announcement is mandatory](feedback_agent_announcement.md) — ALWAYS announce tier + every agent name before starting any Tier 1–5 task; never skip; user explicitly requires this every time
- [Cookie Consent Astro Implementation Plan](cookieconsent.md) — Full plan to port hmdg-cookie-consent WordPress plugin to Astro: config file, component, API routes, Consent Mode v2, booking tracker, marketing team quick reference
