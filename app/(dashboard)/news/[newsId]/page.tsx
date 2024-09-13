"use client";

import Loader from "@/components/custom ui/Loader";
import NewsForm from "@/components/news/NewsForm";
import { useEffect, useState } from "react";

const NewsDetails = ({ params }: { params: { newsId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [newsDetails, setNewsDetails] = useState<NewsType | null>(null);

    const getNewsDetails = async () => {
        try {
            const res = await fetch(`/api/news/${params.newsId}`, {
                method: "GET",
            });

            const data = await res.json();

            setNewsDetails(data);
            setLoading(false);
        } catch (err) {
            console.log("[site_details_GET]", err);
        }
    };

    useEffect(() => {
        getNewsDetails();
    }, []);

    return loading ? <Loader /> : <NewsForm initiaData={newsDetails} />;
};

export default NewsDetails;
