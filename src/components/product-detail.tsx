import { groq, PortableText } from "next-sanity";
import React from "react";
import { client } from "~/sanity/lib/client";
import {
  SneakerDetailQueryResult,
  SneakerQueryResult,
} from "../../sanity.types";
import { Image } from "~/utils/sanity/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Thumbs,
} from "~/ui/carousel-2";
import { components } from "~/utils/portabletext/components";
import Link from "next/link";
import Facebook from "~/icons/facebook";
import Instagram from "~/icons/instagram";
import Zalo from "~/icons/zalo";
import Gmail from "~/icons/gmail";
import { cn } from "~/utils/shadcn";
import { SizeGuide } from "./size-guide";

export default async function ProductDetail({
  sneakerSlug,
}: {
  sneakerSlug: string;
}) {
  const sneakerQuery = groq`*[_type == "sneaker" && slug.current == $sneakerSlug][0]{
    name,
    "brand": brand->name,
    "collection": collection->name,
    price,
    "sizes": sizes[]{_key, size, out_of_stock},
    description,
    "images": images[]{
      "key": _key,
      "ref": asset._ref
    },
    sku,
    content,
  }`;
  const sneakerContent = await client.fetch<SneakerQueryResult>(
    sneakerQuery,
    { sneakerSlug },
    {
      next: { tags: ["sneaker", sneakerSlug] },
    }
  );

  if (!sneakerContent) return null;

  const sneakerDetailQuery = groq`*[_type == "sneakerDetail"][0]{
    sizeLabel,
    sizeGuideLabel,
    "sizeGuideImage": sizeGuideImage.asset._ref,
    skuLabel,
    contactLabel,
    social[]->{
      _id,
      socialPlatform,
      title,
      link}
  }`;
  const sneakerDetail =
    await client.fetch<SneakerDetailQueryResult>(sneakerDetailQuery);
  return (
    <div className="px-[6.25rem] py-11 flex gap-[4.5rem] w-full ">
      <div className="max-w-full w-1/2">
        {sneakerContent.images && sneakerContent.images.length > 0 && (
          <Carousel>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <CarouselPrevious className="static shrink-0 -translate-y-0 bg-neutral-100" />
                <CarouselContent>
                  {sneakerContent.images.map((image) => (
                    <CarouselItem key={image.key}>
                      <Image
                        id={image.ref}
                        alt=""
                        className="object-cover w-fit rounded-2xl"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNext className="static shrink-0 -translate-y-0  bg-neutral-100" />
              </div>

              <Thumbs images={sneakerContent.images} />
            </div>
          </Carousel>
        )}
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-[2rem]">{sneakerContent.name}</h2>
          <p className="font-medium text-lg text-neutral-400">
            {sneakerContent.brand}
          </p>
          <p className="font-semibold text-2xl text-brand-500">
            {sneakerContent.price?.toLocaleString("vi-VN")}đ
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {sneakerDetail && (
            <div className="flex justify-between">
              <p className="font-medium">{sneakerDetail?.sizeLabel}</p>
              <SizeGuide
                label={sneakerDetail.sizeGuideLabel}
                image={sneakerDetail.sizeGuideImage}
              />
            </div>
          )}

          {sneakerContent.sizes && sneakerContent.sizes.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {sneakerContent.sizes.map((size) => {
                return (
                  <div
                    key={size._key}
                    className={cn(
                      "py-1.5 px-4 outline-1 outline font-semibold rounded-full",
                      size.out_of_stock
                        ? "bg-neutral-100 border-neutral-200 text-neutral-300"
                        : "border-brand-500 text-brand-500"
                    )}
                  >
                    {size.size}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex gap-2.5 text-lg">
              <p className="font-medium">{sneakerDetail?.skuLabel}</p>
              <p className="font-light">{sneakerContent.sku}</p>
            </div>
            {sneakerContent.content && (
              <div className="list-disc">
                <PortableText
                  value={sneakerContent.content}
                  components={components}
                />
              </div>
            )}
          </div>
        </div>
        {sneakerDetail && sneakerDetail.social && (
          <div className="flex flex-col gap-3">
            <p className="font-medium text-lg">{sneakerDetail.contactLabel}</p>
            <div className="grid grid-cols-2 gap-3">
              {sneakerDetail.social.map((social) => {
                if (!social.link || !social.link.url) return null;
                return (
                  <Link
                    className="flex gap-3 hover:underline hover:text-brand-500"
                    target="_blank"
                    key={social._id}
                    href={social.link.url}
                  >
                    {social.socialPlatform == "facebook" ? (
                      <Facebook />
                    ) : social.socialPlatform == "instagram" ? (
                      <Instagram />
                    ) : social.socialPlatform == "zalo" ? (
                      <Zalo />
                    ) : social.socialPlatform === "email" ? (
                      <Gmail />
                    ) : null}
                    <p>{social.link.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
