import { filteredDocumentListItems } from "sanity-plugin-singleton-tools";
import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("EL Sneaker CMS")
    .items([
      S.listItem()
        .title("Shared")
        .child(
          S.list()
            .title("Shared Component")
            .items([
              S.documentListItem().schemaType("header").title("Header"),
              S.documentListItem().schemaType("footer").title("Footer"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Common")
        .child(
          S.list()
            .title("Common Component")
            .items([S.documentTypeListItem("social").title("Social")])
        ),
      S.divider(),
      S.listItem()
        .title("Homepage")
        .child(
          S.list()
            .title("Singleton Documents")
            .items([
              S.documentListItem().schemaType("trending").title("Trending"),
              S.documentListItem().schemaType("banner").title("Banner"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Sneaker Listing")
        .child(
          S.list()
            .title("Singleton Documents")
            .items([
              S.documentListItem().schemaType("filter").title("Filter"),
              S.documentListItem()
                .schemaType("sneakerCount")
                .title("Sneaker Count"),
              S.documentListItem().schemaType("sort").title("Sort"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Sneaker Detail")
        .child(
          S.list()
            .title("Singleton Documents")
            .items([
              S.documentListItem().schemaType("sneakerDetail").title("Sneaker Detail")
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Other Documents")
        .child(
          S.list()
            .title("Other Documents")
            .items([...filteredDocumentListItems({ S, context })])
        ),
    ]);
