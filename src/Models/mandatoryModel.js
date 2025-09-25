import mongoose from "mongoose";

const mandatorySchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required: true,
            trim: true,
        },
        documents1:
        {
            heading: { type: String },
            subHeading: [
                {
                    key: { type: String },
                    value: { type: String }
                }
            ]

        },
        documents2:
        {
            heading: { type: String },
            subHeading: [
                {
                    key: { type: String },
                    image: { type: String }
                }
            ]

        },
        documents3:
        {
            heading: { type: String },
            subHeading: [
                {
                    key: { type: String },
                    value: { type: String },
                    image: { type: String }
                }
            ]

        },
        documents4:
        {
            heading: { type: String },
            subHeading: [
                {
                    key: { type: String },
                    value: { type: String }
                }
            ]

        },
        documents5:
        {
            heading: { type: String },
            subHeading: [
                {
                    key: { type: String },
                    value: { type: String },
                }
            ]

        }
        , documents6:
        {
            heading: { type: String },
            subHeading: [
                {
                    key: { type: String },
                    image: { type: String }
                }
            ]

        }

    },
    { timestamps: true }
);

const MandatoryModel = mongoose.model("mandatory", mandatorySchema);
export default MandatoryModel;
