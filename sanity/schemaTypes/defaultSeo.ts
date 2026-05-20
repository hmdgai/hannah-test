import { defineType, defineField } from 'sanity';

export const defaultSeo = defineType({
  name: 'defaultSeo',
  title: 'Default SEO',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'socialTitle',
      title: 'Social Share Title',
      type: 'string',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Share Description',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noindex',
      title: 'Noindex (prevent search indexing)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
