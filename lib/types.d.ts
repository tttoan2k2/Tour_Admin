type SiteType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    tours: TourType[];
};

type NewsType = {
    _id: string;
    title: string;
    description: string;
    image: string;
};

type TourType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    sites: [SiteType];
    lich_trinh: [string];
    price: number;
    thoi_gian: [string];
    tong_quan: [string];
    diem_khoi_hanh: string;
    quy_dinh: [string];
    createdAt: Date;
    updatedAt: Date;
};

type OrderColumnType = {
    _id: string;
    customer: string;
    tourName: string;
    tours: number;
    date: string;
    totalAmount: number;
    createdAt: string;
};

type OrderItemType = {
    tour: TourType;
    tourDate: string;
    adultPrice: number;
    adultQuantity: number;
    childrenPrice: number;
    childrenQuantity: number;
    infantPrice: number;
    infantQuantity: number;
};

type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
};
