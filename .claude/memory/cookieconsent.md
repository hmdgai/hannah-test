---
name: Cookie Consent Astro Implementation Plan
description: Full plan to port the HMDG WordPress cookie consent plugin (hmdg-cookie-consent) to Astro — including GA4 config, Consent Mode v2, booking tracker, and marketing team config file
type: project
---

# HMDG Cookie Consent — Astro Implementation Plan

Source plugin: https://github.com/felmerald-hmdg/hmdg-cookie-consent
Status: Not yet implemented — plan only (recorded 2026-04-06)

**Why:** The WordPress plugin is working in production. We want to transfer the same GDPR-compliant cookie consent, Google Consent Mode v2, and Universal Booking Tracker to all Astro builds so marketing does not depend on WordPress.

---

## Architecture Decision

Use Astro `hybrid` output mode (not full static). This means:
- The consent banner, CSS, and JS run entirely in the browser — no SSR needed for those
- The two server-side relay endpoints (book-now, booking-complete) become Astro API routes — these DO need SSR
- On Netlify, API routes automatically become Netlify Functions — zero extra config

---

## File Structure to Create

```
src/
  components/
    CookieConsent.astro           ← Banner HTML + modal HTML + scoped CSS + inline <script>
  pages/
    api/
      book-now.ts                 ← Replaces /wp-json/hmdg-ccm/v1/book-now
      booking-complete.ts         ← Replaces /wp-json/hmdg-ccm/v1/booking-complete
  config/
    cookie-consent.config.ts      ← THE MARKETING TEAM CONFIG FILE (see below)

src/layouts/
  BaseLayout.astro                ← Add <CookieConsent /> and consent head script here
```

---

## Step-by-Step Implementation Plan

### Step 1 — Create the marketing config file

`src/config/cookie-consent.config.ts`

This is the ONLY file the marketing team ever needs to touch. It contains:

```ts
export const cookieConsentConfig = {

  // --- GA4 / GTM ---
  gtmId: 'GTM-XXXXXXX',           // Google Tag Manager container ID (leave blank if using gtag directly)
  gtagId: 'G-XXXXXXXXXX',         // GA4 Measurement ID (used for Measurement Protocol relay)
  ga4ApiSecret: '',               // GA4 API secret — stored in .env as PUBLIC_GA4_SECRET (never hardcode)

  // --- Policy ---
  policyVersion: '1.0',           // Bump this when cookie policy changes — forces re-consent from all users
  cookieName: 'hmdg_cookie_consent',
  cookieExpiryDays: 180,

  // --- Banner copy ---
  bannerTitle: 'We use cookies',
  bannerText: 'We use cookies to improve your experience, personalise content, and analyse our traffic. You can choose which cookies you accept.',
  acceptAllLabel: 'Accept All',
  rejectAllLabel: 'Reject All',
  customiseLabel: 'Customise',
  savePreferencesLabel: 'Save Preferences',

  // --- Cookie categories ---
  // Set enabled: false to hide a category entirely
  categories: {
    necessary:   { enabled: true,  label: 'Necessary',    description: 'Essential for the website to function. Cannot be disabled.' },
    functional:  { enabled: true,  label: 'Functional',   description: 'Remember your preferences and settings.' },
    analytics:   { enabled: true,  label: 'Analytics',    description: 'Help us understand how visitors use the site (Google Analytics).' },
    performance: { enabled: true,  label: 'Performance',  description: 'Used to monitor site performance and stability.' },
    marketing:   { enabled: true,  label: 'Marketing',    description: 'Used for personalised advertising and remarketing.' },
  },

  // --- Booking tracker ---
  // Add or remove booking platform domains here
  // These are scanned automatically — no other code changes needed
  bookingDomains: [
    'cliniko.com',
    'calendly.com',
    'acuityscheduling.com',
    'pracguru.com',          // PracSuite
    'phorest.com',
    'youcanbook.me',
    'jane.app',
    'timely.com',
    'simplybook.me',
  ],

  // --- Booking tracker postMessage matchers ---
  // Each platform has a JS expression that detects booking completion via window.message events
  // Only change these if a platform changes its postMessage format
  bookingCompletionMatchers: {
    calendly:    `e.data.event && e.data.event === 'calendly.event_scheduled'`,
    acuity:      `e.data === 'booked'`,
    youcanbook:  `typeof e.data === 'string' && e.data.includes('ycbm:booking:complete')`,
    jane:        `e.data && e.data.type === 'jane:appointment:booked'`,
    simplybook:  `e.data && e.data.action === 'booking_complete'`,
  },

  // --- Branding ---
  // These control the visual style of the banner — mapped to your CSS custom properties
  primaryColour: 'var(--color-primary)',
  textColour: 'var(--color-body)',
  backgroundColour: 'var(--color-white)',
  borderColour: 'var(--color-border)',
  borderRadius: 'var(--radius-card)',
};
```

**Why:** Marketing can change GTM ID, GA4 ID, banner copy, enabled categories, and booking domains without touching any component or API code.

---

### Step 2 — Create CookieConsent.astro component

Extract from the plugin PHP file:
- The `#hmdg-ccm` wrapper HTML → Astro template
- The banner `#hmdg-banner` → Astro template
- The modal `#hmdg-modal-overlay` → Astro template
- The floating reopen icon `#hmdg-reopen` → Astro template
- All CSS → `<style>` block (scoped, remove all `!important` — not needed in Astro)
- All JS logic → `<script>` block (readCookie, writeCookie, doAcceptAll, doRejectAll, doSavePreferences, showBanner, hideBanner, openModal, closeModal, boot guard, booking tracker)

