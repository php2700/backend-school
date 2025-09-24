import mongoose from "mongoose";

const welcomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
    },
    { timestamps: true }
);

const WelcomeModel = mongoose.model("welcome", welcomeSchema);
export default WelcomeModel;
