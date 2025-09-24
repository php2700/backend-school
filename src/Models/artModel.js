import mongoose from "mongoose"

const artSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: [String],
            required: true,
            trim: true,

        },
    },
    { timestamps: true }
);

const ArtModel = mongoose.model('art', artSchema);
export default ArtModel;