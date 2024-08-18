import {defineField, defineType} from 'sanity'

export const trendingType = defineType({
  name: 'trending',
  title: 'Trending',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'viewAllLink',
      title: 'View All Link',
      type: 'link',
    }),
    defineField({
      name: 'sneakers',
      title: 'Sneakers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'sneaker'}],
        },
      ],
    }),
  ],
})
