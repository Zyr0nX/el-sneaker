"use client";

import React, { useCallback } from "react";
import { FilterQueryResult } from "../../sanity.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/ui/accordion";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/ui/button";
import { Checkbox } from "~/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "~/ui/input";
import { Separator } from "~/ui/separator";
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group";
import { Label } from "~/ui/label";

const FormSchema = z.object({
  brands: z.array(z.string()),
  collections: z.array(z.string()),
  sizes: z.array(z.number()),
  minPrice: z.number().nullable(),
  maxPrice: z.number().nullable(),
});

export default function Filter({ filter }: { filter: FilterQueryResult }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brands: searchParams.get("brands")?.split(",") || [],
      collections: searchParams.get("collections")?.split(",") || [],
      sizes: searchParams.get("sizes")?.split(",")?.map((size) => Number(size)) || [],
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null,
    },
  });

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

  function generatePriceSegments(
    minPrice: number,
    maxPrice: number
  ): [number, number][] {
    const segments: [number, number][] = [];
    const step = 2000;

    let current = Math.floor(minPrice / step) * step;
    while (current < maxPrice) {
      let next = current + step;
      if (next >= maxPrice) {
        segments.push([current, Infinity]);
        break;
      }
      segments.push([current, next]);
      current = next;
    }

    return segments;
  }

  const segments = generatePriceSegments(
    filter.minPrice ?? 0,
    filter.maxPrice ?? 0
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1" asChild>
            <FormItem>
              <AccordionTrigger className="text-lg uppercase font-medium">
                Thương hiệu
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
                          <FormItem className="flex space-x-3 py-1 w-full text-sm">
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
                Nhóm hàng
              </AccordionTrigger>
              <AccordionContent>
                {filter.collections.map((collection) => (
                  <FormField
                    key={collection._id}
                    control={form.control}
                    name="collections"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex space-x-3 py-1 w-full text-sm">
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
                                        (value) => value !== collection.slug
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
                Kích thước
              </AccordionTrigger>
              <AccordionContent>
                {filter.sizes.map((size) => (
                  <FormField
                    key={size}
                    control={form.control}
                    name="sizes"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex space-x-3 py-1 w-full text-sm">
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
                Giá
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
                                  field.value?.toLocaleString("vi-VN") || ""
                                }
                                onChange={(event) => {
                                  const inputValue = event.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
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
                                  field.value?.toLocaleString("vi-VN") || ""
                                }
                                onChange={(event) => {
                                  const inputValue = event.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
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

                <RadioGroup>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Dưới 1.000.000 VNĐ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">1.000.000 - 3.000.000 VNĐ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Từ 3.000.000 VNĐ</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </FormItem>
          </AccordionItem>

          {/* <AccordionItem value="item-2">
            <AccordionTrigger>Nhom hang</AccordionTrigger>
            {data.collections
              .filter((collection) => collection !== null)
              .map((collection) => (
                <AccordionContent key={collection._id}>
                  {collection}
                </AccordionContent>
              ))}
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Kich thuoc</AccordionTrigger>
            {filterList.sizes
              .filter((size) => size !== null)
              .map((size) => (
                <AccordionContent key={size}>{size}</AccordionContent>
              ))}
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Gia</AccordionTrigger>
            <AccordionContent>
              <input
                type="range"
                min={filterList.minPrice}
                max={filterList.maxPrice}
              />
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
        <button type="submit">Filter</button>
      </form>
    </Form>
  );
}
