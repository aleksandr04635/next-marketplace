"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { update } from "@/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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
export const createCategory = async (category: Category) => {
  console.log("category from func: ", category);
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  const categoryCr = await db.category.create({
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
              //  createMany: {
              create: property.values.map((value: Value) => {
                return { name: value.name, slug: value.slug };
              }),

              // },
            },
          };
        })!, //it's just to fix Typescript error
      },
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
  console.log("categoryCr from func: ", categoryCr);
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

  if (user.isOAuth) {
    //if auth via OAuth not update these fields
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    //if an email is changed
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }
    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      "/admin/settings"
    );
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  console.log("updatedUser from settings:", updatedUser);
  update({
    //updates session
    user: {
      image: updatedUser.image,
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  }); */
  return { error: "Test err" };
  return { success: "Category created" };
};
