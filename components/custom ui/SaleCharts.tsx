"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
} from "recharts";

const SaleCharts = ({ data }: { data: any }) => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                className="w-full h-full"
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
            >
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />

                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SaleCharts;
