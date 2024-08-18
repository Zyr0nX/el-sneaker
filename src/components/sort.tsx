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
      <DropdownMenuContent
        asChild
        className="p-3 flex flex-col rounded-lg bg-white"
      >
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
          <DropdownMenuRadioItem asChild value="popular">
            <Button
              variant="text"
              className={cn(
                "justify-normal rounded-lg p-2 text-neutral-900",
                sort != "asc" && sort != "desc"
                  ? "bg-brand-500 text-neutral-50"
                  : "hover:bg-brand-50"
              )}
            >
              Phổ biến nhất
            </Button>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem asChild value="asc">
            <Button
              variant="text"
              className={cn(
                "justify-normal rounded-lg p-2 text-neutral-900",
                sort === "asc"
                  ? "bg-brand-500 text-neutral-50"
                  : "hover:bg-brand-50"
              )}
            >
              Giá thấp đến cao
            </Button>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem asChild value="desc">
            <Button
              variant="text"
              className={cn(
                "justify-normal rounded-lg p-2 text-neutral-900",
                sort === "desc"
                  ? "bg-brand-500 text-neutral-50"
                  : "hover:bg-brand-50"
              )}
            >
              Giá cao đến thấp
            </Button>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
