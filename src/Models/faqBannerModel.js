import mongoose from "mongoose"

const faqBannerchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const FaqBannerModel = mongoose.model('faqBanner', faqBannerchema);
export default FaqBannerModel;