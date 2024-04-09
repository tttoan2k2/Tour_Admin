import Site from "@/lib/models/Site";
import Tour from "@/lib/models/Tour";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { tourId: string } }
) => {
    try {
        await connectToDB();

        const tour = await Tour.findById(params.tourId).populate({
            path: "sites",
            model: Site,
        });

        if (!tour) {
            return new NextResponse(
                JSON.stringify({ message: "Tour not found" }),
                { status: 404 }
            );
        }

        return NextResponse.json(tour, { status: 200 });
    } catch (err) {
        console.log("[tourId_GET]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { tourId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const tour = await Tour.findById(params.tourId);

        if (!tour) {
            return new NextResponse(
                JSON.stringify({ message: "Tour not found" }),
                { status: 404 }
            );
        }

        const {
            title,
            description,
            media,
            category,
            sites,
            lich_trinh,
            price,
            thoi_gian,
            tong_quan,
            diem_khoi_hanh,
            quy_dinh,
        } = await req.json();

        if (!title || !description || !media || !price) {
            return new NextResponse("Please enter full infomation!", {
                status: 400,
            });
        }

        const addedSites = sites.filter(
            (siteId: string) => !tour.sites.includes(siteId)
        );

        const removedSites = tour.sites.filter(
            (siteId: string) => !sites.includes(siteId)
        );

        // update sites
        await Promise.all([
            ...addedSites.map((siteId: string) =>
                Site.findByIdAndUpdate(siteId, {
                    $push: { tours: tour._id },
                })
            ),

            ...removedSites.map((siteId: string) =>
                Site.findByIdAndUpdate(siteId, {
                    $pull: { tours: tour._id },
                })
            ),
        ]);

        const updatedTour = await Tour.findByIdAndUpdate(
            tour._id,
            {
                title,
                description,
                media,
                category,
                sites,
                lich_trinh,
                price,
                thoi_gian,
                tong_quan,
                diem_khoi_hanh,
                quy_dinh,
            },
            { new: true }
        ).populate({ path: "sites", model: Site });

        await updatedTour.save();

        return NextResponse.json(updatedTour, { status: 200 });
    } catch (err) {
        console.log("[tourId_POST]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { tourId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const tour = await Tour.findById(params.tourId);

        if (!tour) {
            return new NextResponse(
                JSON.stringify({ message: "Tour not found" }),
                { status: 404 }
            );
        }

        await Tour.findByIdAndDelete(params.tourId);

        // update sites
        await Promise.all(
            tour.sites.map((siteId: string) =>
                Site.findByIdAndUpdate(siteId, {
                    $pull: { tours: tour._id },
                })
            )
        );

        return new NextResponse(JSON.stringify({ message: "Tour deleted!" }), {
            status: 200,
        });
    } catch (err) {
        console.log("[tourId_POST]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};
