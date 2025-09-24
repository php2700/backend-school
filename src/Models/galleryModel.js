import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const GalleryModel = mongoose.model("gallery", gallerySchema);
export default GalleryModel;
