import { format } from "date-fns";

import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./_components/client";
import { ProductColumn } from "./_components/columns";
import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";

const ProductsPage = async () => {
  const user = await currentUser();
  /*   if(!user?.id){return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
       
      </div>
    </div>
  );} */
  console.log("user from ProductsPage:", user);

  const products = await db.product.findMany({
    where:
      user?.role == "ADMIN" ? {} : { userId: user?.id || "GIVE NO PRODUCT" },
    include: {
      category: true,
      images: true,
      productProperties: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log("products from ProductsPage:", products);

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    userId: item.userId,
    number: item.number,
    storeName: item.user.storeName || item.user.email || "",
    imagesNumber: item.images.length,
    description: item.description,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    properties: item.productProperties.map((pr) => {
      return {
        propertyName: pr.propertyName,
        valueName: pr.valueName,
      };
    }),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  /*   const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    content: item.properties.map((pr) => {
      return {
        prName: pr.name,
        prVal: pr.values.map((val) => val.name).join(","),
      };
    }),
    userId: item.userId,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  })); */

  //lg:max-w-[1200px]
  return (
    <Card className=" w-full my-2  mx-auto  ">
      {/*  <CardHeader>
      <p className="text-2xl font-semibold text-center py-0">
        {`${categories?.length}`} Categories exist
      </p>
    </CardHeader> */}
      <CardContent>
        <ProductsClient data={formattedProducts} />
      </CardContent>
    </Card>
    /*  <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div> */
  );
};

export default ProductsPage;
