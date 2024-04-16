import { Metadata } from "next";
import { db } from "@/lib/db";
import ProductComponent from "./_components/product-component";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await db.product.findFirst({
    where: {
      id: params.productId || "",
    },
  });
  //console.log("category from CategoryPage: ", category);
  const str = product?.name || "";
  return {
    title: `${str} | My Marketplace`,
    description: "A marketplace created with Next.js 14 and Prisma",
  };
}

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await db.product.findFirst({
    where: { id: params.productId },
    include: {
      category: true,
      images: true,
      productProperties: true,
    },
  });

  if (!product) {
    return null;
  }

  return <ProductComponent data={product} />;
};

export default ProductPage;
