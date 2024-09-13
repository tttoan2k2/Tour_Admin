"use client";

import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
} from "recharts";

const OrderCharts = ({ data }: { data: any }) => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart className="w-full h-full" data={data}>
                <Bar dataKey="orderQuantity" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default OrderCharts;
