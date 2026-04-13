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
 * conditional comments (<!--[if IE]> ... <![endif]-->) in case any
 * third-party script relies on them.
 * Runs after the build completes, so only the output is touched —
 * source files keep their comments for developer clarity.
 */
function stripHtmlComments() {
  return {
    name: 'strip-html-comments',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        const walk = (d) => {
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
