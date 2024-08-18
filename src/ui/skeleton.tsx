import { cn } from "~/utils/shadcn";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse bg-neutral-100", {
  variants: {
    variant: {
      image: "rounded-t-2xl",
      text: "rounded",
      icon: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton };
