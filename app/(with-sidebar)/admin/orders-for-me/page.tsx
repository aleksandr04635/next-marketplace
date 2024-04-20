import { format } from "date-fns";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./_components/columns";
import { OrderClient } from "./_components/client";
import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Orders for me | My Marketplace",
  description: "A marketplace created with Next.js 14 and Prisma",
};

const OrdersPage = async () => {
  const user = await currentUser();
  const orders = await db.order.findMany({
    where: {
      userToId: user?.id || "",
    },
    include: {
      userFrom: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    buyerEmail: item.userFrom.email || "",
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  //ml-0  lg:ml-2
  return (
    <Card className=" w-full mx-auto my-2 lg:max-w-[1200px] ">
      <CardContent>
        <OrderClient data={formattedOrders} />
      </CardContent>
    </Card>
    /*  <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div> */
  );
};

export default OrdersPage;
