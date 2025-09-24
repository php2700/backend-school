import mongoose from "mongoose"

const contactBannerchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const ContactBannerModel = mongoose.model('contactBanner', contactBannerchema);
export default ContactBannerModel;