import mongoose from "mongoose";

const shriDiffrentiatorSchema = new mongoose.Schema(
    {

        banner: {
            type: String,
            required: true,
        },
        section: [
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
            }
        ]
    },
    { timestamps: true }
);

const ShriDiffrentiatorModel = mongoose.model("shriDiffrentiator", shriDiffrentiatorSchema);
export default ShriDiffrentiatorModel;
