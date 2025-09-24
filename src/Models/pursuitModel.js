import mongoose from "mongoose";

const pursuitSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            trim: true,
            required: true,
        },
        section: [
            {
                title: {
                    type: String,
                    trim: true,
                    required: true,
                },
                description: {
                    type: [String],
                    trim: true,
                    required: true,
                },
            }
        ]
    },
    { timestamps: true }
);

const PursuitModel = mongoose.model("pursuit", pursuitSchema);
export default PursuitModel;
