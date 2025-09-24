import mongoose from "mongoose";

const classRoomBannerSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ClassRoomBannerModel = mongoose.model("classroomBanner", classRoomBannerSchema);
export default ClassRoomBannerModel;
