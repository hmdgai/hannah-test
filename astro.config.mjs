// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * stripHtmlComments — tiny inline Astro integration.
 * Removes HTML comments (<!-- ... -->) from every built .html file so
 * internal notes never leak to production view-source. Preserves IE
 * conditional comments in case any third-party script relies on them.
 * Source files are untouched — only the built output is rewritten.
 *
 * Note: we deliberately do NOT defer any stylesheet here. Astro merges
 * global.css, component styles, and shared CSS into a single hashed
 * chunk under /_astro/. Deferring that chunk (e.g. via media="print"
 * onload swap) causes a flash of unstyled content because it defers
 * the entire page's styling, not just one component's. Stylesheets
 * must load synchronously to preserve correct first paint.
 */
function stripHtmlComments() {
  return {
    name: 'strip-html-comments',
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
        for (const file of walk(root)) {
          const html = readFileSync(file, 'utf8');
          const cleaned = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');
          if (cleaned !== html) writeFileSync(file, cleaned);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),   // Enables Netlify Functions for API routes (export const prerender = false)
  integrations: [stripHtmlComments()],
  vite: {
    plugins: [tailwindcss()]
  }
});
