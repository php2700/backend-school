import mongoose from "mongoose";

const studentExperienceSchema = new mongoose.Schema(
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

const StudentExperienceModel = mongoose.model("studentExperience", studentExperienceSchema);
export default StudentExperienceModel;
