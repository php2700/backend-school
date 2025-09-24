import mongoose from "mongoose";

const leaderProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    profileImage: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const LeadersModel = mongoose.model("leaders", leaderProfileSchema);
export default LeadersModel