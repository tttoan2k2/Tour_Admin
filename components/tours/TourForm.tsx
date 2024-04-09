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
    title: z.string().min(2).max(50),
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
                toast.success(`Site ${initiaData ? "updated" : "created"} `);
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
                        Edit Tour
                    </p>
                </div>
            ) : (
                <p className="font-semibold text-[24px] text-black">
                    Create Tour
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
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Title"
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
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
                                <FormLabel>Start At</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Start At"
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
                                <FormLabel>Imgae</FormLabel>
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
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Price"
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
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Category"
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
                                    <FormLabel>Scheldules</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Schedules"
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
                                    <FormLabel>Dates</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Dates"
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
                                    <FormLabel>Sites</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            placeholder="Sites"
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
                                    <FormLabel>Overviews</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Overviews"
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
                                    <FormLabel>Rules</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Rules"
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
                        <Button type="submit">Submit</Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/tours")}
                        >
                            Discard
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default TourForm;
