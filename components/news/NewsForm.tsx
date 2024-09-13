"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Separator } from "../ui/separator";
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
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(10000).trim(),
    image: z.string(),
});

interface NewsFormProps {
    initiaData?: NewsType | null;
}

const NewsForm: React.FC<NewsFormProps> = ({ initiaData }) => {
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
                ? `/api/news/${initiaData._id}`
                : "/api/news";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });

            if (res.ok) {
                setLoading(false);
                toast.success(
                    `Tin tức đã được ${initiaData ? "sửa" : "tạo"} thành công `
                );

                window.location.href = "/news";
                router.push("/news");
            }
        } catch (err) {
            console.log("[news_POST]", err);
            toast.error("Có một lỗi gì đó! Vui lòng thử lại.");
        }
    };

    return (
        <div className="p-10">
            {initiaData ? (
                <div>
                    <p className="font-semibold text-[24px] text-black">
                        Chỉnh sửa tin tức
                    </p>
                </div>
            ) : (
                <p className="font-semibold text-[24px] text-black">
                    Tạo tin tức
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
                                <FormLabel>Nội dung</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Nội dung"
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

export default NewsForm;
