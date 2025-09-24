import mongoose from "mongoose"

const aboutSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,

        },
        description: {
            type: [String],
            required: true,
            validate: v => Array.isArray(v) && v.length > 0
        }

    },
    { timestamps: true }
);

const AboutModel = mongoose.model('about', aboutSchema);
export default AboutModel;