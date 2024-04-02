"use client";

import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Leftsidebar = () => {
    const pathname = usePathname();
    return (
        <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-gray-100/40 shadow-xl max-lg:hidden border-[1px]">
            <h1 className="text-[24px] font-semibold text-black">Admin</h1>

            <div className="flex flex-col gap-12">
                {navLinks.map((link) => (
                    <Link
                        href={link.url}
                        key={link.label}
                        className={`flex gap-4 text-[17px] font-medium hover:text-black ${
                            pathname === link.url ? "text-black" : ""
                        }`}
                    >
                        {link.icon} <p>{link.label}</p>
                    </Link>
                ))}
            </div>

            <div className="flex gap-4 text-[17px] items-center font-medium hover:text-black">
                <UserButton />
                <p>Profile</p>
            </div>
        </div>
    );
};

export default Leftsidebar;
