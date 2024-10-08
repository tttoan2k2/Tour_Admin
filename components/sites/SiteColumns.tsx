"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<SiteType>[] = [
    {
        accessorKey: "title",
        header: "Tên quốc gia",
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
        header: "Số Tour hiện có",
        cell: ({ row }) => <p>{row.original.tours.length}</p>,
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="sites" id={row.original._id} />,
    },
];
