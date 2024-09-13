"use client";

import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Legend,
    Bar,
} from "recharts";

const CustomerCharts = ({ data }: { data: any }) => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart className="w-full h-full" data={data}>
                <Bar dataKey="customers" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomerCharts;
