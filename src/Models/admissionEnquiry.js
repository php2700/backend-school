import mongoose from "mongoose";

const siblingSchema = new mongoose.Schema({
    name: String,
    class: String,
    schoolName: String
});

const admissionEnquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        dob: { type: Date, required: true },
        nationality: String,
        classForAdmission: String,
        schoolAndClassLastAttended: String,
        lastSchoolAffiliation: String,
        previousClassResult: String,

        motherName: String,
        motherDob: Date,
        motherEducation: String,
        motherEmail: String,
        motherMobile: String,

        motherOccupation: String,
        motherDesignation: String,
        motherOrganization: String,
        motherOfficeAddress: String,

        // Father Info
        fatherName: String,
        fatherDob: Date,
        fatherEducation: String,
        fatherEmail: String,
        fatherMobile: String,
        fatherOccupation: String,
        fatherDesignation: String,
        fatherOrganization: String,
        fatherOfficeAddress: String,


        residentialAddress: String,
        phoneNumber: String,
        maritalStatus: String,

        // Siblings
        siblings: [siblingSchema],

        motherTongue: String,
        photo: String,
        underTaking: String,
        isAccept: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const admissionEnquiryModel = mongoose.model("admissionEnquiry", admissionEnquirySchema);
export default admissionEnquiryModel;
