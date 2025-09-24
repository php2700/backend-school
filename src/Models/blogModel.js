import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
            trim: true,
        },
        imageText: {
            type: String,
            trim: true,
            required: true,

        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;
