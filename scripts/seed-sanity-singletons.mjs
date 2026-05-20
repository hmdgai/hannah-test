#!/usr/bin/env node
/**
 * seed-sanity-singletons.mjs
 * ---------------------------------------------------------
 * Creates the three singleton documents (siteSettings, trackingCodes,
 * defaultSeo) in the Sanity dataset if they don't already exist.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk-... \
 *   PUBLIC_SANITY_PROJECT_ID=abc123 \
 *   PUBLIC_SANITY_DATASET=production \
 *   node scripts/seed-sanity-singletons.mjs
 *
 * Requires a Sanity API token with WRITE permissions.
 * Safe to run multiple times -- skips documents that already exist.
 * NOT wired into npm install or npm run build.
 */

import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.PUBLIC_SANITY_DATASET || 'production';
const token     = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    'Missing env vars. Set PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
});

const singletons = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    contact: { phone: '', email: '', primaryAddress: '' },
    openingHours: [],
    locations: [],
    social: {},
  },
  {
    _id: 'trackingCodes',
    _type: 'trackingCodes',
    ga4MeasurementId: '',
    gtmId: '',
    metaPixelId: '',
    gscVerification: '',
  },
  {
    _id: 'defaultSeo',
    _type: 'defaultSeo',
    metaTitle: '',
    metaDescription: '',
    socialTitle: '',
    socialDescription: '',
    noindex: false,
  },
];

for (const doc of singletons) {
  const existing = await client.getDocument(doc._id);
  if (existing) {
    console.log(`  skip  ${doc._id} (already exists)`);
  } else {
    await client.create(doc);
    console.log(`  seed  ${doc._id} (created)`);
  }
}

console.log('Done.');
