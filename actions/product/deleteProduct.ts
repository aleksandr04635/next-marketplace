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
import { admin } from "../auth/admin";
import { revalidatePath } from "next/cache";

interface Value {
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
}
export const deleteProduct = async (id: string) => {
  try {
    console.log("id from deleteProduct: ", id);
    const user = await currentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    const dbUser = await getUserById(user.id);
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    const product = await db.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) {
      return { error: "No such product" };
    }
    if (product.userId != user.id && user.role != "ADMIN") {
      return { error: "You are not the creator of the product" };
    }
    await db.product.delete({
      where: {
        id: id,
      },
    });
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
    //throw new Error("ERROR");
    //return { error: "Test err" };
    revalidatePath("/admin/products");
    return { success: "Product deleted" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    return { error: "Some error" };
  }
};
