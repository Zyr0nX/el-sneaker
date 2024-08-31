import {defineField, defineType} from 'sanity'

export const sizeType = defineType({
  name: 'variant',
  title: 'Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'out_of_stock',
      title: 'Out of Stock',
      type: 'boolean',
    }),
  ],
})
