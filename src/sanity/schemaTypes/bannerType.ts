import {defineField, defineType} from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
    })
  ],
})
