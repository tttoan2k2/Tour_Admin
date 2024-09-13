import Order from "@/lib/models/Order";

import Tour from "@/lib/models/Tour";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { customerId: string } }
) => {
    try {
        await connectToDB();

        const orders = await Order.find({
            customerClerkId: params.customerId,
        }).populate({ path: "tours.tour", model: Tour });

        return NextResponse.json(orders, { status: 200 });
    } catch (err) {
        console.log("[customerId_GET", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
