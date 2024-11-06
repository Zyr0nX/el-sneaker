import { groq } from "next-sanity";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/ui/pagination";
import { client } from "~/sanity/lib/client";
import { ProductCountQueryResult } from "../../sanity.types";
import { cookies } from "next/headers";
import ProductPagination from "./product-pagination";

export default async function ProductPaginationProvider({
  brands,
  sizes,
  collections,
  minPrice,
  maxPrice,
}: {
  brands?: string;
  sizes?: string;
  collections?: string;
  minPrice?: string;
  maxPrice?: string;
}) {
  const productCountQuery = groq`count(*[_type == "sneaker" 
      && (!defined($brands) || brand->slug.current in $brands)
      && (!defined($collections) || collection->slug.current in $collections)
      && (!defined($sizes) || count((sizes[out_of_stock != true].size)[@ in $sizes]) > 0)
      && (!defined($minPrice) || price >= $minPrice)
      && (!defined($maxPrice) || price <= $maxPrice)
    ])`;

  const productCount = await client.fetch<ProductCountQueryResult>(
    productCountQuery,
    {
      brands: brands ? brands.split(",") : null,
      sizes: sizes
        ? sizes
            .split(",")
            .filter((item) => !isNaN(Number(item)))
            .map((item) => Number(item))
        : null,
      collections: collections ? collections.split(",") : null,
      minPrice: minPrice ? parseInt(minPrice) || "" : null,
      maxPrice: maxPrice ? parseInt(maxPrice) || "" : null,
    },
    { next: { tags: ["sneaker"] } }
  );

  if (productCount <= 12) return null;

  return <ProductPagination total={productCount} />;
}