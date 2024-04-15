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
  //console.log("session from stripe.webhooks:", session);

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
    const ordersIds = session?.metadata?.ordersIds?.split("_") || [];
    /*  console.log(
      "session?.metadata from checkout.session.completed: ",
      session?.metadata
    );
    console.log(
      "metadata.ordersIds from checkout.session.completed: ",
      session?.metadata?.orderIds
    ); */
    //console.log("ordersIds from checkout.session.completed: ", ordersIds);

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
      //console.log("order from checkout.session.completed: ", order);

      for (let orderItem of order.orderItems) {
        const prod = await db.product.findFirst({
          where: {
            id: orderItem.productId,
          },
        });
        //console.log("prod from checkout.session.completed: ", prod);
        if (prod && prod.number) {
          const prod2 = await db.product.update({
            where: {
              id: orderItem.productId,
            },
            data: {
              number: prod.number - 1,
            },
          });
          //console.log("prod2 from checkout.session.completed: ", prod2);
        }
      }
    }

    return new NextResponse(null, { status: 200 });
  }
}
