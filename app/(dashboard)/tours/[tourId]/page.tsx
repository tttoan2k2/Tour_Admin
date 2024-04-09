"use client";

import Loader from "@/components/custom ui/Loader";
import TourForm from "@/components/tours/TourForm";
import React, { useEffect, useState } from "react";

const TourDetails = ({ params }: { params: { tourId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [tourDetails, setTourDetails] = useState<TourType | null>(null);

    const getTourDetails = async () => {
        try {
            const res = await fetch(`/api/tours/${params.tourId}`, {
                method: "GET",
            });

            const data = await res.json();

            setTourDetails(data);
            setLoading(false);
        } catch (err) {
            console.log("[tour_details_GET]", err);
        }
    };

    useEffect(() => {
        getTourDetails();
    }, []);

    return loading ? <Loader /> : <TourForm initiaData={tourDetails} />;
};

export default TourDetails;
