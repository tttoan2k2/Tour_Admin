import { Home, Shapes, ShoppingBag, Calendar, UsersRound } from "lucide-react";

export const navLinks = [
    {
        url: "/",
        icon: <Home />,
        label: "Home",
    },
    {
        url: "/sites",
        icon: <Shapes />,
        label: "Sites",
    },
    {
        url: "/tours",
        icon: <Calendar />,
        label: "Tours",
    },
    {
        url: "/bookings",
        icon: <ShoppingBag />,
        label: "Bookings",
    },
    {
        url: "/customers",
        icon: <UsersRound />,
        label: "Customers",
    },
];
