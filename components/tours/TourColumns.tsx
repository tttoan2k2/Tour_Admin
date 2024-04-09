"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<TourType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <Link
                className="hover:text-black"
                href={`/tours/${row.original._id}`}
            >
                <p>{row.original.title}</p>
            </Link>
        ),
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "sites",
        header: "Sites",
        cell: ({ row }) =>
            row.original.sites.map((site) => site.title).join(", "),
    },
    {
        accessorKey: "diem_khoi_hanh",
        header: "Start At",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="tour" id={row.original._id} />,
    },
];
