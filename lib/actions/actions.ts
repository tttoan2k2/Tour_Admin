import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../mongoDB";

export const getTotalSales = async () => {
    await connectToDB();
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
        (acc, order) => acc + order.totalAmount,
        0
    );
    return { totalOrders, totalRevenue };
};

export const getTotalCustomers = async () => {
    await connectToDB();
    const customers = await Customer.find();
    const totalCustomers = customers.length;
    return totalCustomers;
};

export const getSalesPerMonth = async () => {
    await connectToDB();
    const orders = await Order.find();

    const salesPerMonth = orders.reduce((acc, order) => {
        const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
        acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
        // For June
        // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
        return acc;
    }, {});

    const graphData = Array.from({ length: 12 }, (_, i) => {
        const month = new Intl.DateTimeFormat("en-US", {
            month: "short",
        }).format(new Date(0, i));
        // if i === 5 => month = "Jun"
        return { name: month, sales: salesPerMonth[i] || 0 };
    });

    return graphData;
};

export const getCustomersPerMonth = async () => {
    await connectToDB();
    const customers = await Customer.find();

    const customersPerMonth = customers.reduce((acc, customer) => {
        const monthIndex = new Date(customer.createdAt).getMonth(); // 0 for Janruary --> 11 for December
        acc[monthIndex] = (acc[monthIndex] || 0) + 1;
        // For June
        // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
        return acc;
    }, {});

    const graphData = Array.from({ length: 12 }, (_, i) => {
        const month = new Intl.DateTimeFormat("en-US", {
            month: "short",
        }).format(new Date(0, i));
        // if i === 5 => month = "Jun"
        return { name: month, customers: customersPerMonth[i] || 0 };
    });

    return graphData;
};

export const getOrdersPerMonth = async () => {
    await connectToDB();
    const orders = await Order.find();

    const ordersPerMonth = orders.reduce((acc, order) => {
        const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
        acc[monthIndex] = (acc[monthIndex] || 0) + 1;
        // For June
        // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
        return acc;
    }, {});

    const graphData = Array.from({ length: 12 }, (_, i) => {
        const month = new Intl.DateTimeFormat("en-US", {
            month: "short",
        }).format(new Date(0, i));
        // if i === 5 => month = "Jun"
        return { name: month, orderQuantity: ordersPerMonth[i] || 0 };
    });

    return graphData;
};

export const getOrderDetails = async (orderId: string) => {
    const res = await fetch(`http://localhost:3000/api/orders/${orderId}`);
    const { orderDetails, customer } = await res.json();

    return { orderDetails, customer };
};
