import { db } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CategoryForm2 } from "./components/category-form2";

const BillboardPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categorySlug,
    },
    include: {
      properties: { include: { values: true } },
    },
  });
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
  const catEx = typeof category;
  //console.log("catEx: ", catEx);

  //this route serves only for editing and creating of new ones
  return (
    <Card className=" w-full mx-auto max-w-[600px] md:w-[600px] ">
      <CardHeader>
        <p className="text-2xl font-semibold text-center py-0"> Category</p>
      </CardHeader>
      <CardContent>
        <CategoryForm2 initialData={category} />
      </CardContent>
    </Card>
    /* <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm2 initialData={category} />
      </div>
    </div> */
  );
};

export default BillboardPage;
