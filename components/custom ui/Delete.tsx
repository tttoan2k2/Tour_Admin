"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
    id: string;
    item: string;
}

const Delete: React.FC<DeleteProps> = ({ id, item }) => {
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);

            const res = await fetch(`/api/${item}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setLoading(false);
                window.location.href = `${item}`;
                toast.success(`Đã xóa ${item} thành công.`);
            }
        } catch (err) {
            console.log("[DELETE]", err);
            toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button type="button" className="bg-red-500 text-white">
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Bạn có chắc muốn xóa không?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này sẽ xóa {item} của bạn.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        Tiếp tục
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Delete;
