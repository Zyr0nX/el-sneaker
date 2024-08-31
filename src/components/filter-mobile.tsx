"use client";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "~/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "~/ui/sheet";
import { FilterQueryResult, FilterLabelQueryResult } from "../../sanity.types";
import Filter from "./filter";

export default function FilterMobile({
  filter,
  filterLabel,
}: {
  filter: FilterQueryResult;
  filterLabel: FilterLabelQueryResult;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-brand-500">
          <MixerHorizontalIcon />
        </Button>
      </SheetTrigger>
      <SheetContent forceMount>
        <Filter filter={filter} filterLabel={filterLabel} onFormSubmit={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
