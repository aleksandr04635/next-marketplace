import { db } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CategoryForm } from "./_components/category-form";
import { cache } from "@/lib/cache";

export const revalidate = 0; //prevents from caching REQUESTS
export const dynamic = "force-dynamic";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      properties: { include: { values: true } },
    },
  });
  const categories = await db.category.findMany({});
  //console.log("category from CategoryPage: ", category);
  const slugArr = categories.map((cat) =>
    cat.id != params.categoryId ? cat.slug : ""
  );
  //console.log("slugArr: ", slugArr);
  //console.log("category: ", category);
  /* const category2 = cache(
    () => {
      return db.category.findUnique({
        where: {
          id: params.categoryId,
        },
        include: {
          properties: { include: { values: true } },
        },
      });
    },
    ["/admin/category", params.categoryId], //this array is just used as a unique identifier for a cache entity. It's constructed from a route and chached function name
    { revalidate: 100 } //revalidate what is the most popular once a day  60 * 60 * 24
  );
  const category3 = await category2();
  console.log("category3: ", category3); */
  /*   type catExt=
   category: ({
     id: string;
    userId: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    properties: ({
        values: {
            id: string;
            propertyId: string;
            name: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        categoryId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    })[];
  }) */
  //const catEx = typeof category;
  //console.log("catEx: ", catEx);

  //this route serves only for editing and creating of new ones
  return (
    <Card className=" w-full my-2 mx-auto max-w-[600px] md:w-[600px] ">
      <CardHeader>
        <p className="text-2xl font-semibold text-center py-0"> Category</p>
      </CardHeader>
      <CardContent>
        <CategoryForm initialData={category} slugArr={slugArr} />
      </CardContent>
    </Card>
    /* <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm2 initialData={category} />
      </div>
    </div> */
  );
};

export default CategoryPage;
