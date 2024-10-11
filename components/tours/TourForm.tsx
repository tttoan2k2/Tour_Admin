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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
    title: z.string().min(2).max(500),
    description: z.string().min(2).max(2000).trim(),
    media: z.array(z.string()),
    category: z.string(),
    sites: z.array(z.string()),
    lich_trinh: z.array(z.string()),
    price: z.coerce.number().min(0),
    thoi_gian: z.array(z.string()),
    tong_quan: z.array(z.string()),
    diem_khoi_hanh: z.string(),
    quy_dinh: z.array(z.string()),
});

interface TourFormProps {
    initiaData?: TourType | null;
}

const TourForm: React.FC<TourFormProps> = ({ initiaData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const [sites, setSites] = useState<SiteType[]>([]);

    const getSites = async () => {
        try {
            const res = await fetch("/api/sites", {
                method: "GET",
            });

            const data = await res.json();
            setSites(data);
            setLoading(false);
        } catch (err) {
            console.log("[TourForm]", err);
            toast.error("Something went wrong! Please try again.");
        }
    };

    useEffect(() => {
        getSites();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initiaData
            ? { ...initiaData, sites: initiaData.sites.map((site) => site._id) }
            : {
                  title: "",
                  description: "",
                  media: [],
                  category: "",
                  sites: [],
                  lich_trinh: [],
                  price: 0,
                  thoi_gian: [],
                  tong_quan: [],
                  diem_khoi_hanh: "",
                  quy_dinh: [],
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
                ? `/api/tours/${initiaData._id}`
                : "/api/tours";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });

            if (res.ok) {
                setLoading(false);
                toast.success(
                    `Tour du lịch đã được ${
                        initiaData ? "sửa" : "tạo"
                    } thành công`
                );
                window.location.href = "/tours";
                router.push("/tours");
            }
        } catch (err) {
            console.log("[TourForm]", err);
            toast.error("Something went wrong! Please try again.");
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="p-10">
            {initiaData ? (
                <div>
                    <p className="font-semibold text-[24px] text-black">
                        Chỉnh sửa Tour
                    </p>
                </div>
            ) : (
                <p className="font-semibold text-[24px] text-black">
                    Thêm Tour
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
                                        placeholder="Nhập tiêu đề"
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
                                        placeholder="Nhập mô tả"
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
                        name="diem_khoi_hanh"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Khởi hành tại</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nhập điểm khởi hành"
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
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ảnh</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) =>
                                            field.onChange([
                                                ...field.value,
                                                url,
                                            ])
                                        }
                                        onRemove={(url) =>
                                            field.onChange([
                                                ...field.value.filter(
                                                    (image) => image !== url
                                                ),
                                            ])
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giá</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập giá"
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
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loại hình</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập loại hình"
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
                            name="lich_trinh"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lịch trình</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Nhập lịch trình"
                                            value={field.value}
                                            onChange={(schedule) =>
                                                field.onChange([
                                                    ...field.value,
                                                    schedule,
                                                ])
                                            }
                                            onRemove={(scheduleToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (schedule) =>
                                                            schedule !==
                                                            scheduleToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="thoi_gian"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời gian khởi hành</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Nhập thời gian khởi hành"
                                            value={field.value}
                                            onChange={(date) =>
                                                field.onChange([
                                                    ...field.value,
                                                    date,
                                                ])
                                            }
                                            onRemove={(dateToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (date) =>
                                                            date !==
                                                            dateToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sites"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thuộc địa danh</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            placeholder="Chọn địa danh"
                                            sites={sites}
                                            value={field.value}
                                            onChange={(_id) =>
                                                field.onChange([
                                                    ...field.value,
                                                    _id,
                                                ])
                                            }
                                            onRemove={(idToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (scheduleId) =>
                                                            scheduleId !==
                                                            idToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tong_quan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tổng quan</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Nhập tổng quan"
                                            value={field.value}
                                            onChange={(overview) =>
                                                field.onChange([
                                                    ...field.value,
                                                    overview,
                                                ])
                                            }
                                            onRemove={(overviewToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (overview) =>
                                                            overview !==
                                                            overviewToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quy_dinh"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quy định</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Nhập quy định"
                                            value={field.value}
                                            onChange={(rule) =>
                                                field.onChange([
                                                    ...field.value,
                                                    rule,
                                                ])
                                            }
                                            onRemove={(ruleToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (rule) =>
                                                            rule !==
                                                            ruleToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-10">
                        <Button type="submit">Xác nhận</Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/tours")}
                        >
                            Hủy bỏ
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TourForm;
