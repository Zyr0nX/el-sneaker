import React from "react";
import { Link } from "~/ui/link";
import { Image } from "~/utils/sanity/image";

export default function ProductCard({
  slug,
  image,
  name,
  price,
  brand,
}: {
  slug: string | null;
  image: string | null;
  name: string | null;
  price: number | null;
  brand: string | null;
}) {
  return (
    <Link
      variant="link"
      href={`/sneakers/${slug}`}
      className="flex flex-col gap-2 rounded-2xl overflow-hidden hover:outline-brand-300 hover:outline"
    >
      <div title={name ?? undefined}>
        {image && (
          <Image
            id={image}
            alt={""}
            className="w-full aspect-square object-cover"
          />
        )}

        <div className="py-4 px-3 flex flex-col gap-1">
          <h6 className="font-medium text-lg truncate">{name}</h6>
          <div className="flex flex-col gap-1">
            <p className="text-neutral-400 truncate">{brand}</p>
            <h5 className="text-brand-500 font-medium">
              {price?.toLocaleString("vi-VN")}đ
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
