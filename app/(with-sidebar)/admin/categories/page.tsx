import { format } from "date-fns";

import { db } from "@/lib/db";
import { CategoryForm } from "./[categoryId]/_components/category-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CategoryColumn } from "./_components/columns";
import { CategoryClient } from "./_components/client";

export const revalidate = 0;
const CategoryPage = async () => {
  const categories = await db.category.findMany({
    include: {
      properties: { include: { values: true } },
      products: true,
    },
    orderBy: {
      products: { _count: "desc" },
      // createdAt: "desc",
    },
  });
  console.log("categories from CategoryPage: ", categories);

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    productsLength: item.products.length,
    content: item.properties.map((pr) => {
      return {
        prName: pr.name,
        prVal: pr.values.map((val) => val.name).join(","),
      };
    }),
    userId: item.userId,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  // max-w-[600px]
  return (
    <Card className=" w-full mx-auto lg:max-w-[900px] ">
      {/*  <CardHeader>
        <p className="text-2xl font-semibold text-center py-0">
          {`${categories?.length}`} Categories exist
        </p>
      </CardHeader> */}
      <CardContent>
        <CategoryClient data={formattedCategories} />
      </CardContent>
    </Card>
    /*  <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div> */
  );
};

export default CategoryPage;
