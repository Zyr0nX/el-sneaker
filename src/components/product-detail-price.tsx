"use client"

import { useSearchParams } from "next/navigation";
import React from "react";

export default function ProductDetailPrice({
  sizes,
  price,
}: {
  sizes:
    | {
        size: number | null;
        price: number | null;
        out_of_stock: boolean | null;
      }[]
    | null;
  price: number | null;
}) {
  const searchParams = useSearchParams();
  const size = searchParams.get("size");

  return (
    <p className="font-semibold md:text-2xl text-brand-500">
      {(
        sizes?.find((s) => s.size === Number(size) && !s.out_of_stock)?.price ??
        price ??
        0
      ).toLocaleString("vi-VN")}
      đ
    </p>
  );
}   
