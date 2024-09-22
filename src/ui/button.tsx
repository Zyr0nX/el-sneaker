import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/shadcn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-neutral-50 hover:bg-brand-300 border-brand-500",
        secondary:
          "bg-white border border-brand-500 text-brand-500 hover:bg-brand-100",
        ghost: "bg-transparent hover:bg-brand-100",
        text: "text-brand-500",
      },
      size: {
        sm: "text-sm py-1.5 px-3",
        md: "px-3 py-2",
        lg: "px-6 py-2.5",
        icon: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
