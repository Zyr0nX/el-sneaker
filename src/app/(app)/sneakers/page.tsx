import FilterProvider from "~/components/filter-provider";
import { Suspense } from "react";
import ProductCount from "~/components/product-count";
import { Sort } from "~/components/sort";
import ProductPaginationProvider from "~/components/product-pagination-provider";
import ProductListProvider from "~/components/product-list-provider";
import ProductCountSkeleton from "~/components/product-count-skeleton";
import ProductListSkeleton from "~/components/product-list-skeleton";

export default async function PostIndex({
  searchParams,
}: {
  searchParams: {
    brands?: string;
    sizes?: string;
    minPrice?: string;
    maxPrice?: string;
    collections?: string;
    sort?: string;
    page?: string;
  };
}) {
  console.log(
    JSON.stringify({
      brands: searchParams.brands,
      sizes: searchParams.sizes,
      collections: searchParams.collections,
      from: searchParams.minPrice,
      to: searchParams.maxPrice,
      sort: searchParams.sort,
      page: searchParams.page,
    })
  );
  return (
    <div className="py-11 px-[6.25rem] flex flex-col gap-8">
      <h2 className="font-bold text-[2.5rem]">Danh mục sản phẩm</h2>
      <div className="flex gap-6">
        <div className="w-72 shrink-0">
          <FilterProvider />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center">
            <Suspense
              key={JSON.stringify({
                brands: searchParams.brands,
                sizes: searchParams.sizes,
                collections: searchParams.collections,
                minPrice: searchParams.minPrice,
                maxPrice: searchParams.maxPrice,
              })}
              fallback={<ProductCountSkeleton />}
            >
              <ProductCount
                brands={searchParams.brands}
                sizes={searchParams.sizes}
                collections={searchParams.collections}
                minPrice={searchParams.minPrice}
                maxPrice={searchParams.maxPrice}
              />
            </Suspense>
            <Sort />
          </div>
          <Suspense
            key={JSON.stringify({
              brands: searchParams.brands,
              sizes: searchParams.sizes,
              collections: searchParams.collections,
              minPrice: searchParams.minPrice,
              maxPrice: searchParams.maxPrice,
              sort: searchParams.sort,
              page: searchParams.page,
            })}
            fallback={<ProductListSkeleton />}
          >
            <ProductListProvider
              brands={searchParams.brands}
              sizes={searchParams.sizes}
              collections={searchParams.collections}
              minPrice={searchParams.minPrice}
              maxPrice={searchParams.maxPrice}
              sort={searchParams.sort}
              page={searchParams.page}
            />
          </Suspense>
          <Suspense>
            <ProductPaginationProvider
              key={JSON.stringify({
                brands: searchParams.brands,
                sizes: searchParams.sizes,
                collections: searchParams.collections,
                from: searchParams.minPrice,
                to: searchParams.maxPrice,
              })}
              brands={searchParams.brands}
              sizes={searchParams.sizes}
              collections={searchParams.collections}
              from={searchParams.minPrice}
              to={searchParams.maxPrice}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}