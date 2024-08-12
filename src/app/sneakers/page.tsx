import FilterProvider from "~/components/filter-provider";
import { Suspense } from "react";
import ProductCount from "~/components/product-count";
import { Sort } from "~/components/sort";
import ProductPaginationProvider from "~/components/product-pagination-provider";
import ProductListProvider from "~/components/product-list-provider";

export default async function PostIndex({
  searchParams,
}: {
  searchParams: {
    brands?: string;
    sizes?: string;
    from?: string;
    to?: string;
    collections?: string;
    sort?: string;
    page?: string;
  };
}) {
  return (
    <div className="py-11 px-[6.25rem] flex flex-col gap-8">
      <h2 className="font-bold text-[2.5rem]">Danh mục sản phẩm</h2>
      <div className="flex gap-6">
        <div className="w-72 shrink-0">
          <FilterProvider />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Suspense
              key={JSON.stringify({
                brands: searchParams.brands,
                sizes: searchParams.sizes,
                collections: searchParams.collections,
                from: searchParams.from,
                to: searchParams.to,
              })}
              fallback={<div>Loading...</div>}
            >
              <ProductCount
                brands={searchParams.brands}
                sizes={searchParams.sizes}
                collections={searchParams.collections}
                from={searchParams.from}
                to={searchParams.to}
              />
            </Suspense>
            <Sort />
          </div>
          <Suspense
            key={JSON.stringify({
              brands: searchParams.brands,
              sizes: searchParams.sizes,
              collections: searchParams.collections,
              from: searchParams.from,
              to: searchParams.to,
              sort: searchParams.sort,
              page: searchParams.page,
            })}
            fallback={<div>Loading...</div>}
          >
            <ProductListProvider
              brands={searchParams.brands}
              sizes={searchParams.sizes}
              collections={searchParams.collections}
              from={searchParams.from}
              to={searchParams.to}
              sort={searchParams.sort}
              page={searchParams.page}
            />
          </Suspense>
          <Suspense
            key={JSON.stringify({
              brands: searchParams.brands,
              sizes: searchParams.sizes,
              collections: searchParams.collections,
              from: searchParams.from,
              to: searchParams.to,
            })}
            fallback={<div>Loading...</div>}
          >
            <ProductPaginationProvider
              brands={searchParams.brands}
              sizes={searchParams.sizes}
              collections={searchParams.collections}
              from={searchParams.from}
              to={searchParams.to}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
