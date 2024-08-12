"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu";
import { cn } from "~/utils/shadcn";

export function Sort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "popular";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-neutral-100 rounded-lg px-4 py-2 outline-none">
        <p className="text-sm">Sắp xếp theo</p>
        <div className="flex gap-1 text-brand-500 items-center">
          <p className="font-semibold">
            {sort == "asc"
              ? "Giá thấp đến cao"
              : sort == "desc"
                ? "Giá cao đến thấp"
                : "Phổ biến nhất"}
          </p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-3 flex flex-col rounded-lg bg-white">
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
          <DropdownMenuRadioItem
            value="popular"
            className={cn(
              "rounded-lg hover:bg-brand-50 p-2 outline-none",
              sort != "asc" && sort != "desc" && "bg-brand-200"
            )}
          >
            <p>Phổ biến nhất</p>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="asc"
            className={cn(
              "rounded-lg hover:bg-brand-50 p-2 outline-none",
              sort == "asc" && "bg-brand-200"
            )}
          >
            <span>Giá thấp đến cao</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="desc"
            className={cn(
              "rounded-lg hover:bg-brand-50 p-2 outline-none",
              sort == "desc" && "bg-brand-200"
            )}
          >
            <span>Giá cao đến thấp</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
