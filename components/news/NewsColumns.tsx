"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<NewsType>[] = [
    {
        accessorKey: "title",
        header: "Tiêu đề",
        cell: ({ row }) => (
            <Link
                className="hover:text-black"
                href={`/news/${row.original._id}`}
            >
                <p>{row.original.title}</p>
            </Link>
        ),
    },

    {
        accessorKey: "createdAt",
        header: "Thời gian tạo",
    },

    {
        id: "actions",
        cell: ({ row }) => <Delete item="news" id={row.original._id} />,
    },
];
