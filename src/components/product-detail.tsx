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
import { urlFor } from "~/sanity/lib/image";
import dynamic from "next/dynamic";
import ProductDetailSize from "./product-detail-size";
import ProductDetailPrice from "./product-detail-price";

const EasyZoomOnMove = dynamic(() => import("./EasyZoomOnMove"), {
  ssr: false,
});

export default async function ProductDetail({
  sneakerSlug,
  sizeParam,
}: {
  sneakerSlug: string;
  sizeParam: number;
}) {
  const sneakerQuery = groq`*[_type == "sneaker" && slug.current == $sneakerSlug][0]{
    name,
    "brand": brand->name,
    "collection": collection->name,
    price,
    "sizes": sizes[]{_key, size, price, out_of_stock},
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
    { sneakerSlug: decodeURIComponent(sneakerSlug) },
    {
      next: { tags: ["sneaker"] },
    }
  );
  if (!sneakerContent) return null;

  const sneakerDetailQuery = groq`*[_type == "sneakerDetail"][0]{
    sizeLabel,
    sizeGuideLabel,
    "sizeGuideImages": sizeGuideImages[]{
      "key": _key,
      "ref": asset._ref
    },
    skuLabel,
    contactLabel,
    social[]->{
      _id,
      socialPlatform,
      title,
      link}
  }`;

  const sneakerDetail =
    await client.fetch<SneakerDetailQueryResult>(sneakerDetailQuery, {}, {
      next: { tags: ["sneakerDetail", "social"] },
    });

  const price = sneakerContent.sizes?.find((s) => s.size === sizeParam && !s.out_of_stock)?.price ?? (sneakerContent.price ?? 0);
  return (
    <div className="px-5 py-5 md:px-[6.25rem] md:py-11 flex gap-[4.5rem] w-full">
      <div className="max-w-full w-1/2 hidden md:block">
        {sneakerContent.images &&
          sneakerContent.images.filter((image) => image.ref != null).length >
            0 && (
            <Carousel>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <CarouselPrevious className="static shrink-0 -translate-y-0 bg-neutral-100" />
                  <CarouselContent>
                    {sneakerContent.images
                      .filter((image) => image.ref != null)
                      .map((image) => (
                        <CarouselItem
                          className="rounded-2xl overflow-hidden"
                          key={image.key}
                        >
                          <EasyZoomOnMove
                            mainImage={{
                              src: urlFor(image.ref!)
                                .auto("format")
                                .fit("max")
                                .quality(75)
                                .url(),
                              alt: "My Product",
                            }}
                            zoomImage={{
                              src: urlFor(image.ref!)
                                .auto("format")
                                .fit("max")
                                .quality(100)
                                .url(),
                              alt: "My Product Zoom",
                            }}
                            loadingIndicator={<></>}
                            delayTimer={1000}
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

      <div className="flex flex-col gap-3 md:gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg md:text-[2rem] leading-[2.75rem]">
            {sneakerContent.name}
          </h2>
          <p className="font-medium text-sm md:text-xl">
            {sneakerContent.brand}
          </p>
          <p className="font-medium text-xs md:text-lg text-neutral-400">
            {sneakerContent.collection}
          </p>
          <ProductDetailPrice sizes={sneakerContent.sizes} price={price} />
        </div>
        <div className="md:hidden">
          {sneakerContent.images &&
            sneakerContent.images.filter((image) => image.ref != null).length >
              0 && (
              <Carousel>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-1 md:gap-4">
                    <CarouselPrevious className="static shrink-0 -translate-y-0 bg-neutral-100 hidden md:block" />
                    <CarouselContent>
                      {sneakerContent.images
                        .filter((image) => image.ref != null)
                        .map((image) => (
                          <CarouselItem
                            className="rounded-2xl overflow-hidden"
                            key={image.key}
                          >
                            <EasyZoomOnMove
                              mainImage={{
                                src: urlFor(image.ref!)
                                  .auto("format")
                                  .fit("max")
                                  .quality(75)
                                  .url(),
                                alt: "My Product",
                              }}
                              zoomImage={{
                                src: urlFor(image.ref!)
                                  .auto("format")
                                  .fit("max")
                                  .quality(100)
                                  .url(),
                                alt: "My Product Zoom",
                              }}
                              loadingIndicator={<></>}
                              delayTimer={1000}
                            />
                          </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselNext className="static shrink-0 -translate-y-0  bg-neutral-100 hidden md:block" />
                  </div>

                  <Thumbs images={sneakerContent.images} />
                </div>
              </Carousel>
            )}
        </div>

        <div className="flex flex-col gap-4">
          {sneakerDetail && (
            <div className="flex justify-between items-center">
              <p className="font-medium">{sneakerDetail?.sizeLabel}</p>
              <SizeGuide
                label={sneakerDetail.sizeGuideLabel}
                image={sneakerDetail.sizeGuideImages}
              />
            </div>
          )}

          {sneakerContent.sizes && sneakerContent.sizes.length > 0 && (
            <ProductDetailSize
              sizes={sneakerContent.sizes
                .map((size) => ({
                  size: size.size,
                  out_of_stock: size.out_of_stock,
                }))
                .filter((size) => size !== null)}
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2.5 md:text-lg">
            <p className="font-medium">{sneakerDetail?.skuLabel}</p>
            <p className="font-light">{sneakerContent.sku}</p>
          </div>
          {sneakerContent.content && (
            <div className="list-disc text-sm md:text-base">
              <PortableText
                value={sneakerContent.content}
                components={components}
              />
            </div>
          )}
        </div>
        {sneakerDetail && sneakerDetail.social && (
          <div className="flex flex-col gap-3">
            <p className="font-medium md:text-lg">
              {sneakerDetail.contactLabel}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
