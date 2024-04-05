"use client";

import * as z from "zod";
//import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

import { useParams, useRouter, usePathname } from "next/navigation";
//import { useParams } from "next/navigation";
import { TiMinus } from "react-icons/ti";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import MyButton from "@/components/my-button";
import { createCategory } from "@/actions/createCategory";
import { FormError } from "@/components/form-error";
import { Category as CategoryDB } from "@prisma/client";
import { updateCategory } from "@/actions/updateCategory";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/ui/alert-modal";
import { deleteCategory } from "@/actions/deleteCategory";
//import { useRouter } from "next/router";
//import { Category } from "@prisma/client";

/* const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Category | null;
} */
/*interface Value {
  name: string;
  slug: string;
}
interface Property {
  name: string;
  slug: string;
  values: Value[];
}
 interface Category {
  name: string;
  slug: string;
  properties: Property[];
} */
/* interface Category extends CategoryDB {
  properties: Property[];
} */
interface Value {
  id?: string;
  propertyId?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface Property {
  id?: string;
  categoryId?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  values: Value[];
}
interface Category {
  id?: string;
  userId?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  properties: Property[];
}
/* type Category = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  properties: {
    values: {
      id: string;
      propertyId: string;
      name: string;
      slug: string;
      createdAt: Date;
      updatedAt: Date;
    }[];

    id: string;
    categoryId: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}; */
interface CategoryFormProps {
  initialData: Category | null;
  slugArr: string[];
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const CategoryForm: React.FC<CategoryFormProps> = ({
  //export const CategoryForm2 = ({
  initialData,
  slugArr,
}: {
  initialData: Category | null;
  slugArr: string[];
}) => {
  /* export const CategoryForm2 = ({}) => { */
  //console.log("initialData: ", initialData);
  //console.log("slugArr: ", slugArr);

  const params = useParams();
  //params.categoryId
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category>({
    //const [category, setCategory] = useState({
    name: "",
    slug: "",
    properties: [],
  });
  //console.log("category: ", category);
  useEffect(() => {
    if (initialData) {
      console.log("setCategory from initialData");
      setCategory(initialData);
    }
  }, []);
  useEffect(() => {
    setError(undefined);
  }, [category]);

  const [property, setProperty] = useState("");
  //console.log("property: ", property);
  const inArr = [];
  for (let n = 0; n < 20; n++) {
    inArr.push({ name: "", slug: "" });
  }
  //console.log("inArr: ", inArr);
  const [newValues, setNewValues] = useState<Value[]>(inArr);
  //const [newValues, setNewValues] = useState(inArr);
  //console.log("newValues: ", newValues);

  /*  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard." : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }; */
  function slugFromString(str: string) {
    return str
      .replace(/[^a-z\-A-Z0-9-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .join("-")
      .toLowerCase();
  }

  function prohibitedToCreatePropertyFromString() {
    return (
      category.properties
        .map((p) => p.slug)
        .indexOf(slugFromString(property)) !== -1 ||
      slugFromString(property).length < 3
    );
  }

  function prohibitedToCreateValueFromString(i: number) {
    return (
      category.properties[i].values
        .map((v) => v.slug)
        .indexOf(newValues[i].slug) !== -1 || newValues[i].slug.length < 3
    );
  }

  function categoryError() {
    if (category.properties.length < 1) {
      return "Category must have at least one property";
    }
    for (let pr of category.properties) {
      if (pr.values.length < 2) {
        return "All properties must have at least 2 value options";
      }
    }
    if (slugArr.indexOf(category.slug) != -1) {
      return "Category with this name already exists";
    }
    return null;
  }

  const path = usePathname();
  const Send = () => {
    const err = categoryError();
    if (err) {
      setError(err);
      return;
    }
    startTransition(() => {
      const Func = initialData ? updateCategory : createCategory;
      //createCategory(category)
      Func(category)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            console.log("data.success: ", data.success);
            //router.refresh();
            router.replace(path); //NOT WORK

            toast.success(
              initialData ? "Category updated." : "Category created."
            );
            setError(undefined);
            //revalidatePath("/admin/categories/" + data.success);
            /*   try {
              revalidatePath("/admin/category");
            } catch (error) {
              console.error("error: ", error);
            } */
            router.push("/admin/categories");
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const onConfirm = () => {
    if (initialData && initialData.id) {
      setOpen(false);
      startTransition(() => {
        deleteCategory(initialData.id!)
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
              router.push("/admin/categories");
            }
          })
          .catch(
            () => toast.error("Something went wrong!")
            //() => setError("Something went wrong!")
          );
      });
    }
  };

  if (!category) return <div></div>;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <div className="space-y-2 flex  flex-col">
        <Label htmlFor="name">Category name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Category name"
          value={category?.name || ""}
          onChange={(e) =>
            setCategory({
              ...category,
              name: e.target.value,
              slug: slugFromString(e.target.value),
            })
          }
        />
        <div className="mt-1 flex  flex-col">
          <p className="text-base">Properties of the category:</p>
          {category.properties.map((p, i) => (
            <div key={i}>
              <div
                onClick={() => {
                  const filtered = category.properties.filter((e, n) => n != i);
                  console.log("category.properties.filter: ", filtered);
                  setCategory({
                    ...category,
                    properties: filtered,
                  });
                }}
                /* onClick={() => setTags(tags.filter((e, n) => n != i))} */

                className="mr-4 flex w-full cursor-pointer items-center justify-start space-x-2 rounded-lg bg-active-bg 
                  px-2 py-1 dark:bg-dark-active-bg dark:text-white "
              >
                <p className="rounded-full bg-main-border p-1  text-sm text-white">
                  <TiMinus />
                </p>
                <p>{p.name}</p>
              </div>
              <div className="pl-10 flex flex-col gap-2 mb-2">
                <p className="text-base">Value options of the property:</p>
                {category.properties[i].values.map((v, j) => (
                  <div
                    key={j}
                    onClick={() => {
                      const filteredV = category.properties[i].values.filter(
                        (e, n) => n != j
                      ) as Value[];
                      console.log(
                        "category.properties[i].values.filter: ",
                        filteredV
                      );
                      const newPr = category.properties.map((pr, n) =>
                        n == i ? { ...pr, values: filteredV } : pr
                      );
                      setCategory({
                        ...category,
                        properties: newPr,
                      });
                    }}
                    /* onClick={() => setTags(tags.filter((e, n) => n != i))} */

                    className="mr-4 flex w-full cursor-pointer items-center justify-start space-x-2 rounded-lg bg-active-bg 
                  px-2 py-1 dark:bg-dark-active-bg dark:text-white "
                  >
                    <p className="rounded-full bg-main-border p-1  text-sm text-white">
                      <TiMinus />
                    </p>
                    <p>{v.name}</p>
                  </div>
                ))}
                <Label htmlFor="property">New property value option name</Label>
                <Input
                  type="text"
                  id={"value" + i}
                  placeholder="New value option name"
                  value={newValues[i]?.name || ""}
                  onChange={(e) => {
                    const newV = newValues.map((v, n) =>
                      n == i
                        ? {
                            name: e.target.value,
                            slug: slugFromString(e.target.value),
                          }
                        : v
                    );
                    console.log("newV: ", newV);
                    setNewValues(newV);
                  }}
                />
                <MyButton
                  type="button"
                  disabled={prohibitedToCreateValueFromString(i)}
                  onClick={() => {
                    const newValAr1 = category.properties[i].values.concat({
                      name: newValues[i]?.name,
                      slug: newValues[i]?.slug,
                    });
                    const newPr = category.properties.map((pr, n) =>
                      n == i ? { ...pr, values: newValAr1 } : pr
                    );
                    setCategory({
                      ...category,
                      properties: newPr,
                    });

                    const newValAr = newValues.map((v, n) =>
                      n == i
                        ? {
                            name: "",
                            slug: "",
                          }
                        : v
                    );
                    setNewValues(newValAr);
                  }}
                >
                  Add a property value option
                </MyButton>
              </div>
            </div>
          ))}
        </div>
        <Label htmlFor="property">New property name</Label>
        <Input
          type="text"
          id="property"
          placeholder="New property name"
          value={property || ""}
          onChange={(e) => setProperty(e.target.value)}
        />
        <MyButton
          type="button"
          disabled={prohibitedToCreatePropertyFromString()}
          onClick={() => {
            setCategory({
              ...category,
              properties: [
                ...category.properties,
                { name: property, slug: slugFromString(property), values: [] },
                /*  { name: property, slug: slugFromString(property) }, */
              ],
            });
            setProperty("");
          }}
        >
          Add a property
        </MyButton>
        <FormError message={error} />
        <div className="flex flex-row gap-2">
          <MyButton
            type="button"
            //disabled={prohibitedToCreatePropertyFromString()}
            onClick={Send}
          >
            {initialData ? "Update a category" : "Create a category"}
          </MyButton>
          {initialData && (
            <MyButton
              className=" "
              style="danger"
              onClick={() => setOpen(true)}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </MyButton>
          )}
        </div>
        {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button 
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form> */}
      </div>
    </>
  );
};
