import { groq } from "next-sanity";
import React from "react";
import { client } from "~/sanity/lib/client";
import { FilterQueryResult } from "../../sanity.types";
import Filter from "./filter";

export default async function FilterProvider() {
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
      next: { tags: ["filter"] },
    }
  );

  return <Filter filter={filterList} />;
}
