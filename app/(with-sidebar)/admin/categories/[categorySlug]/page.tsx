import { db } from "@/lib/db";

import { CategoryForm } from "./components/category-form";

const BillboardPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categorySlug,
    },
  });

  //this route serves only for editing and creating of new ones
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default BillboardPage;
