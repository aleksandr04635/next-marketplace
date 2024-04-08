"use server";

//import * as z from "zod";
//import bcrypt from "bcryptjs";

import { update } from "@/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { revalidatePath, revalidateTag } from "next/cache";

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
export const updateCategory = async (category: Category) => {
  //console.log("category entered into from updateCategory: ", category);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }
    if (category.userId != user.id && user.role != "ADMIN") {
      return { error: "You are not the creator of the category" };
    }
    await db.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name,
        slug: category.slug,
        properties: {
          deleteMany: {},
        },
      },
    });

    const categoryCr = await db.category.update({
      where: {
        id: category.id,
      },
      data: {
        properties: {
          create: category.properties.map((property: Property) => {
            return {
              name: property.name,
              slug: property.slug,
              values: {
                create: property.values.map((value: Value) => {
                  return { name: value.name, slug: value.slug };
                }),
              },
            };
          }),
        },
      },
      include: {
        properties: { include: { values: true } },
      },
    });
    console.log("category exiting from updateCategory:: ", categoryCr);
    /*   const categoryCr = await db.category.create({
    data: {
      name: category.name,
      slug: category.slug,
      userId: user.id,
      properties: {
        create: category.properties.map((property: Property) => {
          return {
            name: property.name,
            slug: property.slug,
            values: {
              create: property.values.map((value: Value) => {
                return { name: value.name, slug: value.slug };
              }),
            },
          };
        }),
      },
    },
    include: {
      properties: { include: { values: true } },
    },
  }); 
  */
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
    revalidatePath("/admin/category/" + category.id!); //IT SOLVED THE PROBLEM
    /* revalidatePath(category.id!);
    import { revalidatePath } from "next/cache";
    revalidateTag(category.id!);
    revalidateTag("/admin/category"); */
    //return { error: "Test err" };
    //return { success: "Category updated" };
    return { success: categoryCr.id };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    return { error: "Some error" };
  }
};
