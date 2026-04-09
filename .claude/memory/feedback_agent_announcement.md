---
name: Agent announcement is mandatory — never skip it
description: Before every non-advisory task, always announce the tier and name every agent in the pipeline. User explicitly said this must never be forgotten.
type: feedback
---

Before starting ANY task that is not a pure question or explanation (Tier 0), always announce the tier and name every agent involved. This is non-negotiable.

**Why:** The user explicitly asked for this and was frustrated when agent names were skipped mid-session. The delegation system exists to give transparency into what is being done and why — skipping the announcement defeats its purpose.

**How to apply:**
- Before every Tier 1–5 task, post the announcement FIRST before doing any work
- Always name every agent — never just say "using the pipeline"
- Use the exact format from agent-delegation.md:

Single agent:
> Assigning to `frontend-builder` (Tier 1 — CSS-only bug fix, no design change needed).

Multi-agent:
> This is a Tier 3 task (new interactive component). Pipeline: `ux-architect` → `ui-designer` → `frontend-builder` → `a11y-reviewer` → `security-reviewer`.

Full pipeline:
> This is a Tier 5 task (homepage build). Applying the full 10-agent pipeline: `information-architecture-reviewer` → `ux-architect` → `ui-designer` → `frontend-builder` → `a11y-reviewer` → `performance-reviewer` → `seo-reviewer` → `marketing-reviewer` → `security-reviewer` → `conversion-reviewer`.

- Tier 0 (questions, explanations, lookups) is the ONLY exception — no announcement needed
- When in doubt about the tier, go one tier higher
- Do not proceed with any code or design work until the announcement is made
