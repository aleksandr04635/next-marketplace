"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ProductColumn, columns } from "./columns";
import MyButton from "@/components/ui/my-button";
import Link from "next/link";

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  //onClick={() => router.push(`/admin/categories/new`)}
  return (
    <>
      <div className="flex items-center justify-between mt-3 mb-2">
        <Heading
          title={`You have ${data.length} products`}
          description="Manage products for your store"
        />
        {/* <Button onClick={() => router.push(`/admin/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> New product
        </Button> */}
        <Link href="/admin/products/new">
          <MyButton>
            <Plus className="mr-2 h-4 w-4" /> New product
          </MyButton>
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
