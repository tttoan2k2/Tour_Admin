import Site from "@/lib/models/Site";
import Tour from "@/lib/models/Tour";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unanthorized", { status: 403 });
        }

        await connectToDB();

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

        const newTour = await Tour.create({
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
        });

        await newTour.save();

        if (sites) {
            for (const siteId of sites) {
                const site = await Site.findById(siteId);
                if (site) {
                    site.tours.push(newTour._id);
                    await site.save();
                }
            }
        }

        return NextResponse.json(newTour, { status: 200 });
    } catch (err) {
        console.log("[tours_POST]", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const tours = await Tour.find()
            .sort({ createdAt: "desc" })
            .populate({ path: "sites", model: Site });

        return NextResponse.json(tours, { status: 200 });
    } catch (err) {
        console.log("[tours_GET]", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};
