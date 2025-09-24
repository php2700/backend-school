import mongoose from "mongoose";

const visionSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    vision: {
      type: [String],
      default: [],
    },
    mission: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const VisionModel = mongoose.model("vision", visionSchema);
export default VisionModel;
