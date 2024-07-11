import React from "react";
import { client } from "~/utils/sanity/client";
import { groq, PortableText } from "next-sanity";
import { HeaderQueryResult } from "../../sanity.types";
import { components } from "~/utils/portabletext/components";
import { Link } from "~/ui/link";

export default async function Header() {
  const headerQuery = groq`*[_type == "header"][0]`;
  const headerContent = await client.fetch<HeaderQueryResult>(
    headerQuery,
    {},
    {
      next: { tags: ["header"] },
    }
  );
  // console.log(headerContent.links);
  if (!headerContent) return null;
  return (
    <header className="bg-white h-[4.6875rem] flex justify-between px-[6.25rem]">
      <div className="font-gilroy font-bold text-[2.5rem] text-neutral-900">
        {headerContent.logo && (
          <PortableText value={headerContent.logo} components={components} />
        )}
      </div>
      <div className="">
        {headerContent.links && headerContent.links.map((link) => (
          <Link key={link._key} href={link.url}>{link.text}</Link>
        ))}
        {/* <Link href="/">Home</Link>
        {headerContent.links} */}
      </div>
    </header>
  );
}
