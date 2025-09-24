
import mongoose from "mongoose";

const shriEducatorSchema = new mongoose.Schema(
    {
    
        description: {
            type: [String],
            required: true,
        },
        banner: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ShriEducatorModel = mongoose.model("shriEducator", shriEducatorSchema);
export default ShriEducatorModel;
