"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<SiteType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <Link
                className="hover:text-black"
                href={`/sites/${row.original._id}`}
            >
                <p>{row.original.title}</p>
            </Link>
        ),
    },
    {
        accessorKey: "tours",
        header: "Tours",
        cell: ({ row }) => <p>{row.original.tours.length}</p>,
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="site" id={row.original._id} />,
    },
];
