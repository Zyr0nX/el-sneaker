"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '~/ui/button'

export default function ProductDetailSize({
  sizes,
}: {
  sizes: { size: number | null; out_of_stock: boolean | null }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="flex gap-4 flex-wrap">
      {sizes.map((size) => (
        <Button
          className="px-5 py-1.5 border-[2px] font-semibold"
          key={size.size}
          variant={
            size.out_of_stock ? "disable" :
            Number(searchParams.get("size")) === size.size ? "primary" : "secondary"
          }
          onClick={() => {
            if (size.out_of_stock) return;
            router.replace(`?size=${size}`);
          }}
        >
          {size.size}
        </Button>
      ))}
    </div>
  );
}
