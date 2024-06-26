"use server";

//import bcrypt from "bcryptjs";
import * as z from "zod";
import { update } from "@/auth";
import { db } from "@/lib/db";
import { SettingsSchema, productFormSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { DEFAULT_IMAGES, slugFromString } from "@/lib/utils";

/* interface Value {
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
type ProductFormValues = z.infer<typeof productFormSchema>;
export const createProducts = async (data: ProductFormValues) => {
  console.log("data from createCategory: ", data);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    // const productCr =
    for (let i = 1; i < 6; i++) {
      await db.product.create({
        data: {
          name: data.name,
          slug: slugFromString(data.name),
          number: data.number,
          price: data.price,
          categoryId: data.categoryId,
          description: data.description,
          userId: user.id,
          productProperties: {
            create: data.productProperties.map(
              (property: { propertyName: string; valueName: string }) => {
                return {
                  propertyName: property.propertyName,
                  propertySlug: slugFromString(property.propertyName),
                  valueName: property.valueName,
                  valueSlug: slugFromString(property.valueName),
                };
              }
            ),
          },
          images: {
            create:
              data.images.length > 0
                ? data.images.map((image: { url: string }) => image)
                : DEFAULT_IMAGES.map((image: { url: string }) => image),
          },
        },
        include: {
          productProperties: true,
          images: true,
        },
      });
    }

    //console.log("productCr from createProduct: ", productCr);

    /*   const categoryCr = await db.category.create({
    data: {
      name: category.name,
      slug: category.slug,
      userId: user.id,

      properties: {
        createMany: {
          data: [
            ...category.properties.map((property: Property) => {
              return {
                name: property.name,
                slug: property.slug,
                values: {
                  createMany: {
                    data: [
                      ...property.values.map((value: Value) => {
                        return { name: value.name, slug: value.slug };
                      }),
                    ],
                  },
                },
              };
            }), //it's just to fix Typescript error
          ],
        },
      },
    },
  }); */

    /*   const product = await prismadb.product.create({
    data: {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      colorId,
      sizeId,
      storeId: params.storeId,
      images: {
        createMany: {
          data: [
            ...images.map((image: { url: string }) => image), //it's just to fix Typescript error
          ],
        },
      },
    },
  });

  */
    //return { error: "Test err" };

    revalidatePath("/admin/products");
    //return { success: productCr.id };
    return { success: "productCr.id" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    return { error: "Some error" };
  }
};
