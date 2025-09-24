import admissionEnquiryModel from "../Models/admissionEnquiry.js";
import ContactReqModel from "../Models/contactReqModel.js";
import EnquiryModel from "../Models/enquiryModel.js";
import GalleryModel from "../Models/galleryModel.js";
import TakeTourModel from "../Models/tourModel.js";

export const admisssionEnquiry = async (req, res, next) => {
    try {
        const data = req.body;
        if (req.file) {
            data.photo = `public/uploads/${req.file.filename}`
        }
        const admission = new admissionEnquiryModel(data);
        await admission.save();
        res.status(201).json({ success: true, admission });
    } catch (err) {
        next(err);
    }
};

export const takeTour = async (req, res, next) => {
    try {
        const request = new TakeTourModel(req.body);
        await request.save();
        res.status(201).json({ success: true, data: request });
    } catch (err) {
        next(err)
    }
};

export const contactUs = async (req, res, next) => {
    try {
        const request = new ContactReqModel(req.body);
        await request.save();
        res.status(201).json({ success: true, data: request });
    } catch (err) {
        next(err)
    }
}

export const listGallery = async (req, res, next) => {
    try {
        const images = await GalleryModel.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        next(error);
    }
};

export const enquiry=async(req,res,next)=>{
  try {
    const { firstName, lastName, email, phone, className, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !className) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const enquiry = new EnquiryModel({
      firstName,
      lastName,
      email,
      phone,
      className ,
      message,
    });

    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (error) {
    next(error);
  }
}


