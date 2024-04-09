"use client";

import React, { useState } from "react";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
    placeholder: string;
    sites: SiteType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    placeholder,
    sites,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    let selected: SiteType[];

    if (value.length === 0) {
        selected = [];
    } else {
        selected = value.map((id) =>
            sites.find((site) => site._id === id)
        ) as SiteType[];
    }

    const selectTables = sites.filter((site) => !selected.includes(site));

    return (
        <Command className="overflow-visible bg-white">
            <div className="flex gap-1 flex-col border rounded-md">
                <div className="flex flex-wrap">
                    {selected.map((schedule) => (
                        <Badge
                            className="bg-white text-black hover:bg-white hover:text-black"
                            key={schedule._id}
                        >
                            {schedule.title}
                            <button
                                className="ml-1 hover:text-red-500"
                                onClick={() => onRemove(schedule._id)}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>

                <CommandInput
                    placeholder={placeholder}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                />
            </div>
            <div className="relative mt-2">
                {open && (
                    <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
                        {selectTables.map((site) => (
                            <CommandItem
                                key={site._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onSelect={() => {
                                    onChange(site._id);
                                    setInputValue("");
                                }}
                                className="hover:bg-gray-500 cursor-pointer"
                            >
                                {site.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </div>
        </Command>
    );
};

export default MultiSelect;
