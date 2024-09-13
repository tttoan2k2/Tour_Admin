import Tour from "@/lib/models/Tour";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { query: string } }
) => {
    try {
        await connectToDB();

        const searchedTours = await Tour.find({
            $or: [{ title: { $regex: params.query, $options: "i" } }],
        });

        return NextResponse.json(searchedTours, { status: 200 });
    } catch (err) {
        console.log("[search_GET]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
