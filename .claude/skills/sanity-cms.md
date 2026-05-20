# Sanity CMS Integration

## Setup Steps

1. Create a Sanity project at https://www.sanity.io/manage
2. Copy the project ID into `.env` as `PUBLIC_SANITY_PROJECT_ID`
3. Set `PUBLIC_SANITY_DATASET=production` (or your dataset name)
4. Add CORS origins in Sanity dashboard: production domain + `http://localhost:4321`
5. Run `npm run dev` and visit `/admin` to access the embedded Studio
6. (Optional) Run `node scripts/seed-sanity-singletons.mjs` with a write token to create empty singleton docs

## Schema Reference

### Singletons (one document each, managed via custom structure)

| Type | ID | Purpose |
|---|---|---|
| `siteSettings` | `siteSettings` | Contact details, opening hours, locations, social links |
| `trackingCodes` | `trackingCodes` | GA4, GTM, Meta Pixel, GSC verification |
| `defaultSeo` | `defaultSeo` | Fallback SEO fields (title, description, OG image) |

### Document Types (repeatable)

| Type | Purpose |
|---|---|
| `teamMember` | Staff profiles with bio (Portable Text), photo, order |
| `pricing` | Service pricing rows (string price for flexibility) |
| `testimonial` | Client reviews with optional rating (1-5) |
| `faq` | Questions + answers (Portable Text) with category |

### Reusable Object

| Type | Purpose |
|---|---|
| `seo` | Embeddable SEO fields for any future page document |

## Helper API (src/lib/seo.ts)

| Function | Returns | Notes |
|---|---|---|
| `getSEO(pageSeo?)` | `ResolvedSEO` | Merges page-level SEO over Default SEO, field-by-field |
| `getTrackingCodes()` | `TrackingCodes` | CMS values win; env vars are fallback |
| `getSiteSettings()` | `SiteSettings` | Contact, hours, locations, social |

All functions catch errors gracefully -- the site builds even with no Sanity project.

## Sanity Client (src/lib/sanity.ts)

Single configured client instance. Never instantiate @sanity/client elsewhere.
Also exports `imageUrl(source)` for building image URLs from Sanity references.

## CORS Guidance

In Sanity dashboard -> API -> CORS Origins, add:
- `http://localhost:4321` (for local dev)
- `https://your-production-domain.co.uk` (for production)
- Any `*.pages.dev` preview domain if needed

Enable "Allow credentials" only if using authenticated requests.

## Common Gotchas

1. Build without Sanity project: All helpers return empty defaults. No build failure.
2. Singleton actions: `__experimental_actions` prevents accidental create/delete in Studio. The custom structure hides them from the default document list.
3. Tracking precedence: CMS tracking codes override env vars. If CMS returns empty, env var is used.
4. CSP: The /admin/* route has a relaxed CSP in public/_headers. The global CSP includes cdn.sanity.io for images and API endpoints.
5. SEO merge: Page-level seo prop fields override Default SEO field-by-field (not all-or-nothing).
6. OG images: Use imageUrl() from src/lib/sanity.ts to build URLs from Sanity image references.
7. Studio route: Mounted at /admin via @sanity/astro integration with studioBasePath. React-only client-side app.
