import mongoose from "mongoose";

const everyChildLearnSchema = new mongoose.Schema(
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
    images: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

const EveryChildLearnModel = mongoose.model("everyChildLearn", everyChildLearnSchema);
export default EveryChildLearnModel;
