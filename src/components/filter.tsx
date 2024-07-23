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

const FormSchema = z.object({
  brands: z.array(z.string()),
  collections: z.array(z.string()),
  sizes: z.array(z.number()),
  minPrice: z.string(),
  maxPrice: z.string(),
});

export default function Filter({ data }: { data: FilterQueryResult }) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brands: [],
      collections: [],
      sizes: [],
      minPrice: "",
      maxPrice: "",
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    []
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const queryParts = [];
    let hasQuery = false;
    if (data.brands.length > 0) {
      hasQuery = true;
      queryParts.push(createQueryString("brands", data.brands.join(",")));
    }
    if (data.collections.length > 0) {
      queryParts.push(createQueryString("collections", data.collections.join(",")));
    }
    if (data.sizes.length > 0) {
      hasQuery = true;
      queryParts.push(createQueryString("sizes", data.sizes.join(",")));
    }
    if (data.minPrice) {
      hasQuery = true;
      queryParts.push(createQueryString("minPrice", data.minPrice));
    }
    if (data.maxPrice) {
      hasQuery = true;
      queryParts.push(createQueryString("maxPrice", data.maxPrice));
    }

    console.log(queryParts)

    if (!hasQuery) {
      router.replace(pathname);
      return;
    }

    router.replace(pathname + "?" + queryParts.join("&"));
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

  const segments = generatePriceSegments(data.minPrice ?? 0, data.maxPrice ?? 0)

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
                {data.brands
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
                {data.collections.map((collection) => (
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
                {data.sizes.map((size) => (
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
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex space-x-3 py-1 w-full text-sm">
                        <FormControl>
                          <div className="h-12 border-neutral-100">
                            <Input />
                            <Separator />
                            <p>đ</p>
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
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
