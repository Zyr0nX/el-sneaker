"use client";

import type { ImageLoaderProps } from "next/image";
import { urlFor } from "~/sanity/lib/image";

export default function sanityImageLoader({ src, width, quality = 75 }: ImageLoaderProps) {
  return urlFor(src).auto("format").width(width).quality(quality).url();
}
