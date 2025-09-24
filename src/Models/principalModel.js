import mongoose from "mongoose";

const principalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    bannerImage: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const PrincipalModel = mongoose.model("principal", principalSchema);
export default PrincipalModel;
