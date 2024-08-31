"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '~/ui/button'
import { cn } from '~/utils/shadcn';

export default function ProductDetailSize({ sizes }: { sizes: number[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
  return (
    <div className="flex gap-4 flex-wrap">
      {sizes.map((size) => (
        <Button
        //   className={cn(
        //     "hover:border-brand-100",
        //     Number(searchParams.get("size")) === size &&
        //       "bg-brand-500 text-neutral-50"
        //   )}
          key={size}
          variant={Number(searchParams.get("size")) === size ? "primary" : "secondary"}
          onClick={() => {
            router.replace(`?size=${size}`);
          }}
        >
          {size}
        </Button>
      ))}
    </div>
  );
}
