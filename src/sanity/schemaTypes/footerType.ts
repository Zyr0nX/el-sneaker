import {defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'link',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'richText',
    }),
    defineField({
      name: 'socialPlatform',
      title: 'Social Platform',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'social'}],
        },
      ],
    }),
    defineField({
      name: 'additionalInformation',
      title: 'Additional Information',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'socialPlatformIcon',
      title: 'Social Platform Icon',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'social'}],
        },
      ],
    }),
  ],
})
