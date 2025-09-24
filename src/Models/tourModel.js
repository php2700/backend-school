import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
    {
        studentName: { type: String, required: true },
        parentName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        studentClass: { type: String, required: true },
        studentSection: { type: String, required: true },
        message: { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const TakeTourModel = mongoose.model("takeTour", tourSchema);
export default TakeTourModel
