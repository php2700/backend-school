import mongoose from "mongoose";

const classRoomSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

const ClassRoomModel = mongoose.model("classroom", classRoomSchema);
export default ClassRoomModel;
