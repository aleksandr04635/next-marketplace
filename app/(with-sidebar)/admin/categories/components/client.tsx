"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, CategoryColumn } from "./columns";
import MyButton from "@/components/my-button";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between my-2">
        <Heading
          title={`${data.length} Categories exist`}
          /* description="The list of all categories" */
          description=""
        />
        <MyButton onClick={() => router.push(`/admin/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> New category
        </MyButton>
        {/*  <Button onClick={() => router.push(`/${params.storeId}/categorys/new`)}>
          Button sends to [categoryId] with categoryId==new
          <Plus className="mr-2 h-4 w-4" /> New category
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};
