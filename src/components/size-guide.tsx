import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";
import { Button } from "~/ui/button";
import Tape from "~/icons/tape";
import { Image } from "~/utils/sanity/image";

export function SizeGuide({
  label,
  image,
}: {
  label: string | null;
  image:
    | {
        key: string;
        ref: string | null;
      }[]
    | null;
}) {
  if (!image || image.length === 0) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="text">
          <Tape />
          <p className="text-neutral-900 underline font-semibold text-sm md:text-base">
            {label}
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <div className="px-8 py-6 flex flex-col gap-4">
          {image.map(({ key, ref }) => (
            <Image key={key} id={ref} alt="" className="w-full" />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
