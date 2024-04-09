import mongoose from "mongoose";

const TourScheme = new mongoose.Schema(
    {
        title: String,
        description: String,
        media: [String],
        category: String,
        sites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Site" }],
        lich_trinh: [String],
        price: {
            type: mongoose.Schema.Types.Decimal128,
            get: (v: mongoose.Schema.Types.Decimal128) => {
                return parseFloat(v.toString());
            },
        },
        thoi_gian: [String],
        tong_quan: [String],
        diem_khoi_hanh: String,
        quy_dinh: [String],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { toJSON: { getters: true } }
);

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourScheme);

export default Tour;
