"use client";

import React from "react";
import ProductCard from "./product-card";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

export default function ProductList({
  products,
}: {
  products: {
    _id: string;
    slug: string | null;
    name: string | null;
    price: number | null;
    brand: string | null;
    image: string | null;
  }[];
}) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");

  // function updateCookies(sort: string, page: string, products: any) {
  //   if (products.length === 0) return;
  //   console.log(!products)
  //   const lastProductId = products[products.length - 1]._id;
    
  //   const lastProductPrice = products[products.length - 1].price

  //   const cookieName = sort === "asc" ? "lastAscs" : "lastDescs";
  //   const lastIdsCookieName = sort === "asc" ? "lastIdsAsc" : "lastIdsDesc";

  //   const lastCookie = getCookie(cookieName);
  //   const lastIdsCookie = getCookie(lastIdsCookieName);

  //   let lastData = lastCookie ? JSON.parse(lastCookie) : {};
  //   let lastIdsData = lastIdsCookie ? JSON.parse(lastIdsCookie) : {};

  //   if (typeof lastData !== "object" || lastData === null) {
  //     lastData = {};
  //   }
  //   if (typeof lastIdsData !== "object" || lastIdsData === null) {
  //     lastIdsData = {};
  //   }

  //   lastData[page || 1] = lastProductPrice;
  //   lastIdsData[page || 1] = lastProductId;

  //   setCookie(cookieName, lastData);
  //   setCookie(lastIdsCookieName, lastIdsData);
  // }

  // if (sort === "asc" || sort === "desc") {
  //   updateCookies(sort, page, products);
  // }

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          slug={product.slug}
          brand={product.brand}
          image={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}
