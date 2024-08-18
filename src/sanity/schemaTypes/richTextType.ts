import {defineType} from 'sanity'

export const richTextType = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'color',
            title: 'Color',
            type: 'color'
          }
        ]
      }
    },
  ],
})
