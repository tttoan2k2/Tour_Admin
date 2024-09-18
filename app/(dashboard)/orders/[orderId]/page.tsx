"use client";

import Loader from "@/components/custom ui/Loader";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState<any>();
    const [customerData, setCustomerData] = useState<any>();

    let componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Invoice",
        onPrintError: () => alert("Có lỗi! Vui lòng thử lại."),
    });

    const getData = async () => {
        try {
            const res = await fetch(`/api/orders/${params.orderId}`, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const { orderDetails, customer } = await res.json();

            setOrderData(orderDetails);
            setCustomerData(customer);
            setLoading(false);
        } catch (err) {
            console.log("[site_details_GET]", err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(orderData?.tours);

    return loading ? (
        <Loader />
    ) : (
        <div className=" p-10 gap-5" ref={componentRef}>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                    <p className="text-[24px] font-semibold text-black">
                        Order ID #{orderData?._id}
                    </p>
                    <p className="text-[18px] text-gray-500">
                        On {orderData?.createdAt}
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[24px] font-semibold text-black">
                        {orderData?.totalAmount.toLocaleString("vi-VN")}đ
                    </p>
                    <p className="text-[18px] text-gray-500">Total Amount</p>
                </div>
            </div>
            <Separator className="bg-gray-500 mt-4 mb-7" />
            <div className="">
                <p className="text-[24px] font-semibold text-black">
                    Thông tin khách hàng
                </p>
                <div className="mt-[20px] flex flex-col gap-3 text-black ml-[30px]">
                    <p className="mb-2">
                        <span className="font-semibold text-[18px]">
                            Họ và tên:
                        </span>{" "}
                        <span className=" text-[16px] capitalize">
                            {customerData?.name}
                        </span>
                    </p>

                    <p className="mb-2">
                        <span className="font-semibold text-[18px]">
                            Email:
                        </span>{" "}
                        <span className=" text-[16px] capitalize">
                            {customerData?.email}
                        </span>
                    </p>
                </div>
            </div>

            <div className="">
                <p className="text-[24px] font-semibold text-black mt-[30px]">
                    Thông tin Tour đã đặt
                </p>
                <div className="mt-[20px] flex flex-col gap-3 text-black ml-[30px]">
                    <p className="mb-2">
                        <span className="font-semibold text-[18px]">Tour:</span>{" "}
                        <span className=" text-[16px] capitalize">
                            {orderData?.tours[0].tourName}
                        </span>
                    </p>

                    <p className="mb-2">
                        <span className="font-semibold text-[18px]">
                            Ngày khởi hành:
                        </span>{" "}
                        <span className=" text-[16px] capitalize">
                            {orderData?.tours[0].tourDate}
                        </span>
                    </p>

                    <p className="mb-2">
                        <span className="font-semibold text-[18px]">
                            Khởi hành từ:
                        </span>{" "}
                        <span className=" text-[16px] capitalize">
                            {orderData?.tours[0].tour.diem_khoi_hanh}
                        </span>
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <div className="flex-1 p-4 border border-zinc-200 rounded-md flex flex-col justify-between text-black ml-[20px] mt-[20px]">
                        <div className="">
                            <h2 className="font-bold mb-6 text-lg lg:text-xl">
                                Vé người lớn
                            </h2>
                            <div className="mb-2">
                                <span className="font-semibold">
                                    Số lượng:{" "}
                                </span>{" "}
                                <span className=" text-sm">
                                    {orderData.tours[0].adultQuantity}
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold">Đơn giá: </span>{" "}
                                <span className=" text-sm">
                                    {orderData.tours[0].tour.price.toLocaleString(
                                        "vi-VN"
                                    )}
                                    đ
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="text-lg">
                                <span className="font-semibold">Tổng:</span>{" "}
                                <span className="">
                                    {orderData.tours[0].adultPrice.toLocaleString(
                                        "vi-VN"
                                    )}
                                    đ
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex-1 p-4 border border-zinc-200 rounded-md flex flex-col justify-between text-black ml-[20px] mt-[20px]">
                        <div className="">
                            <h2 className="font-bold mb-6 text-lg lg:text-xl">
                                Vé học sinh
                            </h2>
                            <div className="mb-2">
                                <span className="font-semibold">
                                    Số lượng:{" "}
                                </span>{" "}
                                <span className=" text-sm">
                                    {orderData.tours[0].childrenQuantity}
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold">Đơn giá: </span>{" "}
                                <span className=" text-sm">
                                    {(
                                        orderData.tours[0].tour.price * 0.9
                                    ).toLocaleString("vi-VN")}
                                    đ
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="text-lg">
                                <span className="font-semibold">Tổng:</span>{" "}
                                <span className="">
                                    {orderData.tours[0].childrenPrice.toLocaleString(
                                        "vi-VN"
                                    )}
                                    đ
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex-1 p-4 border border-zinc-200 rounded-md flex flex-col justify-between text-black ml-[20px] mt-[20px]">
                        <div className="">
                            <h2 className="font-bold mb-6 text-lg lg:text-xl">
                                Vé trẻ em
                            </h2>
                            <div className="mb-2">
                                <span className="font-semibold">
                                    Số lượng:{" "}
                                </span>{" "}
                                <span className=" text-sm">
                                    {orderData.tours[0].infantQuantity}
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold">Đơn giá: </span>{" "}
                                <span className=" text-sm">
                                    {(
                                        orderData.tours[0].tour.price * 0.5
                                    ).toLocaleString("vi-VN")}
                                    đ
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="text-lg">
                                <span className="font-semibold">Tổng:</span>{" "}
                                <span className="">
                                    {orderData.tours[0].infantPrice.toLocaleString(
                                        "vi-VN"
                                    )}
                                    đ
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>

                <p className="text-[20px] text-center text-black mt-[50px] font-semibold">
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                </p>
            </div>

            <div className="print:hidden mt-[20px]">
                <Button onClick={handlePrint}>In hóa đơn</Button>
            </div>
        </div>
    );
};

export default OrderDetails;

export const dynamic = "force-dynamic";
