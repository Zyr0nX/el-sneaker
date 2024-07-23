import React from "react";
import { SneakerListQueryResult } from "../../sanity.types";
import ProductCard from "./product-card";
import { groq } from "next-sanity";
import { client } from "~/utils/sanity/client";

export default async function ProductList({
  searchParams
}: {
  searchParams: {
    brands?: string;
    sizes?: string;
    from?: string;
    to?: string;
    collections?: string;
  };
}) {
  const sneakerListQuery = groq`*[_type == "sneaker" 
    && (!defined($brands) || brand->slug.current in $brands)
    && (!defined($collections) || collection->slug.current in $collections)
    && (!defined($sizes) || count((sizes[out_of_stock != true].size)[@ in $sizes]) > 0)
    && (!defined($from) || price >= $from)
    && (!defined($to) || price <= $to)
    ][0...12]{
      _id,
      "slug": slug.current,
      name,
      price,
      "brand": brand->name,
      "collection": collection->name,
      "image": images[0].asset._ref
    }`;

  const sneakerList = await client.fetch<SneakerListQueryResult>(
    sneakerListQuery,
    {
      brands: searchParams.brands ? searchParams.brands.split(",") : null,
      sizes: searchParams.sizes
        ? searchParams.sizes
            .split(",")
            .filter((item) => !isNaN(Number(item)))
            .map((item) => Number(item))
        : null,
      collections: searchParams.collections
        ? searchParams.collections.split(",")
        : null,
      from: searchParams.from || null,
      to: searchParams.to || null,
    },
    {
      next: { tags: ["sneaker"] },
    }
  );
  return (
    <div className="grid grid-cols-3">
      {sneakerList.map((sneaker) => (
        <ProductCard
          key={sneaker._id}
          slug={sneaker.slug}
          brand={sneaker.brand}
          image={sneaker.image}
          name={sneaker.name}
          price={sneaker.price}
        />
      ))}
    </div>
  );
}
