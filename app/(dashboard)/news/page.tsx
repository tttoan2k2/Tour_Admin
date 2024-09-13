"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/news/NewsColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const News = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const router = useRouter();

    const getNews = async () => {
        try {
            const res = await fetch("/api/news", {
                method: "GET",
            });
            const data = await res.json();
            setNews(data);
            setLoading(false);
        } catch (err) {
            console.log("[news_GET]", err);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-[24px] text-black">
                    Tin tức và thông tin khuyến mãi
                </p>
                <Button onClick={() => router.push("/news/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo tin tức
                </Button>
            </div>
            <Separator className="bg-gray-500 mt-4 mb-7" />
            <DataTable columns={columns} data={news} searchKey="title" />
        </div>
    );
};

export default News;
