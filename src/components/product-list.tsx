import React from "react";
import ProductCard from "./product-card";

export default function ProductList({
  products,
}: {
  products: {
    _id: string;
    slug: string | null;
    name: string | null;
    price: number | null;
    brand: string | null;
    image: string | null;
  }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          slug={product.slug}
          brand={product.brand}
          image={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}
