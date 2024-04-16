"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  buyerEmail: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Creation date",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "buyerEmail",
    header: "Buyers email",
  },
  {
    accessorKey: "phone",
    header: "Buyers phone",
  },
  {
    accessorKey: "address",
    header: "Buyers address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
