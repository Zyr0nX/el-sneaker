import { defineField, defineType } from "sanity";

export const sortType = defineType({
  name: "sort",
  title: "Sort",
  type: "document",
  fields: [
    defineField({
      name: "sortByLabel",
      title: "Sort By",
      type: "string",
    }),
    defineField({
      name: "polularLabel",
      title: "Popular Label",
      type: "string",
    }),
    defineField({
      name: "priceAscLabel",
      title: "Price Ascending Label",
      type: "string",
    }),
    defineField({
      name: "priceDescLabel",
      title: "Price Descending Label",
      type: "string",
    }),
  ],
});
