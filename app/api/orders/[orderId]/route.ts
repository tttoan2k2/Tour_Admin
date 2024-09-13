import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Tour from "@/lib/models/Tour";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { orderId: String } }
) => {
    try {
        await connectToDB();

        const orderDetails = await Order.findById(params.orderId).populate({
            path: "tours.tour",
            model: Tour,
        });

        if (!orderDetails) {
            return new NextResponse(JSON.stringify({ message: "Not Found" }), {
                status: 404,
            });
        }

        const customer = await Customer.findOne({
            clerkId: orderDetails.customerClerkId,
        });

        return NextResponse.json({ orderDetails, customer }, { status: 200 });
    } catch (err) {
        console.log("OrderId_GET", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
