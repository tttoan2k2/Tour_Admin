"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
    placeholder: string;
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
    placeholder,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState("");

    const addValue = (item: string) => {
        onChange(item);
        setInputValue("");
    };

    return (
        <div>
            <Input
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        addValue(inputValue);
                    }
                }}
            />

            <div className="flex gap-1 flex-wrap mt-4">
                {value.map((item, index) => (
                    <Badge key={index} className="bg-black text-white">
                        {item}
                        <button
                            type="button"
                            className="ml-1 rounded-full outline-none hover:bg-red-500"
                            onClick={() => onRemove(item)}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default MultiText;
