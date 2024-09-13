import News from "@/lib/models/News";
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

        const existingNews = await News.findOne({ title });

        if (existingNews) {
            return new NextResponse("News already exists", { status: 400 });
        }

        if (!title || !description || !image) {
            return new NextResponse("Missing value.", {
                status: 400,
            });
        }

        const newNews = await News.create({
            title,
            description,
            image,
        });

        await newNews.save();

        return NextResponse.json(newNews, { status: 200 });
    } catch (err) {
        console.log("[news_POST]", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const news = await News.find().sort({ createdAt: "desc" });

        return NextResponse.json(news, { status: 200 });
    } catch (err) {
        console.log("[news_GET]", err);
        return new NextResponse("Internal server error", { status: 500 });
    }
};
