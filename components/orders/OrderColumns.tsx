"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
    {
        accessorKey: "_id",
        header: "Order ID",
        invertSorting: true,
        cell: ({ row }) => (
            <Link
                className="hover:text-black"
                href={`/orders/${row.original._id}`}
            >
                <p>{row.original._id}</p>
            </Link>
        ),
    },
    {
        accessorKey: "customer",
        header: "Khách hàng",
    },
    {
        accessorKey: "tourName",
        header: "Tên Tour",
    },
    {
        accessorKey: "tours",
        header: "Số lượng vé",
    },

    {
        accessorKey: "date",
        header: "Ngày khởi hành",
    },
    {
        accessorKey: "totalAmount",
        header: "Tổng (đ)",
    },
    {
        accessorKey: "createdAt",
        header: "Tạo vào ngày",
    },
];
