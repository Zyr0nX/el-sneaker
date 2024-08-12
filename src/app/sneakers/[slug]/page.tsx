import ProductDetail from "~/components/product-detail";

export default function PostIndex({ params }: { params: { slug: string } }) {
    return (
      <>
        <ProductDetail sneakerSlug={params.slug} />
      </>
    );
}
