import { groq } from "next-sanity";
import React from "react";
import { client } from "~/sanity/lib/client";
import { BannerQueryResult } from "../../sanity.types";
import { Image } from "~/utils/sanity/image";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  DotButtons,
  CarouselAutoplay,
} from "~/ui/carousel-2";
import Autoplay from "./Autoplay";

export default async function Banner() {
  const bannerQuery = groq`*[_type == "banner"][0]{
    images[]{_key, 'ref':asset._ref}
    }`;
  const bannerContent = await client.fetch<BannerQueryResult>(
    bannerQuery,
    {},
    {
      next: { tags: ["banner"] },
    }
  );
  if (!bannerContent || !bannerContent.images) return null;
  return (
    <CarouselAutoplay
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {bannerContent.images.filter((image) => image.ref).map((image) => (
          <CarouselItem key={image._key}>
            <Image
              id={image.ref}
              alt={""}
              className="w-full aspect-[2/1] object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="ghost"
        className="left-5 bg-neutral-900/30 h-9 w-9"
      />
      <CarouselNext
        variant="ghost"
        className="right-5 bg-neutral-900/30 h-9 w-9"
      />
      <DotButtons />
    </CarouselAutoplay>
  );
}
