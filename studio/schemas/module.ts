import { defineField, defineType } from 'sanity';

const layoutOptions = [
  { title: 'Middle Tall', value: 'middle-tall' },
  { title: 'Left Tall', value: 'left-tall' },
  { title: 'Left Bottom', value: 'left-bottom' },
  { title: 'Right Top', value: 'right-top' },
  { title: 'Right Bottom', value: 'right-bottom' },
];

const iconOptions = [
  { title: 'Digital Syndication', value: 'digitalSyndication' },
  { title: 'Ownership Dashboard', value: 'ownershipDashboard' },
  { title: 'Integration & Compliance', value: 'integrationCompliance' },
  { title: 'Analytics & Insights', value: 'analyticsInsights' },
  { title: 'Community & Media', value: 'communityMedia' },
];

export default defineType({
  name: 'module',
  title: 'Evolution Module',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon',
      type: 'string',
      options: {
        list: iconOptions,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'layoutKey',
      title: 'Layout Position',
      type: 'string',
      options: {
        list: layoutOptions,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'ctaLabel',
    },
  },
});
