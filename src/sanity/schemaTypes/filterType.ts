import {defineField, defineType} from 'sanity'

export const filterType = defineType({
  name: "filter",
  title: "Filter",
  type: "document",
  fields: [
    defineField({
      name: "brandLabel",
      title: "Brand Label",
      type: "string",
    }),
    defineField({
      name: "collectionLabel",
      title: "Collection Label",
      type: "string",
    }),
    defineField({
      name: "sizeLabel",
      title: "Size Label",
      type: "string",
    }),
    defineField({
      name: "priceLabel",
      title: "Price Label",
      type: "string",
    }),
    defineField({
      name: "resetLabel",
      title: "Reset Label",
      type: "string",
    }),
    defineField({
      name: "applyLabel",
      title: "Apply Label",
      type: "string",
    }),
  ],
});