Pass config values from `cookie-consent.config.ts` into the component as props or imported directly.

---

### Step 3 — Add consent head script to BaseLayout.astro

In `BaseLayout.astro` inside `<head>`, before GTM or gtag loads:

```html
<script>
  // Google Consent Mode v2 — defaults before any tag fires
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage:       'denied',
    ad_storage:              'denied',
    ad_user_data:            'denied',
    ad_personalization:      'denied',
    functionality_storage:   'denied',
    personalization_storage: 'denied',
    security_storage:        'granted',
    wait_for_update:         500,
  });
  // Restore consent if cookie already exists
  (function() {
    try {
      var raw = document.cookie.split(';').find(c => c.trim().startsWith('hmdg_cookie_consent='));
      if (raw) {
        var stored = JSON.parse(decodeURIComponent(raw.split('=')[1]));
        if (stored.policyVersion === '[POLICY_VERSION]') {
          gtag('consent', 'update', {
            analytics_storage:       stored.analytics   ? 'granted' : 'denied',
            ad_storage:              stored.marketing   ? 'granted' : 'denied',
            ad_user_data:            stored.marketing   ? 'granted' : 'denied',
            ad_personalization:      stored.marketing   ? 'granted' : 'denied',
            functionality_storage:   stored.functional  ? 'granted' : 'denied',
            personalization_storage: stored.functional  ? 'granted' : 'denied',
          });
        }
      }
    } catch(e) {}
  })();
</script>
<!-- GTM or gtag.js goes here, AFTER the consent defaults above -->
```

Then at the bottom of `<body>`:
```astro
<CookieConsent />
```

---

### Step 4 — Create API routes

`src/pages/api/book-now.ts`
- Accepts POST with: `client_id`, `session_id`, `gclid`, `page_location`, `platform`
- Validates: origin header matches site domain, content-type is JSON, payload under 8KB
- Rate limits: use Netlify KV or a simple in-memory map (acceptable for low traffic)
- Fires `book_now_click` event to GA4 Measurement Protocol
- Reads `GA4_API_SECRET` from `import.meta.env`

`src/pages/api/booking-complete.ts`
- Same pattern
- Fires `booking_completed` event to GA4 Measurement Protocol

**Environment variables needed (never in code):**
```
GA4_API_SECRET=your_secret_here
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SITE_ORIGIN=https://yourclientsite.co.uk
```

These go in `.env` locally and in Netlify environment variables in the dashboard.

---

### Step 5 — Update astro.config.mjs

```js
export default defineConfig({
  output: 'hybrid',           // Static by default, SSR for API routes
  adapter: netlify(),         // API routes become Netlify Functions
});
```

---

### Step 6 — Add thank-you page nonce support (optional but recommended)

For the nonce-based security on API routes:
- Generate a per-request nonce in BaseLayout.astro (SSR layout only)
- Pass it as a `<meta name="hmdg-nonce" content="...">` tag
- The CookieConsent JS reads it and sends it as `X-HMDG-Nonce` header
- API routes validate it

This matches the WordPress plugin's security model.

---

## Marketing Team Quick Reference

To deploy this on a new client site, marketing/accounts only needs to:

1. Open `src/config/cookie-consent.config.ts`
2. Set `gtmId` to the client's GTM container ID
3. Set `gtagId` to the client's GA4 measurement ID
4. Set `policyVersion` to `'1.0'`
5. Set `bannerText` to match the client's cookie policy wording
6. Disable any unused categories (`enabled: false`)
7. Add or remove platforms from `bookingDomains`
8. Add `GA4_API_SECRET` and `GA4_MEASUREMENT_ID` to Netlify environment variables (NOT in code)

No component editing. No API route editing. No layout editing.

---

## What We Are NOT Porting

| WordPress feature | Decision |
|---|---|
| PHP admin settings UI | Replaced by `cookie-consent.config.ts` — simpler and version-controlled |
| GitHub auto-updater | Not needed — config is in the repo |
| WP transient rate limiting | Use Netlify KV or basic in-memory map — acceptable for clinic traffic |
| WP nonce system | Replace with a generated nonce in BaseLayout SSR or use HMAC |

---

## Testing Checklist Before Launch

- [ ] Banner shows on first visit (no cookie present)
- [ ] Banner does not show on second visit (cookie present, correct version)
- [ ] Accept All fires all consent signals as granted
- [ ] Reject All fires all signals as denied except security_storage
- [ ] Customise modal opens, saves granular preferences
- [ ] Policy version bump forces re-consent on all users
- [ ] Google Tag Manager fires AFTER consent update (not before)
- [ ] GA4 DebugView shows consent_update events
- [ ] book_now_click event fires in GA4 when booking link is clicked
- [ ] booking_completed event fires when booking is confirmed
- [ ] API routes reject requests from other origins
- [ ] No GA4 API secret visible in browser source or network tab
- [ ] Cookie set with SameSite=Lax; Secure
- [ ] Banner is keyboard accessible and focus-trapped in modal
- [ ] Banner is readable on mobile at 375px
- [ ] prefers-reduced-motion respected for any transitions

---

## When to Implement

Implement when building the first Astro client site that:
- Uses GA4 or Google Ads
- Requires GDPR/PECR cookie consent
- Uses any of the 9 supported booking platforms

Do not implement speculatively in the base template — it should be added per-client build with the config file filled in for that client.
