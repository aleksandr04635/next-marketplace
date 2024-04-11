"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import {
  Category,
  Image,
  Product,
  productProperty,
  Value,
  Property,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/app/(with-sidebar)/admin/products/[productId]/_components/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertModal } from "@/components/ui/alert-modal";
import PropertiesControl from "./properties-control";
import MyButton from "@/components/ui/my-button";
import { FormError } from "@/components/form-error";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/actions/product/updateProduct";
import { createProduct } from "@/actions/product/createProduct";
import { productFormSchema } from "@/schemas";
import { deleteProduct } from "@/actions/product/deleteProduct";
import { createProducts } from "@/actions/product/createProducts";

//{ propertyName: string; valueName: string }

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        productProperties: productProperty[];
        category: Category;
      })
    | null;
  categories: (Category & { properties: (Property & { values: Value[] })[] })[];
}
export interface CategoryWithProperties extends Category {
  properties: (Property & { values: Value[] })[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  console.log("initialData from ProductForm: ", initialData);
  //console.log("categories from ProductForm: ", categories);
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [multiple, setMultiple] = useState(false);
  // const [categoryH, setCategoryH] = useState(any);

  const title = initialData ? "Edit a product" : "Create a product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        name: "",
        description: "",
        images: [],
        productProperties: [],
        price: 0,
        number: 0,
        categoryId: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });
  //   console.log("form from ProductForm: ", form);
  const allVal = form.getValues();

  function productError() {
    /*  if (!categorySelected) {
      setError("You must select the category");
      return "You must select the category";
    } */
    if (
      categorySelected &&
      allVal.productProperties.length < categorySelected.properties.length
    ) {
      console.log(
        "categorySelected, allVal, from productError: ",
        categorySelected,
        allVal
      );
      setError("All the properties must have selected values");
      return "All the properties must have selected values";
    }
    setError(undefined);
    return null;
  }

  // const cat = form.watch("name");
  const watchAllFields = form.watch();
  useEffect(() => {
    //console.log("watchAllFields from ProductForm: ", watchAllFields);
    productError();
  }, [watchAllFields, initialData]);

  const categorySelectedId = form.watch("categoryId");
  useEffect(() => {
    /* console.log(
      "categorySelectedId, allVal from ProductForm: ",
      categorySelectedId,
      allVal
    ); */
    productError();
  }, [allVal, allVal.productProperties.length, categorySelectedId]);
  /*  if (categorySelected) {
    const category = categories.find((cat) => cat.id == categorySelected);
    console.log("category from ProductForm: ", category);
  } */
  const categorySelected: CategoryWithProperties | null | undefined =
    categorySelectedId
      ? categories.find((cat) => cat.id == categorySelectedId)
      : null;
  //console.log("categorySelected from ProductForm: ", categorySelected);

  useEffect(() => {
    /* console.log("cat from ProductForm: ", categorySelectedId);
    console.log(
      "initialData?..categoryId from ProductForm: ",
      initialData?.categoryId
    ); */
    if (categorySelectedId != initialData?.categoryId) {
      const categorySelected: CategoryWithProperties | null | undefined =
        categories.find((cat) => cat.id == categorySelectedId);

      //console.log("categorySelected from ProductForm: ", categorySelected);
      const temp = [];
      for (let i = 0; i < categorySelected?.properties?.length!; i++) {
        const obj = {
          propertyName: categorySelected?.properties[i].name!,
          valueName: categorySelected?.properties[i].values[0].name!,
        };
        //console.log("obj from ProductForm: ", obj);
        temp.push(obj);
      }
      //console.log("temp from ProductForm: ", temp);

      form.setValue("productProperties", temp);
    }
    /*   const categorySelected = categorySelectedId
      ? categories.find((cat) => cat.id == categorySelectedId)
      : null; */
    // setCategoryH(categorySelected);
  }, [categorySelectedId]);

  /*  const onSubmit = async (data: ProductFormValues) => {
    try {
      setError(undefined);
      console.log("Submitted data from ProductForm: ", data);
      const err = productError();
      if (err) {
        setError(err);
        toast.error(err);
        return;
      }

      setLoading(true);
       if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      } 
      //router.refresh();
      //router.push(`/admin/products`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }; */

  const onSubmit = async (data: ProductFormValues) => {
    console.log("data from onSubmit from ProductForm: ", data);
    const err = productError();
    if (err) {
      setError(err);
      return;
    }
    startTransition(() => {
      //const Func = initialData ? updateProduct : createProduct;
      //const Func = createProduct;
      //createCategory(category)
      initialData
        ? updateProduct({
            ...data,
            userId: initialData.userId,
            id: initialData.id,
          })
            .then((data) => {
              if (data.error) {
                setError(data.error);
              }
              if (data.success) {
                console.log("data.success: ", data.success);
                router.refresh();
                toast.success(
                  initialData ? "Product updated." : "Product created."
                );
                setError(undefined);
                //revalidatePath("/admin/categories/" + data.success);

                router.push("/admin/products");
              }
            })
            .catch(() => setError("Something went wrong!"))
        : !multiple
        ? createProduct(data)
            .then((data) => {
              if (data.error) {
                setError(data.error);
              }
              if (data.success) {
                console.log("data.success: ", data.success);
                router.refresh();
                toast.success(
                  initialData ? "Product updated." : "Product created."
                );
                setError(undefined);
                //revalidatePath("/admin/categories/" + data.success);

                router.push("/admin/products");
              }
            })
            .catch(() => setError("Something went wrong!"))
        : createProducts(data)
            .then((data) => {
              if (data.error) {
                setError(data.error);
              }
              if (data.success) {
                console.log("data.success: ", data.success);
                router.refresh();
                toast.success(
                  initialData ? "Product updated." : "Product created."
                );
                setError(undefined);
                //revalidatePath("/admin/categories/" + data.success);

                router.push("/admin/products");
              }
            })
            .catch(() => setError("Something went wrong!"));
    });
  };

  /*  const Send = () => {
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
           
            router.push("/admin/categories");
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  }; */

  /*   const onDelete = async () => {
    try {
      setLoading(true);
      //await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/admin/products`);
      toast.success("Product deleted.");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }; */

  const onDelete = () => {
    if (initialData && initialData.id) {
      setOpen(false);
      startTransition(() => {
        deleteProduct(initialData.id!)
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
              toast.success("Product deleted.");
              router.push("/admin/products");
            }
          })
          .catch(
            () => toast.error("Something went wrong!")
            //() => setError("Something went wrong!")
          );
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between pt-3">
        <Heading title={title} description={description} />
        {/*      {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )} */}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isPending}
                    moveLeft={(i) => {
                      const temp = field.value
                        .filter((current, j) => j !== i)
                        .toSpliced(i - 1, 0, field.value[i]);
                      //console.log("field.value[i]:", field.value[i]);
                      //console.log("fieldChanged:", temp);
                      field.onChange(temp);
                    }}
                    moveRight={(i) => {
                      field.onChange([
                        ...field.value
                          .filter((current, j) => j !== i)
                          .toSpliced(i + 1, 0, field.value[i]),
                      ]);
                    }}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Product name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {categorySelected && (
            <FormField
              control={form.control}
              name="productProperties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Properties</FormLabel>
                  <FormControl>
                    <PropertiesControl
                      value={field.value}
                      category={categorySelected}
                      disabled={isPending}
                      onChange={(val) => {
                        field.onChange(val);
                        console.log(
                          "onChage from PropertiesControl ,val: ",
                          val
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price in format 9.99</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number in stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Product description"
                    className=" min-h-[150px] h-fit" /* className="resize-none h-[150px]" */
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="group flex items-center w-fit ">
            <input
              type="checkbox"
              id="mul"
              onChange={() => setMultiple(!multiple)}
              checked={multiple}
              className="h-4 w-4 cursor-pointer rounded border-blue-500 dark:border-cyan-500 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="mul"
              className="ml-3 text-sm cursor-pointer dark:text-cyan-500 text-blue-500 group-hover:text-cyan-500 darl:group-hover:text-blue-500"
            >
              Create multiple
            </label>
          </div>
          {/*  {categorySelected && (
              <FormField
                control={form.control}
                name="productProperties"
                render={({ field }) => (
                  <FormItem>
                    {categorySelected.properties.map((prop, i) => (
                      <div key={i}>
                        <FormLabel>{prop.name}</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a value"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    ))}
                  </FormItem>
                )}
              /> */}

          {/* <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem> 
              )}
            />*/}
          {/* 
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button> */}
          <FormError message={error} />
          <div className="flex flex-row gap-2">
            <MyButton
              type="submit"
              disabled={isPending}
              //disabled={prohibitedToCreatePropertyFromString()}
              //onClick={Send}
            >
              {action}
            </MyButton>
            {initialData && (
              <MyButton
                type="button"
                className=" "
                style="danger"
                onClick={() => setOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </MyButton>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
