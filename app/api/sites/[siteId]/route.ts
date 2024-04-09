import Site from "@/lib/models/Site";
import Tour from "@/lib/models/Tour";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { siteId: string } }
) => {
    try {
        await connectToDB();

        const site = await Site.findById(params.siteId);

        if (!site) {
            return new NextResponse(
                JSON.stringify({ message: "Site not found" }),
                { status: 404 }
            );
        }

        return NextResponse.json(site, { status: 200 });
    } catch (err) {
        console.log("[siteId_GET]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { siteId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unanthorized", { status: 403 });
        }

        await connectToDB();

        let site = await Site.findById(params.siteId);

        if (!site) {
            return new NextResponse(
                JSON.stringify({ message: "Site not found" }),
                { status: 404 }
            );
        }

        const { title, description, image } = await req.json();

        if (!title || !image) {
            return new NextResponse("Title and image are required", {
                status: 400,
            });
        }

        site = await Site.findByIdAndUpdate(
            params.siteId,
            { title, description, image },
            { new: true }
        );

        return NextResponse.json(site, { status: 200 });
    } catch (err) {
        console.log("[siteId_POST]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { siteId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unanthorized", { status: 403 });
        }

        await connectToDB();

        await Site.findByIdAndDelete(params.siteId);

        await Tour.updateMany(
            {
                sites: params.siteId,
            },
            {
                $pull: { sites: params.siteId },
            }
        );

        return new NextResponse("Site is deleted.", { status: 200 });
    } catch (err) {
        console.log("[siteId_DELETE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};
