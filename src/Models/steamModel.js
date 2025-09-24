import mongoose from "mongoose";

const steamSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const SteamModel = mongoose.model("steam", steamSchema);
export default SteamModel;
