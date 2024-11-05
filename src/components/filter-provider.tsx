import { groq } from "next-sanity";
import React from "react";
import { client } from "~/sanity/lib/client";
import { FilterLabelQueryResult, FilterQueryResult } from "../../sanity.types";
import Filter from "./filter";
import FilterMobile from "./filter-mobile";

export default async function FilterProvider({ isMobile }: { isMobile: boolean }) {
  const filterQuery = groq`{
    "brands": *[_type == "brand" && _id in array::unique(*[_type == "sneaker"].brand._ref)]{
        _id,
        name,
        "slug": slug.current
    },
    "collections": *[_type == "collection" && _id in array::unique(*[_type == "sneaker"].collection._ref)]{
        _id,
        name,
        "slug": slug.current
    },
    "sizes": array::unique(*[_type == "sneaker" && defined(sizes[out_of_stock != true].size)].sizes[out_of_stock != true].size),
    "minPrice": math::min(*[_type == "sneaker" && defined(price)].price),
    "maxPrice": math::max(*[_type == "sneaker" && defined(price)].price)
  }`;

  const filterList = await client.fetch<FilterQueryResult>(
    filterQuery,
    {},
    {
      next: { tags: ["brand", "collection", "sneaker"] },
    }
  );

  const filterLabelQuery = groq`*[_type == "filter"][0]{
    brandLabel,
    collectionLabel,
    sizeLabel,
    priceLabel,
    resetLabel,
    applyLabel
  }`;
  const filterLabel = await client.fetch<FilterLabelQueryResult>(filterLabelQuery);

  return isMobile ? <FilterMobile filter={filterList} filterLabel={filterLabel} /> : <Filter filter={filterList} filterLabel={filterLabel} />;
}
