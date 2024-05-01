"use client";

//import axios from "axios";
import { useState, useTransition } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { CategoryColumn } from "./columns";
import MyButton from "@/components/ui/my-button";
import { deleteCategory } from "@/actions/category/deleteCategory";
import Link from "next/link";

interface DataCellProps {
  data: CategoryColumn;
}

export const DataCell: React.FC<DataCellProps> = ({ data }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  //const [loading, setLoading] = useState(false);
  //console.log("data: ", data);

  return (
    <>
      {data.content.map((pr, j) => (
        <div
          key={j}
          className="mr-4 flex flex-col sm:flex-row w-full  sm:items-center justify-start space-x-2 rounded-lg 
        px-2 py-1 dark:bg-inherit  border border-main-border dark:text-white "
        >
          {/* bg-active-bg  dark:bg-dark-active-bg */}
          <div>
            {pr.prName}
            {": "}
          </div>
          <div>{pr.prVal}</div>
        </div>
      ))}
    </>
  );
};
