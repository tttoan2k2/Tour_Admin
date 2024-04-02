import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    image: {
        type: String,
        required: true,
    },
    tours: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour",
        },
    ],
    createAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Site = mongoose.models.Site || mongoose.model("Site", siteSchema);

export default Site;
