import News from "@/lib/models/News";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { newsId: string } }
) => {
    try {
        await connectToDB();

        const news = await News.findById(params.newsId);

        if (!news) {
            return new NextResponse(
                JSON.stringify({ message: "Không tìm thấy!" }),
                { status: 404 }
            );
        }

        return NextResponse.json(news, { status: 200 });
    } catch (err) {
        console.log("[newsId_GET]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { newsId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unanthorized", { status: 403 });
        }

        await connectToDB();

        let news = await News.findById(params.newsId);

        if (!news) {
            return new NextResponse(
                JSON.stringify({ message: "Site not found" }),
                { status: 404 }
            );
        }

        const { title, description, image } = await req.json();

        if (!title || !description || !image) {
            return new NextResponse("Missing values.", {
                status: 400,
            });
        }

        news = await News.findByIdAndUpdate(
            params.newsId,
            { title, description, image },
            { new: true }
        );

        return NextResponse.json(news, { status: 200 });
    } catch (err) {
        console.log("[newsId_POST]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { newsId: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unanthorized", { status: 403 });
        }

        await connectToDB();

        await News.findByIdAndDelete(params.newsId);

        return new NextResponse("News is deleted", { status: 200 });
    } catch (err) {
        console.log("[newsId_DELETE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
};
