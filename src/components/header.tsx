import React from "react";
import { client } from "~/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { HeaderQueryResult } from "../../sanity.types";
import { components } from "~/utils/portabletext/components";
import Link from "next/link";

export default async function Header() {
  const headerQuery = groq`*[_type == "header"][0]{
    logo,
    links[]{_key, url, text}
    }`;
  const headerContent = await client.fetch<HeaderQueryResult>(
    headerQuery,
    {},
    {
      next: { tags: ["header"] },
    }
  );

  if (!headerContent) return null;
  return (
    <header className="bg-white py-3 flex justify-between px-6 md:px-[6.25rem] items-center shadow-[-8px_4px_20px_0px_#919EAB3D]">
      <Link
        className="font-gilroy font-bold md:text-[2.4375rem] text-[1.8125rem] text-neutral-900"
        href="/"
      >
        {headerContent.logo && (
          <PortableText value={headerContent.logo} components={components} />
        )}
      </Link>
      <div>
        {headerContent.links &&
          headerContent.links.map((link) => {
            if (!link.url) return null;

            return (
              <Link
                className="bg-brand-500 px-4 py-2.5 rounded-full text-neutral-50 font-semibold"
                key={link._key}
                href={link.url}
              >
                {link.text}
              </Link>
            );
          })}
      </div>
    </header>
  );
}
