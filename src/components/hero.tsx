import { groq } from "next-sanity";
import React from "react";
import { Carousel, CarouselItem } from "~/ui/carousel";
import { client } from "~/utils/sanity/client";
import { BannerQueryResult } from "../../sanity.types";
import { Image } from "~/utils/sanity/image";

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
    <Carousel>
      {bannerContent.images.map((image) => (
        <CarouselItem key={image._key}>
          <Image
            id={image.ref}
            alt={""}
            className="w-full aspect-[2/1] object-cover"
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
}
