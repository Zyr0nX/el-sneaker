import { defineField, defineType } from "sanity";

export const sneakerCountType = defineType({
  name: "sneakerCount",
  title: "Sneaker Count",
  type: "document",
  fields: [
    defineField({
      name: "countLabel",
      title: "Count Label",
      description: "Use {{count}} as placeholder for the count",
      type: "string",
    }),
  ],
});
