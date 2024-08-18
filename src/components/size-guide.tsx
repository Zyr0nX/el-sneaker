import React from "react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/ui/dialog";
import { Button } from "~/ui/button";
import Tape from "~/icons/tape";
import { Image } from "~/utils/sanity/image";

export function SizeGuide({ label, image }: { label: string | null; image: string | null }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="text">
          <Tape />
          <p className="text-neutral-900 underline font-semibold">{label}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <div className="px-8 py-6">
          <Image id={image} alt="" className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}