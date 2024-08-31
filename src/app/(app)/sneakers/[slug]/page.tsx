import ProductDetail from "~/components/product-detail";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { client } from "~/sanity/lib/client";
import { SneakerQueryResult } from "../../../../../sanity.types";

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const sneakerNameQuery = groq`*[_type == "sneaker" && slug.current == $sneakerSlug][0]{
    name,
  }`;
  const sneakerName = await client.fetch<SneakerQueryResult>(
    sneakerNameQuery,
    { sneakerSlug: params.slug },
    {
      next: { tags: ["sneaker", params.slug] },
    }
  );

  return {
    title: sneakerName ? `${sneakerName?.name} | El.sneaker` : "El.sneaker",
  };
}

export default function PostIndex({ params, searchParams }: { params: { slug: string }, searchParams: { size: number} }) {
  console.log(searchParams.size)
  return (
    <>
      <ProductDetail sneakerSlug={params.slug} sizeParam={searchParams.size} />
    </>
  );
}
