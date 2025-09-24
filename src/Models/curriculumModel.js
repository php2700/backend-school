import mongoose from "mongoose";

const curriculumSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            trim: true,
            required: true,
        },
        methodology_description: {
            type: String,
            trim: true,
            required: true,
        },
        approach_description: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

const CurriculumModel = mongoose.model("curriculum", curriculumSchema);
export default CurriculumModel;
