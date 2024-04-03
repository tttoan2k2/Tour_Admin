"use client";

import Loader from "@/components/custom ui/Loader";
import SiteForm from "@/components/sites/SiteForm";
import { useEffect, useState } from "react";

const SiteDetails = ({ params }: { params: { siteId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [siteDetails, setSiteDetails] = useState<SiteType | null>(null);

    const getSiteDetails = async () => {
        try {
            const res = await fetch(`/api/sites/${params.siteId}`, {
                method: "GET",
            });

            const data = await res.json();

            setSiteDetails(data);
            setLoading(false);
        } catch (err) {
            console.log("[site_details_GET]", err);
        }
    };

    useEffect(() => {
        getSiteDetails();
    }, []);

    return loading ? <Loader /> : <SiteForm initiaData={siteDetails} />;
};

export default SiteDetails;
