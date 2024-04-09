type SiteType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    tours: TourType[];
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
