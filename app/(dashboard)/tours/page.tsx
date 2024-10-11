"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/tours/TourColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Tours = () => {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState<TourType[]>([]);
    const router = useRouter();

    const getTours = async () => {
        try {
            const res = await fetch("/api/tours", {
                method: "GET",
            });

            const data = await res.json();
            setTours(data);
            setLoading(false);
        } catch (err) {
            console.log("[getTours]", err);
        }
    };

    useEffect(() => {
        getTours();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-[24px] text-black">Tours</p>
                <Button onClick={() => router.push("/tours/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Tour
                </Button>
            </div>
            <Separator className="bg-gray-500 mt-4 mb-7" />
            <DataTable columns={columns} data={tours} searchKey="title" />
        </div>
    );
};

export default Tours;
