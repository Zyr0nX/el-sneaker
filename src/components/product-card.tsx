import React from "react";
import { Link } from "~/ui/link";
import { Image } from "~/utils/sanity/image";

export default function ProductCard({
  sneaker,
}: {
  sneaker: {
    _id: string;
    name: string | null;
    price: number | null;
    slug: {
      current: string;
    } | null;
    brand: {
      name: string | null;
    } | null;
    image: {
      ref: string | null;
    } | null;
  };
}) {
  return (
    <Link
      variant="link"
      key={sneaker._id}
      href={sneaker.slug ? `/sneakers/${sneaker.slug.current}` : "#"}
      className="flex flex-col gap-2 rounded-2xl overflow-hidden hover:outline-brand-300 hover:outline"
    >
      <div>
        {sneaker.image && (
          <Image
            id={sneaker.image.ref}
            alt={""}
            className="w-full aspect-square object-cover"
          />
        )}
        <div className="py-4 px-3 flex flex-col gap-1">
          <h6 className="font-medium text-lg truncate">{sneaker.name}</h6>
          <div className="flex flex-col gap-1">
            <p className="text-neutral-400 truncate">{sneaker.brand?.name}</p>
            <h5 className="text-brand-500 font-medium">
              {sneaker.price?.toLocaleString("vi-VN")}đ
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
