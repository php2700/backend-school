import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const FaqModel= mongoose.model("faq", faqSchema);
export default FaqModel;
