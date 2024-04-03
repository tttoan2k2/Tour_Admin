"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/sites/SiteColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sites = () => {
    const [loading, setLoading] = useState(true);
    const [sites, setSites] = useState([]);
    const router = useRouter();

    const getSites = async () => {
        try {
            const res = await fetch("/api/sites", {
                method: "GET",
            });

            const data = await res.json();
            setSites(data);
            setLoading(false);
        } catch (err) {
            console.log("[sites_GET]", err);
        }
    };

    useEffect(() => {
        getSites();
    }, []);

    return (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-[24px] text-black">Sites</p>
                <Button onClick={() => router.push("/sites/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Site
                </Button>
            </div>
            <Separator className="bg-gray-500 mt-4 mb-7" />
            <DataTable columns={columns} data={sites} searchKey="title" />
        </div>
    );
};

export default Sites;
