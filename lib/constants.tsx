import {
    Home,
    Shapes,
    ShoppingBag,
    Calendar,
    UsersRound,
    Newspaper,
} from "lucide-react";

export const navLinks = [
    {
        url: "/",
        icon: <Home />,
        label: "Trang chủ",
    },
    {
        url: "/sites",
        icon: <Shapes />,
        label: "Địa danh",
    },
    {
        url: "/tours",
        icon: <Calendar />,
        label: "Tour du lịch",
    },
    {
        url: "/news",
        icon: <Newspaper />,
        label: "Tin tức",
    },
    {
        url: "/orders",
        icon: <ShoppingBag />,
        label: "Đơn đặt",
    },
    {
        url: "/customers",
        icon: <UsersRound />,
        label: "Khách hàng",
    },
];
