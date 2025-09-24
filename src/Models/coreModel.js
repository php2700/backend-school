import mongoose from "mongoose";

const coreSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            trim: true,
            required: true,
        },
        section: [
            {
                title: { type: String, trim: true, required: true },
                description: { type: [String], default: [] },
            },
        ],
    },
    { timestamps: true }
);

const CoreModel = mongoose.model("core", coreSchema);
export default CoreModel;
