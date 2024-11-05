import { groq } from "next-sanity";
import React from "react";
import { client } from "~/sanity/lib/client";
import { SortQueryResult } from "../../sanity.types";
import { Sort } from "./sort";

export default async function SortProvider() {
  const sortQuery = groq`*[_type == "sort"][0]{
        sortByLabel,
        polularLabel,
        priceAscLabel,
        priceDescLabel
  }`;
  const sneakerCount = await client.fetch<SortQueryResult>(sortQuery, {}, {
    next: { tags: ["sort"] },
  });
  
  if (!sneakerCount) return null;
  return (
    <Sort
      sortByLabel={sneakerCount.sortByLabel}
      polularLabel={sneakerCount.polularLabel}
      priceAscLabel={sneakerCount.priceAscLabel}
      priceDescLabel={sneakerCount.priceDescLabel}
    />
  );
}
