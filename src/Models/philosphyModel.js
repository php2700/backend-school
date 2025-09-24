import mongoose from "mongoose";

const philosophySchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    section: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const PhilosophyModel = mongoose.model("philosophy", philosophySchema);
export default PhilosophyModel;
