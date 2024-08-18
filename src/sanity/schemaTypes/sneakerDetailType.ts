import { defineField, defineType } from "sanity";

export const sneakerDetailType = defineType({
  name: "sneakerDetail",
  title: "Sneaker Detail",
  type: "document",
  fields: [
    defineField({
      name: "sizeLabel",
      title: "Size Label",
      type: "string",
    }),
    defineField({
      name: "sizeGuideLabel",
      title: "Size Guide Label",
      type: "string",
    }),
    defineField({
      name: "sizeGuideImage",
      title: "Size Guide Image",
      type: "image",
    }),
    defineField({
      name: "skuLabel",
      title: "SKU Label",
      type: "string",
    }),
    defineField({
      name: "contactLabel",
      title: "Contact Label",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Social",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "social" }],
        },
      ],
    }),
  ],
});
