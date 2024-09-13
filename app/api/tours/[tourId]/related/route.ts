import Tour from "@/lib/models/Tour";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { tourId: string } }
) => {
    try {
        await connectToDB();

        const tour = await Tour.findById(params.tourId);

        if (!tour) {
            return new NextResponse(
                JSON.stringify({ message: "Tour not found" }),
                { status: 404 }
            );
        }

        const relatedTours = await Tour.find({
            $or: [{ category: tour.category }, { sites: { $in: tour.sites } }],
            _id: { $ne: tour._id }, // Loại trừ tour hiện tại
        });

        if (!relatedTours) {
            return new NextResponse(
                JSON.stringify({ message: "No related tours found" }),
                { status: 404 }
            );
        }

        return NextResponse.json(relatedTours, { status: 200 });
    } catch (err) {
        console.log("[related_GET", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
