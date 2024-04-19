"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { DataCell } from "./data-cell";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  storeName: string;
  number: number;
  imagesNumber: number;
  createdAt: string;
  description: string;
  properties: { propertyName: string; valueName: string }[];
  userId: string;
};

/* const formattedProducts: ProductColumn[] = products.map((item) => ({
  id: item.id,
  name: item.name,
  number: item.number,
  price: formatter.format(item.price.toNumber()),
  category: item.category.name,
  properties: item.productProperties.map((pr) => {
    return {
      prName: pr.propertyName,
      prVal: pr.valueName,
    };
  }),
  createdAt: format(item.createdAt, "MMMM do, yyyy"),
})); */

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Creation date",
  },
  {
    accessorKey: "storeName",
    header: "Store",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "number",
    header: "In stock",
  },
  {
    header: "Images",
    accessorKey: "imagesNumber",
    //id: "imagesNumber",
    //cell: ({ row }) => <div>{row.original.imagesNumber}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    header: "Properties and their variants",
    id: "data",
    cell: ({ row }) => <DataCell data={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
