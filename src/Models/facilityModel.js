import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: true,
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

const FacilityModel = mongoose.model("facility", facilitySchema);
export default FacilityModel;
