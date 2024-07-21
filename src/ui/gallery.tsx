"use client";

import React, { ReactElement, useState } from "react";
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

export function Gallery({
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
      <div className="flex flex-col gap-6 ">
        <div className="flex items-center gap-4">
          <CarouselButton
            dir="prev"
            className="bg-neutral-900/30 h-9 w-9 rounded-full flex justify-center items-center"
          >
            <ArrowLeft />
          </CarouselButton>
          <CarouselScroller className="grid overflow-hidden snap-x snap-mandatory grid-flow-col">
            {children}
          </CarouselScroller>
          <CarouselButton
            dir="next"
            className="bg-neutral-900/30 h-9 w-9 rounded-full flex justify-center items-center"
          >
            <ArrowRight />
          </CarouselButton>
        </div>

        <CarouselTabs className="flex gap-4 justify-center overflow-x-auto">
          {(item) => {
            // @ts-ignore
            const child = children[item.index];
            const src = child.props.children.props.src;

            return (
              <CarouselTab
                className={`w-32 h-32 rounded-2xl overflow-hidden transition-colors duration-500 ${
                  item.isSelected
                    ? "border-2 border-brand-500"
                    : "border-2 border-transparent"
                }`}
                index={item.index}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${item.index + 1}`}
                  className="aspect-square object-cover"
                />
              </CarouselTab>
            );
          }}
        </CarouselTabs>
      </div>
    </RACCarousel>
  );
}

export function GalleryItem({ children }: { children: React.ReactNode }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <RACCarouselItem
      className="aspect-square"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </RACCarouselItem>
  );
}
