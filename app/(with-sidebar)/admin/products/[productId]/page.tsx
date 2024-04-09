import { db } from "@/lib/db";

import { ProductForm } from "./_components/product-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      productProperties: true,
      category: {
        include: {
          properties: { include: { values: true } },
        },
      },
    },
  });
  console.log("product from ProductPage: ", product);

  const categories = await db.category.findMany({
    include: {
      properties: { include: { values: true } },
    },
  });

  //md:w-[900px]
  return (
    <Card className=" w-full mx-auto max-w-[800px]  ">
      {/* <CardHeader>
        <p className="text-2xl font-semibold text-center py-0"> Category</p>
      </CardHeader> */}
      <CardContent>
        <ProductForm initialData={product} categories={categories} />
      </CardContent>
    </Card>
    /*  <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} categories={categories} />
      </div>
    </div> */
  );
};

export default ProductPage;
