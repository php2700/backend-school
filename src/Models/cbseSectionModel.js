import mongoose from "mongoose";

const cbseSectionSchema = new mongoose.Schema({
    decscription: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const CbseSectionModel = mongoose.model("cbseSection", cbseSectionSchema);
export default CbseSectionModel;
