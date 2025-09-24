import mongoose from "mongoose"

const applicationformBannerchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const ApplicationFormBnnerModel = mongoose.model('applicationformBanner', applicationformBannerchema);
export default ApplicationFormBnnerModel;