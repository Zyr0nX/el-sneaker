import React from 'react'
import ProductCardSkeleton from './product-card-skeleton';

export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
