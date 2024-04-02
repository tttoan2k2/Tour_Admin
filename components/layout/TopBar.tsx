"use client";

import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TopBar = () => {
    const [dropMenu, setDropMenu] = useState(false);
    const pathname = usePathname();

    return (
        <div className="w-full static top-0 z-20 flex justify-between items-center px-8 py-4 shadow-xl bg-gray-100/40 lg:hidden border-[1px]">
            <h1 className="text-[24px] font-semibold text-black">Admin</h1>

            <div className="flex gap-8 max-md:hidden">
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

            <div className="relative flex gap-4 items-center">
                <Menu
                    className=" cursor-pointer md:hidden"
                    onClick={() => setDropMenu(!dropMenu)}
                />
                {dropMenu && (
                    <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg border-[1px]">
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
                )}
                <UserButton />
            </div>
        </div>
    );
};

export default TopBar;
