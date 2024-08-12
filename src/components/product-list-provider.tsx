import { groq } from "next-sanity";
import React from "react";
import { client } from "~/utils/sanity/client";
import { SneakerListQueryResult } from "../../sanity.types";
import ProductList from "./product-list";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export default async function ProductListProvider({
  brands,
  sizes,
  from,
  to,
  collections,
  sort,
  page,
}: {
  brands?: string;
  sizes?: string;
  from?: string;
  to?: string;
  collections?: string;
  sort?: string;
  page?: string;
}) {
  const lastIdsAsc = getCookie("lastIdsAsc", { cookies })
    ? JSON.parse(getCookie("lastIdsAsc", { cookies }) as string)
    : {};
  const lastAscs = getCookie("lastAscs", { cookies })
    ? JSON.parse(getCookie("lastAscs", { cookies }) as string)
    : {};

  const lastIdsDesc = getCookie("lastIdsDesc", { cookies })
    ? JSON.parse(getCookie("lastIdsDesc", { cookies }) as string)
    : {};
  const lastDescs = getCookie("lastDescs", { cookies })
    ? JSON.parse(getCookie("lastDescs", { cookies }) as string)
    : {};

  const sneakerListQuery =
    sort === "asc"
      ? groq`*[_type == "sneaker" 
    && (!defined($brands) || brand->slug.current in $brands)
    && (!defined($collections) || collection->slug.current in $collections)
    && (!defined($sizes) || count((sizes[out_of_stock != true].size)[@ in $sizes]) > 0)
    && (!defined($from) || price >= $from)
    && (!defined($to) || price <= $to)
    // && (!defined($lastAscs) || !defined($lastIdsAsc) || price > $lastAscs || (price == $lastAscs && _id > $lastIdsAsc))
    ]|order(price asc)[$first...$last]{
      _id,
      "slug": slug.current,
      name,
      price,
      "brand": brand->name,
      "image": images[0].asset._ref
    }`
      : sort === "desc"
        ? groq`*[_type == "sneaker" 
    && (!defined($brands) || brand->slug.current in $brands)
    && (!defined($collections) || collection->slug.current in $collections)
    && (!defined($sizes) || count((sizes[out_of_stock != true].size)[@ in $sizes]) > 0)
    && (!defined($from) || price >= $from)
    && (!defined($to) || price <= $to)
    // && (!defined($lastDescs) || !defined($lastIdsDesc) || price > $lastDescs || (price == $lastDescs && _id > $lastIdsDesc))
    ]|order(price desc)[$first...$last]{
      _id,
      "slug": slug.current,
      name,
      price,
      "brand": brand->name,
      "image": images[0].asset._ref
    }`
        : groq`*[_type == "sneaker" 
    && (!defined($brands) || brand->slug.current in $brands)
    && (!defined($collections) || collection->slug.current in $collections)
    && (!defined($sizes) || count((sizes[out_of_stock != true].size)[@ in $sizes]) > 0)
    && (!defined($from) || price >= $from)
    && (!defined($to) || price <= $to)
    //TODO
    ][$first...$last]{
      _id,
      "slug": slug.current,
      name,
      price,
      "brand": brand->name,
      "image": images[0].asset._ref
    }`;

  function findSkipPages(page: number, lastIdsAsc: any, lastAscs: any) {
    console.log(page);
    const pageNum = Number(page);
    const lastIdsAscKeys = Object.keys(lastIdsAsc).map(Number);
    const lastAscsKeys = Object.keys(lastAscs).map(Number);
    const commonKeys = lastIdsAscKeys
      .filter((key) => lastAscsKeys.includes(key))
      .sort((a, b) => a - b);

    let closestLesserPage = 0;

    for (let i = 0; i < commonKeys.length; i++) {
      if (commonKeys[i] < pageNum) {
        closestLesserPage = commonKeys[i];
      } else {
        break;
      }
    }

    const skipPages = pageNum - closestLesserPage;
    return skipPages;
  }

  const sneakerList = await client.fetch<SneakerListQueryResult>(
    sneakerListQuery,
    {
      brands: brands ? brands.split(",") : null,
      sizes: sizes
        ? sizes
            .split(",")
            .filter((item) => !isNaN(Number(item)))
            .map((item) => Number(item))
        : null,
      collections: collections ? collections.split(",") : null,
      from: from || null,
      to: to || null,
      lastAscs: page
        ? lastAscs[Number(page) - 1]
          ? lastAscs[Number(page) - 1]
          : null
        : null,
      lastIdsAsc: page
        ? lastIdsAsc[Number(page) - 1]
          ? lastIdsAsc[Number(page) - 1]
          : null
        : null,
      lastDescs: page
        ? lastDescs[Number(page) - 1]
          ? lastDescs[Number(page) - 1]
          : null
        : null,
      lastIdsDesc: page
        ? lastIdsDesc[Number(page) - 1]
          ? lastIdsDesc[Number(page) - 1]
          : null
        : null,
      first:
        // sort == "asc"
        //   ? lastAscs[Number(page) - 1] && lastIdsAsc[Number(page) - 1]
        //     ? 0
        //     : Number(page) - 1
        //       ? findSkipPages(Number(page) - 1, lastIdsAsc, lastAscs) * 12
        //       : findSkipPages(0, lastIdsAsc, lastAscs) * 12
        //   : sort == "decs"
        //     ? lastDescs[Number(page) - 1] && lastIdsDesc[Number(page) - 1]
        //       ? 0
        //       : Number(page) - 1
        //         ? findSkipPages(Number(page) - 1, lastIdsDesc, lastDescs) * 12
        //         : findSkipPages(0, lastIdsDesc, lastDescs) * 12
        //     : 0,
        page ? (Number(page) - 1) * 12 : 0,
      last:
        // sort == "asc"
        //   ? lastAscs[Number(page) - 1] && lastIdsAsc[Number(page) - 1]
        //     ? 12
        //     : Number(page) - 1
        //       ? findSkipPages(Number(page) - 1, lastIdsAsc, lastAscs) * 12 + 12
        //       : findSkipPages(0, lastIdsAsc, lastAscs) * 12 + 12
        //   : sort == "decs"
        //     ? lastDescs[Number(page) - 1] && lastIdsDesc[Number(page) - 1]
        //       ? 12
        //       : Number(page) - 1
        //         ? findSkipPages(Number(page) - 1, lastIdsDesc, lastDescs) * 12 +
        //           12
        //         : findSkipPages(0, lastIdsDesc, lastDescs) * 12 + 12
        //     : 12,
        page ? Number(page) * 12 : 12,
    },
    {
      next: { tags: ["sneaker"] },
      cache: "no-store",
    }
  );
  return <ProductList products={sneakerList} />;
}
