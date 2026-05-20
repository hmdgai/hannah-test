import { defineType, defineField } from 'sanity';

export const trackingCodes = defineType({
  name: 'trackingCodes',
  title: 'Tracking Codes',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'ga4MeasurementId',
      title: 'GA4 Measurement ID',
      type: 'string',
      description: 'Google Analytics 4 measurement ID',
      placeholder: 'G-XXXXXXXXXX',
    }),
    defineField({
      name: 'gtmId',
      title: 'GTM Container ID',
      type: 'string',
      description: 'Google Tag Manager container ID',
      placeholder: 'GTM-XXXXXXX',
    }),
    defineField({
      name: 'metaPixelId',
      title: 'Meta Pixel ID',
      type: 'string',
      description: 'Facebook / Meta Pixel ID',
    }),
    defineField({
      name: 'gscVerification',
      title: 'Google Search Console Verification',
      type: 'string',
      description: 'Google Search Console verification meta content value',
    }),
  ],
});
