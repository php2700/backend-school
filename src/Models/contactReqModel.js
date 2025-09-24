import mongoose from "mongoose";

const ContactRequestSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    county: { type: String },
    message: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ContactReqModel= mongoose.model("contactRequest", ContactRequestSchema);
export default ContactReqModel
