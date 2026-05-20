import { defineType, defineField, defineArrayMember } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'contact',
      title: 'Contact Details',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (r) => r.email(),
        }),
        defineField({
          name: 'primaryAddress',
          title: 'Primary Address',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
            }),
            defineField({
              name: 'closed',
              title: 'Closed',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'opens',
              title: 'Opens',
              type: 'string',
              hidden: ({ parent }) => parent?.closed === true,
            }),
            defineField({
              name: 'closes',
              title: 'Closes',
              type: 'string',
              hidden: ({ parent }) => parent?.closed === true,
            }),
          ],
          preview: {
            select: { day: 'day', closed: 'closed', opens: 'opens', closes: 'closes' },
            prepare({ day, closed, opens, closes }) {
              return {
                title: day || 'Day',
                subtitle: closed ? 'Closed' : `${opens || '?'} – ${closes || '?'}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'address', title: 'Address', type: 'text' }),
            defineField({ name: 'phone', title: 'Phone', type: 'string' }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: (r) => r.email(),
            }),
            defineField({
              name: 'mapEmbed',
              title: 'Map Embed Code',
              type: 'text',
              description: 'Paste the full Google Maps iframe embed code',
            }),
            defineField({
              name: 'hours',
              title: 'Hours Summary',
              type: 'text',
              description: 'Free-text opening hours for this location',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'phone' },
          },
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'string',
          validation: (r) => r.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
          validation: (r) => r.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'string',
          validation: (r) => r.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'string',
          validation: (r) => r.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'x',
          title: 'X (Twitter)',
          type: 'string',
          validation: (r) => r.uri({ scheme: ['http', 'https'] }),
        }),
      ],
    }),
  ],
});
