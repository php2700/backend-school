import mongoose from "mongoose";

const disclosureSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            trim: true,
            required: true,
        },
        section: [
            {
                title: string
            },
            {
                content: [
                    {
                        question: {
                            type: string
                        },
                        answer: {
                            type: String
                        }
                    }
                ]
            }
        ]
    },
    { timestamps: true }
);

const DisclosureModel = mongoose.model("disclosure", disclosureSchema);
export default DisclosureModel;
