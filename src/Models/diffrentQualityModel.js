import mongoose from "mongoose";

const diffrentQualitySchema = new mongoose.Schema(
    {
        image: {
            type: String,
            trim: true,
            required: true,
        },
        description: { type: [String], default: [] },
    },
    { timestamps: true }
);

const DiffrentQualityModel = mongoose.model("diffrentQuality", diffrentQualitySchema);
export default DiffrentQualityModel;
