"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
    {
        accessorKey: "tour",
        header: "Tour",
        cell: ({ row }) => (
            <Link
                className="hover:text-black"
                href={`/tours/${row.original.tour._id}`}
            >
                <p>{row.original.tour.title}</p>
            </Link>
        ),
    },
    {
        accessorKey: "tourDate",
        header: "Date",
    },
    {
        accessorKey: "adultQuantity",
        header: "Adult Quantity",
    },
    {
        accessorKey: "adultPrice",
        header: "Adult Total",
    },
    {
        accessorKey: "childrenQuantity",
        header: "Children Quantity",
    },
    {
        accessorKey: "childrenPrice",
        header: "Children Total",
    },
    {
        accessorKey: "infantQuantity",
        header: "Infant Quantity",
    },
    {
        accessorKey: "infantPrice",
        header: "Infant Total",
    },
];
