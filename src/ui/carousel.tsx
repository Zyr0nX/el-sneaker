"use client"

import Image from "next/image";
import React, { ReactElement } from "react";
import {
  Carousel as RACCarousel,
  CarouselButton,
  CarouselItem as RACCarouselItem,
  CarouselScroller,
  CarouselTab,
  CarouselTabs,
  CarouselAutoplayControl,
} from "react-aria-carousel";

import { tv } from "tailwind-variants";
import ArrowLeft from "~/icons/arrow-left";
import ArrowRight from "~/icons/arrow-right";
// import { focusRing } from './utils';

// export interface ButtonProps extends RACButtonProps {
//   variant?: "primary";
//   // | 'secondary' | 'destructive' | 'icon'
// }

let button = tv({
  // extend: focusRing,
  base: "",
  variants: {
    variant: {
      primary: "bg-brand-500 px-4 py-2.5 rounded-full",
      // secondary: 'bg-gray-100 hover:bg-gray-200 pressed:bg-gray-300 text-gray-800 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400 dark:text-zinc-100',
      // destructive: 'bg-red-700 hover:bg-red-800 pressed:bg-red-900 text-white',
      // icon: 'border-0 p-1 flex items-center justify-center text-gray-600 hover:bg-black/[5%] pressed:bg-black/10 dark:text-zinc-400 dark:hover:bg-white/10 dark:pressed:bg-white/20 disabled:bg-transparent'
    },
    // isDisabled: {
    //   true: 'bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5'
    // }
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Carousel({ children }: { children: ReactElement | ReactElement[] }) {
  return (
    <RACCarousel className="relative">
      <div className="">
        <CarouselButton
          dir="prev"
          className="bg-neutral-900/30 h-9 w-9 rounded-full flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-5"
        >
          <ArrowLeft />
        </CarouselButton>
        <CarouselButton
          dir="next"
          className="bg-neutral-900/30 h-9 w-9 rounded-full flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-5"
        >
          <ArrowRight />
        </CarouselButton>
      </div>
      <CarouselScroller className="grid overflow-hidden scroll-snap-x-mandatory grid-flow-col aspect-video object-cover">
        {children}
      </CarouselScroller>
      {/* <CarouselTabs className="grid-area-tabs flex gap-4">
        {[0, 1, 2, 3].map((index) => (
          <CarouselTab
            key={index}
            className={`bg-gray-600 text-gray-1200 text-sm rounded-md px-2 ${
              item.index === index ? "bg-darkgrey" : ""
            }`}
            index={index}
          >
            {index + 1}
          </CarouselTab>
        ))}
      </CarouselTabs> */}
    </RACCarousel>
  );
}

// function Item({ src, alt }: { src: string, alt: string }) {
//   return (
//     <CarouselItem className="aspect-[3/2]">
//       <Image src={src} alt={alt} />
//     </CarouselItem>
//   );
// }

export function CarouselItem({ index, children }: { index: number, children: React.ReactNode }) {
  return (
    <RACCarouselItem className="">
      {children}
      {/* <Image src={src} alt={alt} /> */}
    </RACCarouselItem>
  );
}