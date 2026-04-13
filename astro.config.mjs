// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * htmlProductionHygiene — tiny inline Astro integration.
 * Two jobs, both run at astro:build:done against every built .html:
 *
 *   1. Strip HTML comments (<!-- ... -->) so internal notes never leak
 *      to production view-source. Preserves IE conditional comments.
 *
 *   2. Defer the CookieConsent stylesheet so it does not block render.
 *      The cookie banner lives below the fold and is hidden on first
 *      paint (opacity:0, visibility:hidden, transform:translateY(100%)),
 *      so blocking paint for its CSS is wasted time. We also inline a
 *      tiny critical rule in <head> that keeps the banner hidden in
 *      the unlikely edge case where markup renders before the CSS
 *      arrives (no FOUC).
 *
 * Source files are untouched — only the built output is rewritten.
 */
function htmlProductionHygiene() {
  // Critical CSS injected into <head> to prevent any flash-of-unstyled-
  // content before the deferred CookieConsent stylesheet loads.
  const CC_CRITICAL = '<style>.hmdg-banner,.hmdg-modal{visibility:hidden!important}</style>';

  return {
    name: 'html-production-hygiene',
    hooks: {
      'astro:build:done': (/** @type {{ dir: URL }} */ { dir }) => {
        const root = fileURLToPath(dir);
        /** @type {(d: string) => string[]} */
        const walk = (d) => {
          /** @type {string[]} */
          const out = [];
          for (const e of readdirSync(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            if (e.isDirectory()) out.push(...walk(p));
            else if (p.endsWith('.html')) out.push(p);
          }
          return out;
        };
        // Matches <link rel="stylesheet" href="/_astro/CookieConsent*.css">
        // regardless of attribute order or hashed filename.
        const ccLinkRe = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'](\/_astro\/CookieConsent[^"']+\.css)["'][^>]*>/i;

        for (const file of walk(root)) {
          let html = readFileSync(file, 'utf8');
          const original = html;

          // 1. Strip HTML comments (keep IE conditional).
          html = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');

          // 2. Defer CookieConsent CSS + inline critical hide rule.
          const m = html.match(ccLinkRe);
          if (m) {
            const href = m[1];
            const deferred =
              `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">` +
              `<noscript><link rel="stylesheet" href="${href}"></noscript>`;
            html = html.replace(ccLinkRe, deferred);
            // Inject critical CSS just before </head> (exactly once).
            if (!html.includes('.hmdg-banner,.hmdg-modal')) {
              html = html.replace('</head>', `${CC_CRITICAL}</head>`);
            }
          }

          if (html !== original) writeFileSync(file, html);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),   // Enables Netlify Functions for API routes (export const prerender = false)
  integrations: [htmlProductionHygiene()],
  vite: {
    plugins: [tailwindcss()]
  }
});
