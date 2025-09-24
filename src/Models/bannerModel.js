import mongoose from "mongoose"

const TopBannerSchema = new mongoose.Schema(
    {
        imageUrl: {
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
            type: String,
            required: true,
            trim: true,
           
        },
    },
    { timestamps: true }
);

const BannerModel = mongoose.model('banner', TopBannerSchema);
export default BannerModel;