import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";
import React from "react";

const Customers = async () => {
    await connectToDB();

    const customers = await Customer.find().sort({ createdAt: "desc" });
    return (
        <div className="px-10 py-5">
            <p className="font-semibold text-[24px] text-black">Customers</p>
            <Separator className="bg-gray-500 my-5" />
            <DataTable columns={columns} data={customers} searchKey="name" />
        </div>
    );
};

export const dynamic = "force-dynamic";

export default Customers;
