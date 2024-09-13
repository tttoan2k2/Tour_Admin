import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;
