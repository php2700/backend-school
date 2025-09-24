import mongoose from "mongoose"

const galleryBannerchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const GalleryBannerModel = mongoose.model('galleryBanner', galleryBannerchema);
export default GalleryBannerModel;