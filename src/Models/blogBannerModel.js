import mongoose from "mongoose"

const blogBannerSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const BlogBannerModel = mongoose.model('blogBanner', blogBannerSchema);
export default BlogBannerModel;