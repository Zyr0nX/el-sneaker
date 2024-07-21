import ProductDetail from "~/components/product-detail";

export default function PostIndex({ params }: { params: { slug: string } }) {
  console.log(params.slug)
  
    return (
      <>
        <ProductDetail sneakerSlug={params.slug} />
      </>
    );
}
