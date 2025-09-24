import mongoose from "mongoose"

const scheduleBannerchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const ScheduleBannerModel = mongoose.model('scheduleBanner', scheduleBannerchema);
export default ScheduleBannerModel;