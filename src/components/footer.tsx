import React from "react";
import { client } from "~/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { FooterQueryResult } from "../../sanity.types";
import { components } from "~/utils/portabletext/components";
import Link from "next/link";
import End from "~/icons/end";
import FacebookWhite from "~/icons/facebook-white";
import InstagramWhite from "~/icons/instagram-white";
import WebsiteWhite from "~/icons/website-white";

export default async function Footer() {
  const footerQuery = groq`*[_type == "footer"][0]{
    title,
    logo,
    additionalInformation,
    'socialPlatformIcon': socialPlatformIcon[]->{
      socialPlatform,
      link
    },
    'socialPlatform': socialPlatform[]->{
      title,
      link
    },
    button{
      text
    },
    links[]{_key, url, text}
    }`;
  const footerContent = await client.fetch<FooterQueryResult>(
    footerQuery,
    {},
    {
      next: { tags: ["footer"] },
    }
  );

  if (!footerContent) return null;
  return (
    <footer className="bg-neutral-900 pt-4 md:pt-16 px-5 md:px-[6.25rem] pb-2.5 text-neutral-50 pr-10">
      <div className="flex md:flex-row flex-col">
        <div className="pt-4 md:pt-10 border-y border-r border-neutral-300 md:basis-3/5 flex flex-col md:gap-6 md:pb-6 pb-3 md:pr-10 pr-3">
          <h2 className="font-gilroy font-extrabold text-2xl md:text-[4rem] leading-none">
            {footerContent.title}
          </h2>
          <Link
            href="/sneakers"
            className="mx-3 my-2 text-sm md:text-base flex gap-2 items-center w-fit text-brand-500 font-semibold"
          >
            {footerContent.button?.text}
            <End />
          </Link>
        </div>
        <div className="pt-4 md:pt-10 pb-3 md:pb-6 basis-2/5 border-y border-l border-neutral-300 md:pl-10 pl-3 flex flex-col gap-2 md:gap-4">
          <div>
            <div className="font-gilroy font-bold md:text-[2.4375rem] text-[1.8125rem]">
              {footerContent.logo && (
                <PortableText
                  value={footerContent.logo}
                  components={components}
                />
              )}
            </div>
            <div>
              {footerContent.socialPlatform?.map((platform) => (
                <p key={platform.title} className="py-2 text-sm md:text-base">
                  {platform.title}: {platform.link?.url}
                </p>
              ))}
              {footerContent.additionalInformation?.map((info) => (
                <p key={info} className="py-2 text-sm md:text-base">
                  {info}
                </p>
              ))}
            </div>
          </div>
          {footerContent.socialPlatformIcon && (
            <div className="flex gap-4 py-2">
              {footerContent.socialPlatformIcon
                .filter((icon) => icon.link !== null)
                .map((icon) => {
                  if (!icon.link || !icon.link.url) return null;
                  return (
                    <Link
                      target="_blank"
                      key={icon.link._type}
                      href={icon.link.url}
                    >
                      {icon.socialPlatform == "facebook" ? (
                        <FacebookWhite />
                      ) : icon.socialPlatform == "instagram" ? (
                        <InstagramWhite />
                      ) : icon.socialPlatform == "website" ? (
                        <WebsiteWhite />
                      ) : null}
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="py-4 text-xs md:text-base">Copyright EL.sneaker 2024 - All Rights Reserved</p>
      </div>
    </footer>
  );
}
