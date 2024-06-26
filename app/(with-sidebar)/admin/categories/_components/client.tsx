"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, CategoryColumn } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  //onClick={() => router.push(`/admin/categories/new`)}
  return (
    <>
      <div className="flex items-center justify-between mt-3 mb-2">
        <Heading
          title={`${data.length} Categories exist`}
          /* description="The list of all categories" */
          description=""
        />
        <Link href="/admin/categories/new">
          <MyButton>
            <Plus className="mr-2 h-4 w-4" /> New category
          </MyButton>
        </Link>
        {/*  <Button onClick={() => router.push(`/${params.storeId}/categorys/new`)}>
          Button sends to [categoryId] with categoryId==new
          <Plus className="mr-2 h-4 w-4" /> New category
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
