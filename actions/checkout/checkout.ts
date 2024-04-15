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
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

import { ProductCard } from "@/types";
import { Product } from "@prisma/client";

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
interface checkoutProps {
  data: Product;
  number: number;
}

//type ProductFormValues = z.infer<typeof productFormSchema>;
export const checkout = async (cart: checkoutProps[]) => {
  // console.log("cart from checkout: ", cart);
  try {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const orderInfos: {
      userToId: string;
      products: {
        productId: string;
        number: number;
      }[];
    }[] = [];
    cart.forEach((product: { data: Product; number: number }) => {
      //console.log("product.data.price from checkout: ", product.data.price);
      line_items.push({
        quantity: product.number,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.data.name,
          },
          unit_amount: +product.data.price * 100, //.toNumber()
        },
      });
      //index of userTo in orderInfos:
      let ind = -1;
      orderInfos.forEach((order, i) => {
        if (order.userToId == product.data.userId) {
          ind = i;
        }
      });
      let newOrdersArray: {
        productId: string;
        number: number;
      }[] = [];
      let indNew = orderInfos.length;
      if (ind != -1) {
        indNew = ind;
        newOrdersArray = orderInfos[ind].products;
      }
      newOrdersArray.push({
        productId: product.data.id,
        number: product.number,
      });
      orderInfos[indNew] = {
        userToId: product.data.userId,
        products: newOrdersArray,
      };
    });
    /*  console.log("line_items from checkout: ", line_items);
    console.log("orderInfos from checkout: ", orderInfos);
    console.log(
      "orderInfos[0].products from checkout: ",
      orderInfos[0].products
    ); */

    const user = await currentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }
    const dbUser = await getUserById(user.id);
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    const ordersIds: string[] = [];
    for (let orderInfo of orderInfos) {
      /*  async (orderInfo: {
        userToId: string;
        products: {
          productId: string;
          number: number;
        }[];
      }) => { */
      const order = await db.order.create({
        data: {
          userFromId: dbUser.id,
          userToId: orderInfo.userToId,
          isPaid: false,
          orderItems: {
            create: orderInfo.products.map(
              (product: { productId: string; number: number }) => {
                return {
                  productId: product.productId,
                  number: product.number,
                };
              }
            ),
          },
          /*      orderItems: {
              create: orderInfo.products.map((product: {
                productId: string;
                number: number;
              }) => ({
                product: {
                  connect: {
                    id: product.productId,
                  },
                },
              })),
            }, */
        },
        include: {
          orderItems: true,
        },
      });
      //console.log("order from checkout: ", order);
      ordersIds.push(order.id);
      // };
    }
    /*     orderInfos.forEach(
      async (orderInfo: {
        userToId: string;
        products: {
          productId: string;
          number: number;
        }[];
      }) => {
        const order = await db.order.create({
          data: {
            userFromId: dbUser.id,
            userToId: orderInfo.userToId,
            isPaid: false,
            orderItems: {
              create: orderInfo.products.map(
                (product: { productId: string; number: number }) => {
                  return {
                    productId: product.productId,
                    number: product.number,
                  };
                }
              ),
            },            
          },
          include: {
            orderItems: true,
          },
        });
        console.log("order from checkout: ", order);
        ordersIds.push(order.id);
      }
    ); */
    //console.log("ordersIds from checkout: ", ordersIds);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=1`,
      metadata: {
        ordersIds: ordersIds.join("_"),
      },
    });

    //return { error: "Test err" };

    //revalidatePath("/cart");
    return { success: session.url };
    //return { success: "productCr.id" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    return { error: "Some error" };
  }
};
