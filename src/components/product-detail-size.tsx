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
          className='px-5 py-1.5 border-[2px] font-semibold'
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
