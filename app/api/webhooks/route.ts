import { stripe } from "@/lib/Stripe";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("Stripe-Signature") as string;

        const event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log("session: ", session);

            const customerInfo = {
                clerkId: session?.client_reference_id,
                name: session?.customer_details?.name,
                email: session?.customer_details?.email,
            };
            console.log("customer: ", customerInfo);

            const retrieveSession = await stripe.checkout.sessions.retrieve(
                session.id,
                { expand: ["line_items.data.price.product"] }
            );

            console.log("order: ", retrieveSession?.line_items?.data);

            const lineItems = await retrieveSession?.line_items?.data;

            const orderItems = lineItems?.map((item: any) => {
                return {
                    tour: item.price.product.metadata.tourId,
                    tourName: item.description,
                    tourDate: item.price.product.metadata.tourDate,
                    adultPrice: item.price.product.metadata.adultPrice,
                    adultQuantity: item.price.product.metadata.adultQuantity,
                    childrenPrice: item.price.product.metadata.childrenPrice,
                    childrenQuantity:
                        item.price.product.metadata.childrenQuantity,
                    infantPrice: item.price.product.metadata.infantPrice,
                    infantQuantity: item.price.product.metadata.infantQuantity,
                };
            });

            console.log("orderItem: ", orderItems);

            await connectToDB();

            const newOrder = new Order({
                customerClerkId: customerInfo.clerkId,
                tours: orderItems,
                totalAmount: session.amount_total,
            });

            await newOrder.save();

            let customer = await Customer.findOne({
                clerkId: customerInfo.clerkId,
            });

            if (customer) {
                customer.orders.push(newOrder._id);
            } else {
                customer = new Customer({
                    ...customerInfo,
                    orders: [newOrder._id],
                });
            }

            await customer.save();
        }
        return new NextResponse("Order created", { status: 200 });
    } catch (err) {
        console.log("Webhooks", err);
        return new NextResponse("Failed to create order", { status: 500 });
    }
};
