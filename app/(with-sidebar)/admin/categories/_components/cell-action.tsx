"use client";

//import axios from "axios";
import { useState, useTransition } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/ui/alert-modal";

import { CategoryColumn } from "./columns";
import MyButton from "@/components/ui/my-button";
import { deleteCategory } from "@/actions/category/deleteCategory";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  //const [loading, setLoading] = useState(false);

  const onConfirm = () => {
    setOpen(false);
    startTransition(() => {
      deleteCategory(data.id)
        .then((data) => {
          if (data.error) {
            toast.error(
              //"err " //
              data.error
              //"Make sure you removed all products using this category first."
            );
          }
          if (data.success) {
            router.refresh();
            toast.success("Category deleted.");
          }
        })
        .catch(
          () => toast.error("Something went wrong!")
          //() => setError("Something went wrong!")
        );
    });
  };

  /* const onConfirm = async () => {
    try {
      setLoading(true);
      //await axios.delete(`/api/${params.storeId}/categorys/${data.id}`);
      toast.success("Category deleted.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to clipboard.");
  }; */

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      {user && (data.userId == user.id || user.role == "ADMIN") ? (
        <div className="flex flex-col lg:flex-row gap-2 justify-center">
          <Link href={`/admin/categories/${data.id}`}>
            <MyButton
              className=" "
              /* onClick={() => router.push(`/admin/categories/${data.id}`)} */
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
            </MyButton>
          </Link>
          <MyButton className=" " style="danger" onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </MyButton>
        </div>
      ) : (
        <div></div>
      )}

      {/*   <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>           
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/categories/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </>
  );
};
