import CustomerCharts from "@/components/custom ui/CustomerCharts";
import OrderCharts from "@/components/custom ui/OrderCharts";
import SaleCharts from "@/components/custom ui/SaleCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    getCustomersPerMonth,
    getOrdersPerMonth,
    getSalesPerMonth,
    getTotalCustomers,
    getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
    const totalRevenue = await getTotalSales().then(
        (data) => data.totalRevenue
    );
    const totalOrders = await getTotalSales().then((data) => data.totalOrders);
    const totalCustomers = await getTotalCustomers();

    const graphData = await getSalesPerMonth();
    const customerLineData = await getCustomersPerMonth();
    const orderQuantity = await getOrdersPerMonth();

    return (
        <div className="px-8 py-10">
            <p className="font-semibold text-[24px] text-black">Trang chủ</p>
            <Separator className="bg-gray-500 mt-4 mb-7" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Tổng doanh thu</CardTitle>
                        <CircleDollarSign className="max-sm:hidden" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-[20px] font-medium">
                            {totalRevenue.toLocaleString("vi-VN")}đ
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Tổng số đơn đặt</CardTitle>
                        <ShoppingBag className="max-sm:hidden" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-[20px] font-medium">{totalOrders}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Tổng số khách hàng</CardTitle>
                        <UserRound className="max-sm:hidden" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-[20px] font-medium">
                            {totalCustomers}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Biểu đồ cột doanh thu</CardTitle>
                </CardHeader>
                <CardContent>
                    <SaleCharts data={graphData} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-5 w-full">
                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle>Biểu đồ cột số khách hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CustomerCharts data={customerLineData} />
                    </CardContent>
                </Card>

                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle>Biểu đồ cột số đơn đã đặt</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrderCharts data={orderQuantity} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
