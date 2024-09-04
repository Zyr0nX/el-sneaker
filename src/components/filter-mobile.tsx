"use client";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { Button } from "~/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { FilterQueryResult, FilterLabelQueryResult } from "../../sanity.types";
import Filter from "./filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormItem, FormControl, FormLabel, Form, FormField } from "~/ui/form";
import { Checkbox } from "~/ui/checkbox";
import { Input } from "~/ui/input";
import { Separator } from "~/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/ui/accordion";
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "~/ui/scroll-area";

const FormSchema = z.object({
  brands: z.array(z.string()),
  collections: z.array(z.string()),
  sizes: z.array(z.number()),
  minPrice: z.number().nullable(),
  maxPrice: z.number().nullable(),
});

export default function FilterMobile({
  filter,
  filterLabel,
}: {
  filter: FilterQueryResult;
  filterLabel: FilterLabelQueryResult;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brands: searchParams.get("brands")?.split(",") || [],
      collections: searchParams.get("collections")?.split(",") || [],
      sizes:
        searchParams
          .get("sizes")
          ?.split(",")
          ?.map((size) => Number(size)) || [],
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : null,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : null,
    },
  });

  const [radioValue, setRadioValue] = React.useState<string>();

  const minPrice = form.watch("minPrice");
  const maxPrice = form.watch("maxPrice");

  useEffect(() => {
    if (maxPrice === 1000000 && !minPrice) {
      setRadioValue("below-1000000");
    } else if (minPrice === 1000000 && maxPrice === 3000000) {
      setRadioValue("1000000-3000000");
    } else if (minPrice === 3000000 && !maxPrice) {
      setRadioValue("above-3000000");
    } else {
      setRadioValue("");
    }
  }, [minPrice, maxPrice]);

  function createQueryString(
    params: URLSearchParams,
    name: string,
    value: string | null
  ) {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Here");
    const params = new URLSearchParams(searchParams.toString());

    if (data.brands.length > 0) {
      createQueryString(params, "brands", data.brands.join(","));
    } else {
      params.delete("brands");
    }

    if (data.collections.length > 0) {
      createQueryString(params, "collections", data.collections.join(","));
    } else {
      params.delete("collections");
    }

    if (data.sizes.length > 0) {
      createQueryString(params, "sizes", data.sizes.join(","));
    } else {
      params.delete("sizes");
    }

    if (data.minPrice !== null) {
      createQueryString(params, "minPrice", data.minPrice.toString());
    } else {
      params.delete("minPrice");
    }

    if (data.maxPrice !== null) {
      createQueryString(params, "maxPrice", data.maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    if (params.toString()) {
      router.replace(pathname + "?" + params.toString());
    } else {
      router.replace(pathname);
    }
  }
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-brand-500">
          <MixerHorizontalIcon />
        </Button>
      </SheetTrigger>
      <SheetContent forceMount className="max-h-screen">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              form.handleSubmit(onSubmit)(e);
              setOpen(false);
            }}
            className="flex flex-col gap-8"
          >
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1" asChild>
                  <FormItem>
                    <AccordionTrigger className="text-lg uppercase font-medium">
                      {filterLabel?.brandLabel || ""}
                    </AccordionTrigger>
                    <AccordionContent>
                      {filter.brands
                        .filter((brand) => brand.slug !== null)
                        .map((brand) => (
                          <FormField
                            key={brand._id}
                            control={form.control}
                            name="brands"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex gap-3 py-1.5 w-full text-sm">
                                  <FormControl>
                                    <Checkbox
                                      checked={
                                        brand.slug
                                          ? field.value.includes(brand.slug)
                                          : false
                                      }
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              brand.slug,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== brand.slug
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {brand.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                    </AccordionContent>
                  </FormItem>
                </AccordionItem>
                <AccordionItem value="item-2" asChild>
                  <FormItem>
                    <AccordionTrigger className="text-lg uppercase font-medium">
                      {filterLabel?.collectionLabel || ""}
                    </AccordionTrigger>
                    <AccordionContent>
                      {filter.collections.map((collection) => (
                        <FormField
                          key={collection._id}
                          control={form.control}
                          name="collections"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex gap-3 py-1.5 w-full text-sm">
                                <FormControl>
                                  <Checkbox
                                    checked={
                                      collection.slug
                                        ? field.value.includes(collection.slug)
                                        : false
                                    }
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            collection.slug,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== collection.slug
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {collection.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </AccordionContent>
                  </FormItem>
                </AccordionItem>
                <AccordionItem value="item-3" asChild>
                  <FormItem>
                    <AccordionTrigger className="text-lg uppercase font-medium">
                      {filterLabel?.sizeLabel || ""}
                    </AccordionTrigger>
                    <AccordionContent>
                      {filter.sizes.map((size) => (
                        <FormField
                          key={size}
                          control={form.control}
                          name="sizes"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex gap-3 py-1.5 w-full text-sm">
                                <FormControl>
                                  <Checkbox
                                    checked={
                                      size ? field.value.includes(size) : false
                                    }
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, size])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== size
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {size}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </AccordionContent>
                  </FormItem>
                </AccordionItem>
                <AccordionItem value="item-4" asChild>
                  <FormItem>
                    <AccordionTrigger className="text-lg uppercase font-medium">
                      {filterLabel?.priceLabel || ""}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <FormField
                          control={form.control}
                          name="minPrice"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <div className="h-12 border-neutral-100 flex border rounded-lg items-center gap-2 overflow-hidden px-3">
                                    <Input
                                      className="h-full"
                                      placeholder="Từ"
                                      value={
                                        field.value?.toLocaleString("vi-VN") ||
                                        ""
                                      }
                                      onChange={(event) => {
                                        const inputValue =
                                          event.target.value.replace(/\D/g, "");
                                        const numericValue = inputValue
                                          ? Number(inputValue)
                                          : null;

                                        field.onChange(numericValue);
                                      }}
                                      onKeyDown={(event) => {
                                        const allowedKeys = [
                                          "Backspace",
                                          "ArrowLeft",
                                          "ArrowRight",
                                          "Tab",
                                          "Delete",
                                        ];
                                        if (allowedKeys.includes(event.key)) {
                                          return;
                                        }

                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                      onBlur={() => {
                                        const maxPrice =
                                          form.getValues("maxPrice");
                                        if (
                                          maxPrice &&
                                          field.value &&
                                          field.value > maxPrice
                                        ) {
                                          field.onChange(maxPrice);
                                        }
                                      }}
                                    />
                                    <Separator
                                      orientation="vertical"
                                      className="h-5"
                                    />
                                    <p>đ</p>
                                  </div>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="maxPrice"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <div className="h-12 border-neutral-100 flex border rounded-lg items-center gap-2 overflow-hidden px-3">
                                    <Input
                                      className="h-full"
                                      placeholder="Đến"
                                      value={
                                        field.value?.toLocaleString("vi-VN") ||
                                        ""
                                      }
                                      onChange={(event) => {
                                        const inputValue =
                                          event.target.value.replace(/\D/g, "");
                                        const numericValue = inputValue
                                          ? Number(inputValue)
                                          : null;

                                        field.onChange(numericValue);
                                      }}
                                      onKeyDown={(event) => {
                                        const allowedKeys = [
                                          "Backspace",
                                          "ArrowLeft",
                                          "ArrowRight",
                                          "Tab",
                                          "Delete",
                                        ];
                                        if (allowedKeys.includes(event.key)) {
                                          return;
                                        }

                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                      }}
                                      onBlur={() => {
                                        const minPrice =
                                          form.getValues("minPrice");
                                        if (
                                          minPrice &&
                                          field.value &&
                                          field.value < minPrice
                                        ) {
                                          field.onChange(minPrice);
                                        }
                                      }}
                                    />
                                    <Separator
                                      orientation="vertical"
                                      className="h-5"
                                    />
                                    <p>đ</p>
                                  </div>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      <RadioGroup
                        className="flex flex-col gap-4"
                        value={radioValue}
                        onValueChange={(value) => {
                          setRadioValue(value);
                          if (value === "below-1000000") {
                            form.resetField("minPrice");
                            form.setValue("maxPrice", 1000000);
                          }

                          if (value === "1000000-3000000") {
                            form.setValue("minPrice", 1000000);
                            form.setValue("maxPrice", 3000000);
                          }

                          if (value === "above-3000000") {
                            form.setValue("minPrice", 3000000);
                            form.resetField("maxPrice");
                          }
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="below-1000000" id="r1" />
                          <Label htmlFor="r1">Dưới 1.000.000 VNĐ</Label>
                        </div>
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="1000000-3000000" id="r2" />
                          <Label htmlFor="r2">1.000.000 - 3.000.000 VNĐ</Label>
                        </div>
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="above-3000000" id="r3" />
                          <Label htmlFor="r3">Từ 3.000.000 VNĐ</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </FormItem>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
            <div className="flex gap-3 absolute bottom-4 w-[calc(100%-3rem)]">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="basis-full"
                onClick={() =>
                  form.reset({
                    brands: [],
                    sizes: [],
                    collections: [],
                    minPrice: null,
                    maxPrice: null,
                  })
                }
              >
                {filterLabel?.resetLabel}
              </Button>
              <Button type="submit" size="sm" className="basis-full">
                {filterLabel?.applyLabel}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
