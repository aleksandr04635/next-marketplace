"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { DataCell } from "./data-cell";

export type CategoryColumn = {
  id: string;
  name: string;
  productsLength: number;
  content: { prName: string; prVal: string }[];
  userId: string;
  createdAt: string;
};

/* content
content: item.properties.map((pr) => {
  prName: pr.name;
  prVal: pr.values.map((val) => val.name).join(",");
}), */
export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Creation date",
  },
  {
    accessorKey: "productsLength",
    header: "Products",
  },
  {
    header: "Properties and their variants",
    id: "data",
    cell: ({ row }) => <DataCell data={row.original} />,
  },
  {
    //header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
