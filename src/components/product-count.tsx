import { groq } from 'next-sanity';
import React from 'react'
import { client } from '~/utils/sanity/client';
import { ProductCountQueryResult } from '../../sanity.types';

export default async function ProductCount({ brands, sizes, collections, from, to }: {
    brands?: string;
    sizes?: string;
    collections?: string;
    from?: string;
    to?: string;
}) {
    const productCountQuery = groq`count(*[_type == "sneaker" 
      && (!defined($brands) || brand->slug.current in $brands)
      && (!defined($collections) || collection->slug.current in $collections)
      && (!defined($sizes) || count((sizes[out_of_stock != true].size)[@ in $sizes]) > 0)
      && (!defined($from) || price >= $from)
      && (!defined($to) || price <= $to)
    ])`;

    const productCount = await client.fetch<ProductCountQueryResult>(productCountQuery, {
      brands: brands ? brands.split(",") : null,
      sizes: sizes
        ? sizes
            .split(",")
            .filter((item) => !isNaN(Number(item)))
            .map((item) => Number(item))
        : null,
      collections: collections
        ? collections.split(",")
        : null,
      from: from || null,
      to: to || null,
    });
    
  return <p className='font-semibold'>{productCount} sản phẩm</p>;
}
