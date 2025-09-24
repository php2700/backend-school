import mongoose from "mongoose";

const leadershipBannerSchema = new mongoose.Schema(
    {
        bannerImage: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const LeadershipBannerModel = mongoose.model("leadershipBanner", leadershipBannerSchema);
export default LeadershipBannerModel;
