import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/Stripe";
import cors from "@/lib/cors";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: NextRequest) {
    try {
        const { tourItem, customer } = await req.json();

        if (!tourItem || !customer) {
            return new NextResponse("Not enough data to checkout", {
                status: 400,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "vnd",
                        product_data: {
                            name: tourItem.title,
                            metadata: {
                                tourId: tourItem.id,
                                tourDate: tourItem.tour_date,
                                startAt: tourItem.diem_khoi_hanh,
                                adultPrice: tourItem.adultPrice,
                                adultQuantity: tourItem.adultQuantity,
                                childrenPrice: tourItem.childrenPrice,
                                childrenQuantity: tourItem.childrenQuantity,
                                infantPrice: tourItem.infantPrice,
                                infantQuantity: tourItem.infantQuantity,
                            },
                        },
                        unit_amount:
                            tourItem.adultPrice +
                            tourItem.childrenPrice +
                            tourItem.infantPrice,
                    },
                    quantity: 1,
                },
            ],
            client_reference_id: customer.clerkId,
            success_url: `${process.env.TOUR_CLIENT_URL}/payment_success`,
            cancel_url: `${process.env.TOUR_CLIENT_URL}/home`,
        });

        return NextResponse.json(session, {
            headers: corsHeaders,
        });
    } catch (err) {
        console.log("[checkout_POST]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}
