import { groq } from "next-sanity";
import ProductCard from "~/components/product-card";
import ProductDetail from "~/components/product-detail";
import Test from "~/components/test";

import { client } from "~/utils/sanity/client";
import { SneakerListQueryResult } from "../../../sanity.types";
import Filter from "~/components/filter";
import FilterProvider from "~/components/filter-provider";
import ProductList from "~/components/product-list";
import { Suspense } from "react";

export default async function PostIndex({
  searchParams,
}: {
  searchParams: {
    brands?: string;
    sizes?: string;
    from?: string;
    to?: string;
    collections?: string;
  };
}) {
  return (
    <div className="py-11 px-[6.25rem] flex flex-col gap-8">
      <h2 className="font-bold text-[2.5rem]">Danh mục sản phẩm</h2>
      <div className="flex gap-6">
        <div className="w-72 shrink-0">
          <FilterProvider />
        </div>
        <Suspense key={JSON.stringify(searchParams)} fallback={<div>Loading...</div>}>
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
