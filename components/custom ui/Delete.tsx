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
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);

            const res = await fetch(`/api/sites/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setLoading(false);
                window.location.href = "/sites";
                toast.success("Site deleted");
            }
        } catch (err) {
            console.log("[site_DELETE]", err);
            toast.error("Something went wrong. Please try again!");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className="bg-red-500 text-white">
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your site.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Delete;
