import FilterProvider from "~/components/filter-provider";
import { Suspense } from "react";
import ProductCount from "~/components/product-count";
import { Sort } from "~/components/sort";
import ProductPaginationProvider from "~/components/product-pagination-provider";
import ProductListProvider from "~/components/product-list-provider";
import ProductCountSkeleton from "~/components/product-count-skeleton";
import ProductListSkeleton from "~/components/product-list-skeleton";
import SortProvider from "~/components/sort-provider";
import FilterMobile from "~/components/filter-mobile";

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
  return (
    <div className="px-5 py-5 md:py-11 md:px-[6.25rem] flex flex-col gap-8">
      <h2 className="font-bold text-[2.5rem]">Danh mục sản phẩm</h2>
      <div className="flex gap-6">
        <div className="w-72 shrink-0 hidden md:block">
          <FilterProvider isMobile={false} />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="md:hidden">
                <FilterProvider isMobile={true} />
              </div>

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
            </div>

            <SortProvider />
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
                minPrice: searchParams.minPrice,
                maxPrice: searchParams.maxPrice,
              })}
              brands={searchParams.brands}
              sizes={searchParams.sizes}
              collections={searchParams.collections}
              minPrice={searchParams.minPrice}
              maxPrice={searchParams.maxPrice}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
