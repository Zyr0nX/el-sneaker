import { groq } from "next-sanity";
import React from "react";
import { Carousel, CarouselItem } from "~/ui/carousel";
import { client } from "~/utils/sanity/client";
import { BannerQueryResult } from "../../sanity.types";
import { Image } from "~/utils/sanity/image";

export default async function Banner() {
  const bannerQuery = groq`*[_type == "banner"][0]`;
  const bannerContent = await client.fetch<BannerQueryResult>(
    bannerQuery,
    {},
    {
      next: { tags: ["banner"] },
    }
  );
  if (!bannerContent || !bannerContent.images) return null;
  console.log(bannerContent);
  return (
    <Carousel>
      {bannerContent.images &&
        bannerContent.images.map((image) => (
          <CarouselItem key={image._key} index={0}>
            <Image key={image._key} id={image.asset?._ref} alt={""} />
          </CarouselItem>
        ))}
    </Carousel>
  );
}
