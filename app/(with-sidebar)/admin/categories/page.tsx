import { format } from "date-fns";

import { db } from "@/lib/db";
import { CategoryForm2 } from "./[categorySlug]/components/category-form2";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CategoryColumn } from "./components/columns";
import { CategoryClient } from "./components/client";

const CategoryPage = async () => {
  const categories = await db.category.findMany({
    include: {
      properties: { include: { values: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //console.log("categories from CategoryPage: ", categories);

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <Card className=" w-full mx-auto max-w-[600px] md:w-[600px] ">
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
