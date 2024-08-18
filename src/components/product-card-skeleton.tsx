import React from "react";
import { Skeleton } from "~/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton variant="image" className="w-full aspect-square"></Skeleton>
      <div className="py-2 flex flex-col gap-1">
        <Skeleton variant="text" className="w-full h-7"></Skeleton>
        <div className="flex flex-col gap-1">
          <Skeleton variant="text" className="w-full h-6"></Skeleton>
          <Skeleton variant="text" className="w-full h-6"></Skeleton>
        </div>
      </div>
    </div>
  );
}
