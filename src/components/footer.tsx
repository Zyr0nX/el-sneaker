import React from "react";
import { client } from "~/utils/sanity/client";
import { groq, PortableText } from "next-sanity";
import { FooterQueryResult } from "../../sanity.types";
import { components } from "~/utils/portabletext/components";
import { Link } from "~/ui/link";
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
    <footer className="bg-neutral-900 pt-16 px-[6.25rem] pb-2.5 text-neutral-50 pr-10">
      <div className="flex">
        <div className="pt-10 border-y border-r border-neutral-300 basis-3/5 flex flex-col gap-6 pb-6">
          <h2 className="font-gilroy font-extrabold text-[4rem] leading-none">
            {footerContent.title}
          </h2>
          <Link variant="text" className="flex gap-2 items-center w-fit">
            {footerContent.button?.text}
            <End />
          </Link>
        </div>
        <div className="pt-10 pb-6 basis-2/5 border-y border-l border-neutral-300 pl-10 flex flex-col gap-4">
          <div>
            <div className="font-gilroy font-bold text-[2.5rem]">
              {footerContent.logo && (
                <PortableText
                  value={footerContent.logo}
                  components={components}
                />
              )}
            </div>
            <div>
              {footerContent.socialPlatform?.map((platform) => (
                <p key={platform.title} className="py-2">
                  {platform.title}: {platform.link?.url}
                </p>
              ))}
              {footerContent.additionalInformation?.map((info) => (
                <p key={info} className="py-2">
                  {info}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-4 py-2">
            {footerContent.socialPlatformIcon?.map((icon) => (
              <Link
                target="_blank"
                variant="link"
                key={icon.link?._type}
                href={icon.link?.url}
              >
                {icon.socialPlatform == "facebook" ? (
                  <FacebookWhite />
                ) : icon.socialPlatform == "instagram" ? (
                  <InstagramWhite />
                ) : icon.socialPlatform == "website" ? (
                  <WebsiteWhite />
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="py-4">Copyright EL.sneaker 2024 - All Rights Reserved</p>
      </div>
    </footer>
  );
}
