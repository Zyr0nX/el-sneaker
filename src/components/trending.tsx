import { groq } from "next-sanity";
import React from "react";
import { client } from "~/sanity/lib/client";
import { TrendingQueryResult } from "../../sanity.types";
import End from "~/icons/end";
import { Link } from "~/ui/link";
import ProductCard from "./product-card";

export default async function Trending() {
  const trendingQuery = groq`*[_type == "trending"][0]{
    title,
    viewAllLink,
    'sneakers': sneakers[]->{
      _id,
      name,
      price,
      "slug":slug.current,
      "brand":brand->name,
      "image":images[0].asset._ref,
    }}`;
  const trendingContent = await client.fetch<TrendingQueryResult>(
    trendingQuery,
    {},
    {
      next: { tags: ["trending"] },
    }
  );
  if (!trendingContent) return null;
  return (
    <div className="py-11 px-[6.26rem] flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[2.5rem]">{trendingContent.title}</h2>
        {trendingContent.viewAllLink && (
          <Link
            variant="link"
            className="text-brand-500 font-semibold flex px-4 py-2.5 gap-2 items-center"
            href={trendingContent.viewAllLink.url}
          >
            {trendingContent.viewAllLink.text}
            <End />
          </Link>
        )}
      </div>
      {trendingContent.sneakers && (
        <div className="grid grid-cols-4 gap-6">
          {trendingContent.sneakers.map((sneaker) => (
            <ProductCard
              key={sneaker._id}
              brand={sneaker.brand}
              name={sneaker.name}
              price={sneaker.price}
              image={sneaker.image}
              slug={sneaker.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
