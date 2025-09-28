import mongoose from "mongoose"

const activitySchema = new mongoose.Schema(
    {
        image: {
            type: String,
            // required: true,
            trim: true,
        },
        title: {
            type: String,
            // required: true,
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

const ActivityModel = mongoose.model('activity', activitySchema);
export default ActivityModel;