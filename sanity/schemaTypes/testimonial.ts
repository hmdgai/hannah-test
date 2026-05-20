import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'companyOrRole',
      title: 'Company or Role',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (r) => r.min(1).max(5),
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'companyOrRole' },
  },
});
