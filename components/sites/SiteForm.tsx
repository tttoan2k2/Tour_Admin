"use client";

import { Separator } from "../ui/separator";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(2000).trim(),
    image: z.string(),
});

interface SiteFormProps {
    initiaData?: SiteType | null;
}

const SiteForm: React.FC<SiteFormProps> = ({ initiaData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initiaData
            ? initiaData
            : {
                  title: "",
                  description: "",
                  image: "",
              },
    });

    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const url = initiaData
                ? `/api/sites/${initiaData._id}`
                : "/api/sites";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });

            if (res.ok) {
                setLoading(false);
                toast.success(
                    `Địa danh đã được ${
                        initiaData ? "sửa" : "tạo"
                    } thành công. `
                );
                window.location.href = "/sites";
                router.push("/sites");
            }
        } catch (err) {
            console.log("[SiteForm]", err);
            toast.error("Có một lỗi gì đó! Vui lòng thử lại.");
        }
    };

    return (
        <div className="p-10">
            {initiaData ? (
                <div>
                    <p className="font-semibold text-[24px] text-black">
                        Chỉnh sửa địa danh
                    </p>
                </div>
            ) : (
                <p className="font-semibold text-[24px] text-black">
                    Tạo địa danh
                </p>
            )}
            <Separator className="bg-gray-500 mt-4 mb-7" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tiêu đề</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tiêu đề"
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mô tả</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Mô tả"
                                        {...field}
                                        rows={5}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hình ảnh minh họa</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-10">
                        <Button type="submit">Xác nhận</Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/sites")}
                        >
                            Hủy bỏ
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SiteForm;
