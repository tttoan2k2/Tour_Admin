import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerClerkId: String,
    tours: [
        {
            tour: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tour",
            },
            tourName: String,
            tourDate: String,
            adultPrice: Number,
            adultQuantity: Number,
            childrenPrice: Number,
            childrenQuantity: Number,
            infantPrice: Number,
            infantQuantity: Number,
        },
    ],
    totalAmount: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
