"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <div className="pt-4">
      <Heading title={`You have made ${data.length} orders`} description="" />
      {/* description="Manage orders for your store" */}
      <DataTable searchKey="products" columns={columns} data={data} />
    </div>
  );
};
