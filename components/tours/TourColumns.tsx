"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<TourType>[] = [
    {
        accessorKey: "title",
        header: "Tiêu đề",
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
        header: "Loại hình",
    },
    {
        accessorKey: "sites",
        header: "Thuộc địa danh",
        cell: ({ row }) =>
            row.original.sites.map((site) => site.title).join(", "),
    },
    {
        accessorKey: "diem_khoi_hanh",
        header: "Điểm khởi hành",
    },
    {
        accessorKey: "price",
        header: "Giá",
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="tours" id={row.original._id} />,
    },
];
