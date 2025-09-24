import mongoose from "mongoose";

const environmentSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      type: String, 
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    section: [
      {
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
    ],
  },
  { timestamps: true }
);

const EnvironmentModel = mongoose.model("environment", environmentSchema);
export default EnvironmentModel;
