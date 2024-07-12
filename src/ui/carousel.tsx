"use client";

import React, { ReactElement } from "react";
import {
  Carousel as RACCarousel,
  CarouselButton,
  CarouselItem as RACCarouselItem,
  CarouselScroller,
  CarouselTab,
  CarouselTabs,
} from "react-aria-carousel";

import ArrowLeft from "~/icons/arrow-left";
import ArrowRight from "~/icons/arrow-right";

export function Carousel({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <RACCarousel
      className="relative"
      loop="infinite"
      mouseDragging
      spaceBetweenItems="1rem"
      autoplay
      autoplayInterval={5000}
    >
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
      <CarouselScroller className="grid overflow-hidden snap-x snap-mandatory grid-flow-col">
        {children}
      </CarouselScroller>
      <CarouselTabs className="flex gap-4 absolute left-1/2 -translate-x-1/2 bottom-8">
        {(item) => (
          <CarouselTab
            className={`w-3 h-3 rounded-full transition-colors duration-500 ${item.isSelected ? "bg-brand-500" : "bg-white"}`}
            index={item.index}
          />
        )}
      </CarouselTabs>
    </RACCarousel>
  );
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return (
    <RACCarouselItem>
      {children}
    </RACCarouselItem>
  );
}
