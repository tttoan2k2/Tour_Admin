import Site from "@/lib/models/Site";
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

        const { title, description, image } = await req.json();

        const existingSite = await Site.findOne({ title });

        if (existingSite) {
            return new NextResponse("Site existing", { status: 400 });
        }

        if (!title || !image) {
            return new NextResponse("Title and image are required", {
                status: 400,
            });
        }

        const newSite = await Site.create({
            title,
            description,
            image,
        });

        await newSite.save();

        return NextResponse.json(newSite, { status: 200 });
    } catch (err) {
        console.log("[sites_POST]", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};
