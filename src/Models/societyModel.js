import mongoose from "mongoose";

const societySchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        banner: {
            type: String,
            required: true,
        },
        society: {
            type: [String],
            required: true,
        },
        clubs: {
            type: [String],
            required: true,
        }
    },
    { timestamps: true }
);

const SocietyModel = mongoose.model("society", societySchema);
export default SocietyModel;
