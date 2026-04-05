---
name: Image format rules (AVIF + WebP)
description: Upload .webp to Claude prompts; use .avif as primary on the website with .webp fallback — never downgrade website output to .webp-only
type: feedback
---

**Summary rule:**
- Upload `.webp` to Claude prompts
- Use `.avif` on the website (primary)
- Use `.webp` as fallback on the website

**Why:** AVIF is the production performance standard. Claude Code may not support .avif attachments, but that must never affect generated code quality.

---

## Claude prompt rule
- When referencing, attaching, or sharing images in prompts, use `.webp`
- Do not attach `.avif` — Claude Code may not open or preview it

## Website output rule
- Always use `.avif` as the primary source in generated code
- Always provide `.webp` as the fallback
- Never downgrade to `.webp`-only output just because `.webp` was used in the prompt

## Required picture pattern
```html
<picture>
  <source srcset="/images/hero.avif" type="image/avif" />
  <source srcset="/images/hero.webp" type="image/webp" />
  <img src="/images/hero.webp" alt="Descriptive alt text" loading="lazy" />
</picture>
```

## Additional rules
- Use `loading="lazy"` for below-fold images, `loading="eager"` for above-fold/hero
- Always set `width` and `height` to prevent CLS
- Always include meaningful `alt` text
- Use `srcset` and `sizes` for responsive images
- Default to `.avif` when no format is specified
- Never output `.jpg` or `.png` unless explicitly required
