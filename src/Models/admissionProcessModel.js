import mongoose from "mongoose";

const admissionProcessSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },
        academicYear: {
            type: String,
            required: true,
            trim: true,
        },
        section: [
            {
                title: { type: String, required: true, trim: true },
                description: [
                    {
                        text: { type: String, required: true },
                        subpoints: { type: [String], default: [] }
                    }
                ],
            },
        ],
    },
    { timestamps: true }
);

const AdmissionProcessModel = mongoose.model("admissionProcess", admissionProcessSchema);
export default AdmissionProcessModel;
