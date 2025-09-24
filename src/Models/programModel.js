import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        section: [
            {
                heading: {
                    type: String,
                    required: true,
                }, description: {
                    type: String,
                    required: true,
                }
            }
        ]
    },
    { timestamps: true }
);

const ProgramModel = mongoose.model("program", programSchema);
export default ProgramModel;
