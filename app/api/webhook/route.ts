import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  console.log("session from stripe.webhooks:", session);

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const ordersIds = session?.metadata?.orderIds?.split("_") || [];
    console.log("ordersIds from checkout.session.completed: ", ordersIds);

    for (let orderId of ordersIds) {
      const order = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || "",
        },
        include: {
          orderItems: true,
        },
      });
      console.log("order from checkout.session.completed: ", order);

      for (let orderItem of order.orderItems) {
        const prod = await db.product.findFirst({
          where: {
            id: orderItem.productId,
          },
        });
        console.log("prod from checkout.session.completed: ", prod);
        if (prod && prod.number) {
          await db.product.update({
            where: {
              id: orderItem.productId,
            },
            data: {
              number: prod.number - 1,
            },
          });
        }
      }

      /*  const productIds = order.orderItems.map((orderItem) => orderItem.productId);
    const products = await db.product.findMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
    });
    await db.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        number: {number-1} //products.map((product) => product.number - 1),
      },
    });

    await db.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name.trim(),
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
              name: property.name.trim(),
              slug: property.slug,
              values: {
                create: property.values.map((value: Value) => {
                  return {
                    name: value.name.trim(),
                    slug: value.slug,
                  };
                }),
              },
            };
          }),
        },
      },
      include: {
        properties: { include: { values: true } },
      },
    }); */
    }

    return new NextResponse(null, { status: 200 });
  }
}
