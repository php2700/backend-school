import mongoose from "mongoose";

const sportSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        images: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

const SportModel = mongoose.model("sport", sportSchema);
export default SportModel;
