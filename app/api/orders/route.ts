import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const orders = await Order.find().sort({ createdAt: "desc" });

        const orderDetails = await Promise.all(
            orders.map(async (order) => {
                const customer = await Customer.findOne({
                    clerkId: order.customerClerkId,
                });

                return {
                    _id: order._id,
                    customer: customer.name,
                    tourName: order.tours[0]?.tourName,
                    tours:
                        order.tours[0]?.adultQuantity +
                        order.tours[0]?.childrenQuantity +
                        order.tours[0]?.infantQuantity,

                    date: format(order.tours[0]?.tourDate, "MM do, yyyy"),
                    totalAmount: order.totalAmount,
                    createdAt: format(order.createdAt, "MM do, yyyy"),
                };
            })
        );

        return NextResponse.json(orderDetails, { status: 200 });
    } catch (err) {
        console.log("Orders_GET", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};
