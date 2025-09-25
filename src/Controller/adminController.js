import AdminModel from "../Models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ContactReqModel from "../Models/contactReqModel.js";
import admissionEnquiryModel from "../Models/admissionEnquiry.js";
import TakeTourModel from "../Models/tourModel.js";
import BannerModel from "../Models/bannerModel.js";
import fs from "fs";
import path from "path";
import WelcomeModel from "../Models/welcomeModel.js";
import EveryChildLearnModel from "../Models/everyChildLearnModel.js";
import GalleryModel from "../Models/galleryModel.js";
import CbseSectionModel from "../Models/cbseSectionModel.js";
import SteamModel from "../Models/steamModel.js";
import StudentExperienceModel from "../Models/studentExperienceModel.js";
import FaqModel from "../Models/faqModel.js";
import EnquiryModel from "../Models/enquiryModel.js";
import ActivityModel from "../Models/activityModel.js";
import ProgramModel from "../Models/programModel.js";
import AboutModel from "../Models/aboutModel.js";
import LeadershipBannerModel from "../Models/leadershipModel.js";
import LeadersModel from "../Models/leadersModel.js";
import PrincipalModel from "../Models/principalModel.js";
import VisionModel from "../Models/visionModel.js";
import CoreModel from "../Models/coreModel.js";
import DiffrentQualityModel from "../Models/diffrentQualityModel.js";
import BlogBannerModel from "../Models/blogBannerModel.js";
import BlogModel from "../Models/blogModel.js";
import ShriDiffrentiatorModel from "../Models/shriDiffrentiatorModel.js";
import ShriEducatorModel from "../Models/shriEducatorModel.js";
import FacilityModel from "../Models/facilityModel.js";
import CurriculumModel from "../Models/curriculumModel.js";
import PursuitModel from "../Models/pursuitModel.js";
import ArtModel from "../Models/artModel.js";
import SocietyModel from "../Models/societyModel.js";
import ClassRoomModel from "../Models/classRoomModel.js";
import ClassRoomBannerModel from "../Models/classRoomBannerModel.js";
import EnvironmentModel from "../Models/environmentModel.js";
import FaqBannerModel from "../Models/faqBannerModel.js";
import ApplicationFormBnnerModel from "../Models/applicationformBannerModel.js";
import ScheduleBannerModel from "../Models/scheduleModel.js";
import ContactBannerModel from "../Models/contactBannerModel.js";
import GalleryBannerModel from "../Models/galleryBabberModel.js";
import AdmissionProcessModel from "../Models/admissionProcessModel.js";
import PhilosophyModel from "../Models/philosphyModel.js";
import SportModel from "../Models/sportModel.js";
import MandatoryModel from "../Models/mandatoryModel.js";

const checkPassword = async (password, hashPassword) => {
  const verifyPassword = await bcrypt.compare(password, hashPassword);
  if (verifyPassword) return verifyPassword;
  throw new Error('Email and Password wrong')
}

const generateToken = async (userData) => {
  const token = await jwt.sign({ id: userData?.id, role: userData?.role }, process.env.JWT_SECRET_KEY, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRE_TIME });
  if (token) return token;
  throw new Error('something went wrong')

}

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req?.body;

    const isExistEmail = await AdminModel.findOne({ email: email });
    if (!isExistEmail) return res.status(404).json({ success: false, message: 'email not valid' })

    await checkPassword(password, isExistEmail?.password);
    const token = await generateToken(isExistEmail);

    const userData = {
      _id: isExistEmail?._id,
      role: isExistEmail?.role,
      token: token
    }
    return res.status(200).json({ message: 'login-successfully', data: userData })
  } catch (error) {
    next(error)
  }
}


export const admissionEnqList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await admissionEnquiryModel.countDocuments();
    const data = await admissionEnquiryModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })

    return res.json({
      success: true,
      data: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err)
  }
}

export const tourList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await TakeTourModel.countDocuments();

    const data = await
      TakeTourModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })

    return res.json({
      success: true,
      data: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err)
  }
}


export const contactReqList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    const total = await ContactReqModel.countDocuments();
    const data = await
      ContactReqModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
    return res.json({
      success: true,
      data: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err)
  }
}

export const addTopBanner = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    let existingBanner = await BannerModel.findOne();

    let imageUrl = existingBanner?.imageUrl || null;

    if (req.file) {
      if (existingBanner?.imageUrl) {
        const oldImagePath = path.join(process.cwd(), existingBanner.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `public/uploads/${req.file.filename}`;
    }

    if (existingBanner) {
      existingBanner.title = title;
      existingBanner.description = description;
      existingBanner.imageUrl = imageUrl;

      await existingBanner.save();
      return res.status(200).json({
        message: "Banner updated successfully",
        banner: existingBanner,
      });
    } else {
      const newBanner = await BannerModel.create({
        title,
        description,
        imageUrl,
      });

      return res.status(201).json({
        message: "Banner created successfully",
        banner: newBanner,
      });
    }
  } catch (error) {
    next(error);
  }
};


export const getBanner = async (req, res, next) => {
  try {
    const getBannerData = await BannerModel.findOne();
    if (getBannerData) {
      return res.status(200).json({ success: true, getBannerData })
    }
    return res.status(404).json({ success: false, message: 'no banner found' })
  } catch (error) {
    next(error)
  }
}

export const upsertWelcome = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    let existingWelcome = await WelcomeModel.findOne();

    if (existingWelcome) {
      existingWelcome.title = title;
      existingWelcome.description = description;
      await existingWelcome.save();
      return res.status(200).json({
        message: "Welcome content updated successfully",
        welcome: existingWelcome,
      });
    } else {
      const newWelcome = await WelcomeModel.create({
        title,
        description,
      });
      return res.status(201).json({
        message: "Welcome content created successfully",
        welcome: newWelcome,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getWelcome = async (req, res, next) => {
  try {
    const welcome = await WelcomeModel.findOne();
    if (!welcome) return res.status(404).json({ message: "Welcome content not found" });
    res.status(200).json(welcome);
  } catch (error) {
    next(error);
  }
}

export const upsertEveryChildLearn = async (req, res, next) => {
  try {
    const { title, description, removeImages } = req.body;
    let existing = await EveryChildLearnModel.findOne();
    let images = existing?.images || [];

    if (removeImages && Array.isArray(removeImages) && removeImages.length > 0) {
      removeImages.forEach((imgPath) => {
        const fullPath = path.join(process.cwd(), imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath); // delete file
      });
      images = images.filter((img) => !removeImages.includes(img)); // remove from array
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => `public/uploads/${file.filename}`);
      images = [...images, ...newImages];
    }

    if (existing) {
      existing.title = title;
      existing.description = description;
      existing.images = images;

      await existing.save();
      return res.status(200).json({
        message: "Section updated successfully",
        section: existing,
      });
    } else {
      const newSection = await EveryChildLearnModel.create({
        title,
        description,
        images,
      });

      return res.status(201).json({
        message: "Section created successfully",
        section: newSection,
      });
    }
  } catch (error) {
    console.log(error, "Error in upsertEveryChildLearn");
    next(error);
  }
};


export const getEveryChildren = async (req, res, next) => {
  try {
    const section = await EveryChildLearnModel.findOne();
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.status(200).json(section);
  } catch (error) {
    next(error);
  }
}

export const addGallery = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const gallery = new GalleryModel({
      image: `public/uploads/${req.file.filename}`
    });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    next(error);
  }
}


export const getGalleryList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await GalleryModel.countDocuments();

    const data = await
      GalleryModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })

    return res.json({
      success: true,
      data: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};


export const editGallery = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const gallery = await GalleryModel.findById(_id);
    if (!gallery) return res.status(404).json({ message: "Gallery image not found" });

    if (gallery.image) {
      const oldPath = path.join(process.cwd(), gallery.image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    gallery.image = `public/uploads/${req.file.filename}`
    await gallery.save();

    res.json(gallery);
  } catch (error) {
    next(error);
  }
};


export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gallery = await GalleryModel.findById(id);
    if (!gallery) return res.status(404).json({ message: "Gallery image not found" });
    if (gallery.image && fs.existsSync(gallery?.image)) {
      fs.unlinkSync(gallery.image);
    }
    await GalleryModel.findByIdAndDelete({ _id: id });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const getGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Gallery ID is required" });

    const gallery = await GalleryModel.findById(id);
    if (!gallery) return res.status(404).json({ message: "Gallery image not found" });

    res.json(gallery);
  } catch (error) {
    next(error);
  }
};

export const upsertCbseSection = async (req, res, next) => {
  try {
    const { decscription } = req.body;
    if (!decscription) return res.status(400).json({ message: "Description is required" });

    let description = await CbseSectionModel.findOne();

    if (description) {
      description.decscription = decscription;
      await description.save();
    } else {
      description = new CbseSectionModel({ decscription });
      await description.save();
    }
    res.status(200).json(description);
  } catch (error) {
    next(error);
  }
}

export const getCbseSection = async (req, res, next) => {
  try {
    const description = await CbseSectionModel.findOne();
    if (!description) return res.status(404).json({ message: "No description found" });
    res.status(200).json(description);
  } catch (error) {
    next(error);
  }
};


export const addsteam = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image is required" });
    if (!title || !description) return res.status(400).json({ message: "Title and description are required" });

    const steam = new SteamModel({
      title,
      description,
      image: `public/uploads/${req.file.filename}`
    });

    await steam.save();
    res.status(201).json(steam);
  } catch (error) {
    next(error);
  }
};

export const getSteamById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const steam = await SteamModel.findById(id);
    if (!steam) return res.status(404).json({ message: "Steam not found" });

    res.json(steam);
  } catch (error) {
    next(error);
  }
};


export const steamList = async (req, res, next) => {
  try {
    const steams = await SteamModel.find().sort({ createdAt: -1 });
    res.json(steams);
  } catch (error) {
    next(error);
  }
};


export const editSteam = async (req, res, next) => {
  try {
    const { _id, title, description } = req.body;
    if (!_id) return res.status(400).json({ message: "_ID is required" });

    const steam = await SteamModel.findById(_id);
    if (!steam) return res.status(404).json({ message: "Steam not found" });

    if (req.file) {
      if (steam.image) {
        const oldPath = path.join(process.cwd(), steam.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      steam.image = `public/uploads/${req.file.filename}`;
    }

    if (title) steam.title = title;
    if (description) steam.description = description;

    await steam.save();
    res.json(steam);
  } catch (error) {
    next(error);
  }
};


export const addStudentExperience = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image is required" });
    if (!title || !description) return res.status(400).json({ message: "Title and description are required" });

    const studentExperience = new StudentExperienceModel({
      title,
      description,
      image: `public/uploads/${req.file.filename}`
    });

    await studentExperience.save();
    res.status(201).json(studentExperience);
  } catch (error) {
    next(error);
  }
};

export const getStudentExperienceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentExperience = await StudentExperienceModel.findById(id);
    if (!studentExperience) return res.status(404).json({ message: "studentExperience not found" });

    res.json(studentExperience);
  } catch (error) {
    next(error);
  }
};


export const getStudentExperience = async (req, res, next) => {
  try {
    const studentExperience = await StudentExperienceModel.find().sort({ createdAt: -1 });
    res.json(studentExperience);
  } catch (error) {
    next(error);
  }
};


export const editStudentExperience = async (req, res, next) => {
  try {
    const { _id, title, description } = req.body;
    if (!_id) return res.status(400).json({ message: "_ID is required" });

    const studentExperience = await StudentExperienceModel.findById(_id);
    if (!studentExperience) return res.status(404).json({ message: "studentExperience not found" });

    if (req.file) {
      if (studentExperience.image) {
        const oldPath = path.join(process.cwd(), studentExperience.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      studentExperience.image = `public/uploads/${req.file.filename}`;
    }

    if (title) studentExperience.title = title;
    if (description) studentExperience.description = description;

    await studentExperience.save();
    res.json(studentExperience);
  } catch (error) {
    next(error);
  }
};


export const addFaq = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: "Title and description are required" });

    const faq = new FaqModel({
      title,
      description,
    });

    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    next(error);
  }
};

export const getFaqById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const faq = await FaqModel.findById(id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    res.json(faq);
  } catch (error) {
    next(error);
  }
};

export const getFaq = async (req, res, next) => {
  try {
    const faqs = await FaqModel.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    next(error);
  }
};

export const editFaq = async (req, res, next) => {
  try {
    const { _id, title, description } = req.body;
    if (!_id) return res.status(400).json({ message: "ID is required" });

    const faq = await FaqModel.findById(_id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    if (title) faq.title = title;
    if (description) faq.description = description;

    await faq.save();
    res.json(faq);
  } catch (error) {
    next(error);
  }
};

export const getEnquiryList = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const enquiries = await EnquiryModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await EnquiryModel.countDocuments();
    return res.json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addActivity = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const activity = new ActivityModel({
      image: `public/uploads/${req.file.filename}`,
      title,
      description,
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
};


export const editActivity = async (req, res, next) => {
  try {
    const { _id, title, description } = req.body;
    if (!_id) return res.status(400).json({ message: "ID is required" });

    const activity = await ActivityModel.findById(_id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    if (title) activity.title = title;
    if (description) activity.description = description;

    if (req.file) {
      if (activity.image) {
        const oldPath = path.join(process.cwd(), activity.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      activity.image = `public/uploads/${req.file.filename}`;
    }

    await activity.save();
    res.json(activity);
  } catch (error) {
    next(error);
  }
};


export const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await ActivityModel.findById(id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    res.json(activity);
  } catch (error) {
    next(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
};


export const addProgram = async (req, res, next) => {
  try {
    const { title, section } = req.body;

    const program = new ProgramModel({ title, section });
    await program.save();

    res.status(201).json({ message: "Program created successfully", program });
  } catch (error) {
    next(error);
  }
};

export const editProgram = async (req, res, next) => {
  try {
    const { _id, title, section } = req.body;
    if (!_id) return res.status(400).json({ message: "ID is required" });

    const program = await ProgramModel.findById(_id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (title) program.title = title;
    if (section) program.section = section;

    await program.save();
    res.json({ message: "Program updated successfully", program });
  } catch (error) {
    next(error);
  }
};

export const programList = async (req, res, next) => {
  try {
    const programs = await ProgramModel.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    next(error);
  }
};

export const getProgramById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await ProgramModel.findById(id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    res.json(program);
  } catch (error) {
    next(error);
  }
};



export const upsertAbout = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    let imagePath;

    if (req.file) {
      imagePath = `public/uploads/${req.file.filename}`;
    }

    let about = await AboutModel.findOne();

    if (!about) {
      about = new AboutModel({
        title,
        description: Array.isArray(description) ? description : [description],
        image: imagePath,
      });
    } else {
      if (title) about.title = title;
      if (description) {
        about.description = Array.isArray(description)
          ? description
          : [description];
      }

      if (req.file) {
        if (about?.image) {
          const oldPath = path.join(process.cwd(), about.image);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        about.image = imagePath;
      }
    }
    await about.save();
    res.json({ message: "About saved successfully", data: about });
  } catch (error) {
    next(error);
  }
};


export const getAbout = async (req, res, next) => {
  try {
    const about = await AboutModel.findOne();
    if (!about) {
      return res.status(404).json({ message: "No About data found" });
    }
    res.json(about);
  } catch (error) {
    next(error);
  }
};

export const upsertLeadershipBanner = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const imagePath = `public/uploads/${req.file.filename}`;
    let banner = await LeadershipBannerModel.findOne();

    if (!banner) {

      banner = new LeadershipBannerModel({
        bannerImage: imagePath,
      });
    } else {
      if (banner.bannerImage) {
        const oldPath = path.join(process.cwd(), banner.bannerImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      banner.bannerImage = imagePath;
    }
    await banner.save();
    res.json({ message: "Leadership banner saved successfully", data: banner });
  } catch (error) {
    next(error);
  }
};

export const getLeadershipBanner = async (req, res, next) => {
  try {
    const banner = await LeadershipBannerModel.findOne();
    if (!banner) {
      return res.status(404).json({ message: "No leadership banner found" });
    }
    res.json(banner);
  } catch (error) {
    next(error);
  }
};

export const getLeadersById = async (req, res, next) => {
  try {
    const leader = await LeadersModel.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ message: "Leader profile not found" });
    }
    res.json({ success: true, data: leader });
  } catch (error) {
    next(error);
  }
}

export const getLeaders = async (req, res, next) => {
  try {
    const leaders = await LeadersModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leaders });
  } catch (error) {
    next(error);
  }
}

export const addLeaders = async (req, res, next) => {
  try {
    const { name, designation, message } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    const imagePath = `public/uploads/${req.file.filename}`;

    const newLeader = new LeadersModel({
      name,
      designation,
      message,
      profileImage: imagePath,
    });

    await newLeader.save();
    res.status(201).json({ message: "Leader added successfully", data: newLeader });
  } catch (error) {
    next(error);
  }
}


export const editLeaders = async (req, res, next) => {
  try {
    const { name, designation, message, _id } = req.body;

    const leader = await LeadersModel.findById(_id);
    if (!leader) {
      return res.status(404).json({ message: "Leader not found" });
    }

    if (req.file) {
      if (leader.profileImage) {
        const oldPath = path.join(process.cwd(), leader.profileImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      leader.profileImage = `public/uploads/${req.file.filename}`;
    }

    leader.name = name;
    leader.designation = designation;
    leader.message = message;
    await leader.save();
    res.json({ message: "Leader updated successfully", data: leader });
  } catch (error) {
    next(error);
  }
}


export const upsertPrincipal = async (req, res, next) => {
  try {
    const { name, message } = req.body;

    let principal = await PrincipalModel.findOne();

    if (!principal) {
      if (!req.files || !req.files.image || !req.files.bannerImage) {
        return res.status(400).json({ message: "Both image and bannerImage are required" });
      }
      principal = new PrincipalModel({
        name,
        message,
        image: `public/uploads/${req.files.image[0].filename}`,
        bannerImage: `public/uploads/${req.files.bannerImage[0].filename}`,
      });
    } else {
      if (req.files && req.files.image) {
        if (principal.image && fs.existsSync(path.join(process.cwd(), principal.image))) {
          fs.unlinkSync(path.join(process.cwd(), principal.image));
        }
        principal.image = `public/uploads/${req.files.image[0].filename}`;
      }
      if (req.files && req.files.bannerImage) {
        if (principal.bannerImage && fs.existsSync(path.join(process.cwd(), principal.bannerImage))) {
          fs.unlinkSync(path.join(process.cwd(), principal.bannerImage));
        }
        principal.bannerImage = `public/uploads/${req.files.bannerImage[0].filename}`;
      }

      if (name) principal.name = name;
      if (message) principal.message = message;

    }
    await principal.save();
    res.json({ message: "Principal saved successfully", data: principal });
  } catch (error) {
    next(error);
  }
};

export const getPrincipals = async (req, res, next) => {
  try {
    const principals = await PrincipalModel.findOne();
    res.json({ success: true, data: principals });
  } catch (error) {
    next(error);
  }
};


export const upsertVision = async (req, res, next) => {
  try {
    const { vision, mission } = req.body;

    let visionDoc = await VisionModel.findOne();

    if (!visionDoc) {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required for creating new vision" });
      }
      visionDoc = new VisionModel({
        image: `public/uploads/${req.file.filename}`,
        vision: vision || [],
        mission: mission || [],
      });
    } else {
      if (req.file) {
        if (visionDoc.image && fs.existsSync(path.join(process.cwd(), visionDoc.image))) {
          fs.unlinkSync(path.join(process.cwd(), visionDoc.image));
        }
        visionDoc.image = `public/uploads/${req.file.filename}`;
      }
      visionDoc.vision = vision || [];
      visionDoc.mission = mission || [];
    }

    await visionDoc.save();
    res.json({ message: "Vision updated successfully", data: visionDoc });
  } catch (error) {
    next(error);
  }
};


export const getVision = async (req, res, next) => {
  try {
    const visionDoc = await VisionModel.findOne();
    if (!visionDoc) {
      return res.status(404).json({ message: "Vision not found" });
    }
    res.json({ success: true, data: visionDoc });
  } catch (error) {
    next(error);
  }
};


export const upsertCore = async (req, res, next) => {
  try {
    const { section } = req.body;
    let imagePath;

    if (req.file) {
      imagePath = `public/uploads/${req.file.filename}`;
    }
  let sectionData;
 if (section) {
      try {
        sectionData = typeof section === "string" ? JSON.parse(section) : section;
      } catch (err) {
        return res.status(400).json({ message: "Invalid section format" });
      }
    }

    let coreDoc = await CoreModel.findOne();

    if (!coreDoc) {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required for creating new section" });
      }

      coreDoc = new CoreModel({
        image: imagePath,
        section: sectionData,
      });
    } else {
      if (imagePath) {
        if (coreDoc.image && fs.existsSync(path.join(process.cwd(), coreDoc.image))) {
          fs.unlinkSync(path.join(process.cwd(), coreDoc.image));
        }
        coreDoc.image = imagePath;
      }

      if (sectionData?.length) {
        coreDoc.section = sectionData;
      }
    }
    await coreDoc.save();
    res.json({ message: "Section saved successfully", data: coreDoc });
  } catch (error) {
    next(error);
  }
};

export const getCore = async (req, res, next) => {
  try {
    const coreDoc = await CoreModel.findOne();
    if (!coreDoc) {
      return res.status(404).json({ message: "core data not found" });
    }
    res.json({ success: true, data: coreDoc });
  } catch (error) {
    next(error);
  }
};

export const upsertDifferentQuality = async (req, res, next) => {
  try {
    const { description } = req.body;
    let imagePath;

    if (req.file) {
      imagePath = `public/uploads/${req.file.filename}`;
    }

    let qualityDoc = await DiffrentQualityModel.findOne();

    if (!qualityDoc) {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required for creating new quality" });
      }

      qualityDoc = new DiffrentQualityModel({
        image: imagePath,
        description: Array.isArray(description) ? description : [description],
      });
    } else {
      if (imagePath) {
        if (qualityDoc.image && fs.existsSync(path.join(process.cwd(), qualityDoc.image))) {
          fs.unlinkSync(path.join(process.cwd(), qualityDoc.image));
        }
        qualityDoc.image = imagePath;
      }

      if (description) {
        qualityDoc.description = Array.isArray(description)
          ? description
          : qualityDoc.description;
      }
    }

    await qualityDoc.save();
    res.json({ message: "Different Quality saved successfully", data: qualityDoc });
  } catch (error) {
    next(error);
  }
};

export const getDifferentQuality = async (req, res, next) => {
  try {
    const qualityDoc = await DiffrentQualityModel.findOne();
    if (!qualityDoc) {
      return res.status(404).json({ message: "Different Quality not found" });
    }
    res.json({ success: true, data: qualityDoc });
  } catch (error) {
    next(error);
  }
};

export const upsertBlogBanner = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const imagePath = `public/uploads/${req.file.filename}`;
    let bannerDoc = await BlogBannerModel.findOne();

    if (!bannerDoc) {
      bannerDoc = new BlogBannerModel({
        banner: imagePath,
      });
    } else {
      if (bannerDoc.banner && fs.existsSync(path.join(process.cwd(), bannerDoc.banner))) {
        fs.unlinkSync(path.join(process.cwd(), bannerDoc.banner));
      }
      bannerDoc.banner = imagePath;
    }

    await bannerDoc.save();
    res.json({ message: "Blog banner saved successfully", data: bannerDoc });
  } catch (error) {
    next(error);
  }
};

export const getBlogBanner = async (req, res, next) => {
  try {
    const bannerDoc = await BlogBannerModel.findOne();
    if (!bannerDoc) {
      return res.status(404).json({ message: "Blog banner not found" });
    }
    res.json({ success: true, data: bannerDoc });
  } catch (error) {
    next(error);
  }
};



export const addBlog = async (req, res, next) => {
  try {
    const { imageText, title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Blog image is required" });
    }

    const imagePath = `public/uploads/${req.file.filename}`;

    const newBlog = new BlogModel({
      image: imagePath,
      imageText: imageText || "",
      title: title || "",
      description: description || "",
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", data: newBlog });
  } catch (error) {
    next(error);
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { _id, imageText, title, description } = req.body;

    const blog = await BlogModel.findById(_id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.file) {
      if (blog.image && fs.existsSync(path.join(process.cwd(), blog.image))) {
        fs.unlinkSync(path.join(process.cwd(), blog.image));
      }
      blog.image = `public/uploads/${req.file.filename}`;
    }

    if (imageText) blog.imageText = imageText;
    if (title) blog.title = title;
    if (description) blog.description = description;

    await blog.save();
    res.json({ message: "Blog updated successfully", data: blog });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const upsertShriDifferentiator = async (req, res, next) => {
  try {
    const { section } = req.body;
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }
    let sectionData = [];
    if (section) {
      try {
        sectionData = typeof section === "string" ? JSON.parse(section) : section;
      } catch (err) {
        return res.status(400).json({ message: "Invalid section format" });
      }
    }
    let differentiatorDoc = await ShriDiffrentiatorModel.findOne();

    if (!differentiatorDoc) {
      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required for creating new data" });
      }
      differentiatorDoc = new ShriDiffrentiatorModel({
        banner: bannerPath,
        section: sectionData,
      });
    } else {
      if (bannerPath) {
        if (differentiatorDoc.banner && fs.existsSync(path.join(process.cwd(), differentiatorDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), differentiatorDoc.banner));
        }
        differentiatorDoc.banner = bannerPath;
      }

      if (sectionData?.length) {
        differentiatorDoc.section = sectionData;
      }
    }

    await differentiatorDoc.save();
    res.json({ message: "Shri Differentiator saved successfully", data: differentiatorDoc });
  } catch (error) {
    next(error);
  }
};

export const getShriDifferentiator = async (req, res, next) => {
  try {
    const differentiatorDoc = await ShriDiffrentiatorModel.findOne();
    if (!differentiatorDoc) {
      return res.status(404).json({ message: "Shri Differentiator not found" });
    }
    res.json({ success: true, data: differentiatorDoc });
  } catch (error) {
    next(error);
  }
};


export const upsertShriEducator = async (req, res, next) => {
  try {
    const { description } = req.body;
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let educatorDoc = await ShriEducatorModel.findOne();

    if (!educatorDoc) {
      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required for creating new data" });
      }
      educatorDoc = new ShriEducatorModel({
        banner: bannerPath,
        description: Array.isArray(description) ? description : [],
      });
    } else {
      if (bannerPath) {
        if (educatorDoc.banner && fs.existsSync(path.join(process.cwd(), educatorDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), educatorDoc.banner));
        }
        educatorDoc.banner = bannerPath;
      }

      if (description) {
        educatorDoc.description = Array.isArray(description) ? description : educatorDoc.description;
      }
    }

    await educatorDoc.save();
    res.json({ message: "Shri Educator saved successfully", data: educatorDoc });
  } catch (error) {
    next(error);
  }
};

export const getShriEducator = async (req, res, next) => {
  try {
    const educatorDoc = await ShriEducatorModel.findOne();
    if (!educatorDoc) {
      return res.status(404).json({ message: "Shri Educator not found" });
    }
    res.json({ success: true, data: educatorDoc });
  } catch (error) {
    next(error);
  }
};

export const upsertFacility = async (req, res, next) => {
  try {
    const { section } = req.body;
    let bannerPath;
    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }
    let sectionData = [];
    if (section) {
      try {
        sectionData = typeof section === "string" ? JSON.parse(section) : section;
      } catch (err) {
        return res.status(400).json({ message: "Invalid section format" });
      }
    }

    let facilityDoc = await FacilityModel.findOne();

    if (!facilityDoc) {
      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required for creating new facility" });
      }

      facilityDoc = new FacilityModel({
        banner: bannerPath,
        section: sectionData,
      });
    } else {
      if (bannerPath) {
        if (facilityDoc.banner && fs.existsSync(path.join(process.cwd(), facilityDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), facilityDoc.banner));
        }
        facilityDoc.banner = bannerPath;
      }

      if (sectionData?.length) {
        facilityDoc.section = sectionData;
      }
    }
    await facilityDoc.save();
    res.json({ message: "Facility saved successfully", data: facilityDoc });
  } catch (error) {
    next(error);
  }
};

export const getFacility = async (req, res, next) => {
  try {
    const facilityDoc = await FacilityModel.findOne();
    if (!facilityDoc) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.json({ success: true, data: facilityDoc });
  } catch (error) {
    next(error);
  }
};

export const upsertCurriculum = async (req, res, next) => {
  try {
    const { methodology_description, approach_description } = req.body;
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let curriculumDoc = await CurriculumModel.findOne();

    if (!curriculumDoc) {
      // Create new
      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required for creating new curriculum" });
      }

      curriculumDoc = new CurriculumModel({
        banner: bannerPath,
        methodology_description,
        approach_description,
      });
    } else {
      // Update existing
      if (bannerPath) {
        if (curriculumDoc.banner && fs.existsSync(path.join(process.cwd(), curriculumDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), curriculumDoc.banner));
        }
        curriculumDoc.banner = bannerPath;
      }

      if (methodology_description) curriculumDoc.methodology_description = methodology_description;
      if (approach_description) curriculumDoc.approach_description = approach_description;
    }

    await curriculumDoc.save();
    res.json({ message: "Curriculum saved successfully", data: curriculumDoc });
  } catch (error) {
    next(error);
  }
};

export const getCurriculum = async (req, res, next) => {
  try {
    const curriculumDoc = await CurriculumModel.findOne();
    if (!curriculumDoc) {
      return res.status(404).json({ message: "Curriculum not found" });
    }
    res.json({ success: true, data: curriculumDoc });
  } catch (error) {
    next(error);
  }
};


export const upsertPursuit = async (req, res, next) => {
  try {
    const { section } = req.body;
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }
    let sectionData = [];
    if (section) {
      try {
        sectionData = typeof section === "string" ? JSON.parse(section) : section;
      } catch (err) {
        return res.status(400).json({ message: "Invalid section format" });
      }
    }

    let pursuitDoc = await PursuitModel.findOne();

    if (!pursuitDoc) {
      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required for creating new pursuit" });
      }
      pursuitDoc = new PursuitModel({
        banner: bannerPath,
        section: sectionData
      });
    } else {
      if (bannerPath) {
        if (pursuitDoc.banner && fs.existsSync(path.join(process.cwd(), pursuitDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), pursuitDoc.banner));
        }
        pursuitDoc.banner = bannerPath;
      }

      if (sectionData?.length) {
        pursuitDoc.section = sectionData;
      }
    }

    await pursuitDoc.save();
    res.json({ message: "Pursuit saved successfully", data: pursuitDoc });
  } catch (error) {
    next(error);
  }
};

export const getPursuit = async (req, res, next) => {
  try {
    const pursuitDoc = await PursuitModel.findOne();
    if (!pursuitDoc) {
      return res.status(404).json({ message: "Pursuit not found" });
    }
    res.json({ success: true, data: pursuitDoc });
  } catch (error) {
    next(error);
  }
};


export const upsertArt = async (req, res, next) => {
  try {
    const { description } = req.body;
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let artDoc = await ArtModel.findOne();

    if (!artDoc) {
      // Create new
      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required for creating new art" });
      }

      artDoc = new ArtModel({
        banner: bannerPath,
        description: Array.isArray(description) ? description : [],
      });
    } else {
      // Update existing
      if (bannerPath) {
        if (artDoc.banner && fs.existsSync(path.join(process.cwd(), artDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), artDoc.banner));
        }
        artDoc.banner = bannerPath;
      }

      if (description) {
        artDoc.description = Array.isArray(description) ? description : artDoc.description;
      }
    }

    await artDoc.save();
    res.json({ message: "Art saved successfully", data: artDoc });
  } catch (error) {
    next(error);
  }
};

export const getArt = async (req, res, next) => {
  try {
    const artDoc = await ArtModel.findOne();
    if (!artDoc) {
      return res.status(404).json({ message: "Art not found" });
    }
    res.json({ success: true, data: artDoc });
  } catch (error) {
    next(error);
  }
};

export const upsertSociety = async (req, res, next) => {
  try {
    const { description, society, clubs } = req.body;
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let societyDoc = await SocietyModel.findOne();

    if (!societyDoc) {
      // Create new
      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required for creating new society" });
      }

      societyDoc = new SocietyModel({
        banner: bannerPath,
        description,
        society: Array.isArray(society) ? society : [],
        clubs: Array.isArray(clubs) ? clubs : [],
      });
    } else {
      // Update existing
      if (bannerPath) {
        if (societyDoc.banner && fs.existsSync(path.join(process.cwd(), societyDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), societyDoc.banner));
        }
        societyDoc.banner = bannerPath;
      }

      if (description) societyDoc.description = description;
      if (society) societyDoc.society = Array.isArray(society) ? society : societyDoc.society;
      if (clubs) societyDoc.clubs = Array.isArray(clubs) ? clubs : societyDoc.clubs;
    }

    await societyDoc.save();
    res.json({ message: "Society saved successfully", data: societyDoc });
  } catch (error) {
    next(error);
  }
};

// Get Society
export const getSociety = async (req, res, next) => {
  try {
    const societyDoc = await SocietyModel.findOne();
    if (!societyDoc) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.json({ success: true, data: societyDoc });
  } catch (error) {
    next(error);
  }
};

export const addClassRoom = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const imagePath = `public/uploads/${req.file.filename}`;

    const newClassRoom = new ClassRoomModel({
      title,
      description,
      image: imagePath,
    });

    await newClassRoom.save();
    res.status(201).json({ message: "Classroom added successfully", data: newClassRoom });
  } catch (error) {
    next(error);
  }
};

export const editClassRoom = async (req, res, next) => {
  try {
    const { _id, title, description } = req.body;

    const classroom = await ClassRoomModel.findById(_id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    if (req.file) {
      if (classroom.image && fs.existsSync(path.join(process.cwd(), classroom.image))) {
        fs.unlinkSync(path.join(process.cwd(), classroom.image));
      }
      classroom.image = `public/uploads/${req.file.filename}`;
    }

    if (title) classroom.title = title;
    if (description) classroom.description = description;

    await classroom.save();
    res.json({ message: "Classroom updated successfully", data: classroom });
  } catch (error) {
    next(error);
  }
};

export const getClassRooms = async (req, res, next) => {
  try {
    const classrooms = await ClassRoomModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: classrooms });
  } catch (error) {
    next(error);
  }
};

export const getClassRoomById = async (req, res, next) => {
  try {
    const classroom = await ClassRoomModel.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.json({ success: true, data: classroom });
  } catch (error) {
    next(error);
  }
};

export const upsertClassRoomBanner = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const bannerPath = `public/uploads/${req.file.filename}`;
    let bannerDoc = await ClassRoomBannerModel.findOne();

    if (!bannerDoc) {
      // Create new
      bannerDoc = new ClassRoomBannerModel({ banner: bannerPath });
    } else {
      // Update existing
      if (bannerDoc.banner && fs.existsSync(path.join(process.cwd(), bannerDoc.banner))) {
        fs.unlinkSync(path.join(process.cwd(), bannerDoc.banner));
      }
      bannerDoc.banner = bannerPath;
    }

    await bannerDoc.save();
    res.json({ message: "Classroom banner saved successfully", data: bannerDoc });
  } catch (error) {
    next(error);
  }
};

// Get Classroom Banner
export const getClassRoomBanner = async (req, res, next) => {
  try {
    const bannerDoc = await ClassRoomBannerModel.findOne();
    if (!bannerDoc) {
      return res.status(404).json({ message: "Classroom banner not found" });
    }
    res.json({ success: true, data: bannerDoc });
  } catch (error) {
    next(error);
  }
};

export const upsertEnvironment = async (req, res, next) => {
  try {
    const { message, section } = req.body;
    let bannerPath, profilePath;

    if (req.files && req.files.banner) {
      bannerPath = `public/uploads/${req.files.banner[0].filename}`;
    }

    if (req.files && req.files.profile) {
      profilePath = `public/uploads/${req.files.profile[0].filename}`;
    }
    let sectionData = [];
    if (section) {
      try {
        sectionData = typeof section === "string" ? JSON.parse(section) : section;
      } catch (err) {
        return res.status(400).json({ message: "Invalid section format" });
      }
    }
    let environmentDoc = await EnvironmentModel.findOne();
    if (!environmentDoc) {
      if (!bannerPath || !profilePath) {
        return res.status(400).json({ message: "Banner and profile images are required for creation" });
      }

      environmentDoc = new EnvironmentModel({
        banner: bannerPath,
        profile: profilePath,
        message: message || "",
        section: sectionData
      });
    } else {
      if (bannerPath) {
        if (environmentDoc.banner && fs.existsSync(path.join(process.cwd(), environmentDoc.banner))) {
          fs.unlinkSync(path.join(process.cwd(), environmentDoc.banner));
        }
        environmentDoc.banner = bannerPath;
      }

      if (profilePath) {
        if (environmentDoc.profile && fs.existsSync(path.join(process.cwd(), environmentDoc.profile))) {
          fs.unlinkSync(path.join(process.cwd(), environmentDoc.profile));
        }
        environmentDoc.profile = profilePath;
      }

      if (message) environmentDoc.message = message;
      if (sectionData?.length) environmentDoc.section = sectionData
    }

    await environmentDoc.save();
    res.json({ message: "Environment saved successfully", data: environmentDoc });
  } catch (error) {
    next(error);
  }
};


export const getEnvironment = async (req, res, next) => {
  try {
    const environmentDoc = await EnvironmentModel.findOne();
    if (!environmentDoc) {
      return res.status(404).json({ message: "Environment data not found" });
    }
    res.json({ success: true, data: environmentDoc });
  } catch (error) {
    next(error);
  }
};

export const upsertFaqBanner = async (req, res, next) => {
  try {
    let bannerPath;

    // Handle uploaded banner
    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let faqBannerDoc = await FaqBannerModel.findOne();

    if (!faqBannerDoc) {
      // Create new
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      faqBannerDoc = new FaqBannerModel({
        banner: bannerPath,
      });
    } else {
      // Update existing
      if (bannerPath) {
        if (
          faqBannerDoc.banner &&
          fs.existsSync(path.join(process.cwd(), faqBannerDoc.banner))
        ) {
          fs.unlinkSync(path.join(process.cwd(), faqBannerDoc.banner));
        }
        faqBannerDoc.banner = bannerPath;
      }
    }

    await faqBannerDoc.save();
    res.json({ message: "FAQ Banner saved successfully", data: faqBannerDoc });
  } catch (error) {
    next(error);
  }
};

export const getFaqBanner = async (req, res, next) => {
  try {
    const faqBannerDoc = await FaqBannerModel.findOne();
    if (!faqBannerDoc) {
      return res.status(404).json({ message: "No FAQ banner found" });
    }
    res.json(faqBannerDoc);
  } catch (error) {
    next(error);
  }
};


export const upsertApplicationFormBanner = async (req, res, next) => {
  try {
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let appFormBannerDoc = await ApplicationFormBnnerModel.findOne();

    if (!appFormBannerDoc) {
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      appFormBannerDoc = new ApplicationFormBnnerModel({
        banner: bannerPath,
      });
    } else {
      if (bannerPath) {
        if (
          appFormBannerDoc.banner &&
          fs.existsSync(path.join(process.cwd(), appFormBannerDoc.banner))
        ) {
          fs.unlinkSync(path.join(process.cwd(), appFormBannerDoc.banner));
        }
        appFormBannerDoc.banner = bannerPath;
      }
    }

    await appFormBannerDoc.save();
    res.json({
      message: "Application Form Banner saved successfully",
      data: appFormBannerDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationFormBanner = async (req, res, next) => {
  try {
    const appFormBannerDoc = await ApplicationFormBnnerModel.findOne();
    if (!appFormBannerDoc) {
      return res.status(404).json({ message: "No Application Form banner found" });
    }
    res.json(appFormBannerDoc);
  } catch (error) {
    next(error);
  }
};

export const upsertScheduleBanner = async (req, res, next) => {
  try {
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let scheduleBannerDoc = await ScheduleBannerModel.findOne();

    if (!scheduleBannerDoc) {
      // Create new
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      scheduleBannerDoc = new ScheduleBannerModel({
        banner: bannerPath,
      });
    } else {
      // Update existing
      if (bannerPath) {
        if (
          scheduleBannerDoc.banner &&
          fs.existsSync(path.join(process.cwd(), scheduleBannerDoc.banner))
        ) {
          fs.unlinkSync(path.join(process.cwd(), scheduleBannerDoc.banner));
        }
        scheduleBannerDoc.banner = bannerPath;
      }
    }

    await scheduleBannerDoc.save();
    res.json({
      message: "Schedule Banner saved successfully",
      data: scheduleBannerDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const getScheduleBanner = async (req, res, next) => {
  try {
    const scheduleBannerDoc = await ScheduleBannerModel.findOne();
    if (!scheduleBannerDoc) {
      return res.status(404).json({ message: "No Schedule banner found" });
    }
    res.json(scheduleBannerDoc);
  } catch (error) {
    next(error);
  }
};

export const upsertContactBanner = async (req, res, next) => {
  try {
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let contactBannerDoc = await ContactBannerModel.findOne();

    if (!contactBannerDoc) {
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      contactBannerDoc = new ContactBannerModel({
        banner: bannerPath,
      });
    } else {
      if (bannerPath) {
        if (
          contactBannerDoc.banner &&
          fs.existsSync(path.join(process.cwd(), contactBannerDoc.banner))
        ) {
          fs.unlinkSync(path.join(process.cwd(), contactBannerDoc.banner));
        }
        contactBannerDoc.banner = bannerPath;
      }
    }

    await contactBannerDoc.save();
    res.json({
      message: "Contact Banner saved successfully",
      data: contactBannerDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactBanner = async (req, res, next) => {
  try {
    const contactBannerDoc = await ContactBannerModel.findOne();
    if (!contactBannerDoc) {
      return res.status(404).json({ message: "No Contact banner found" });
    }
    res.json(contactBannerDoc);
  } catch (error) {
    next(error);
  }
};

export const upsertGalleryBanner = async (req, res, next) => {
  try {
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let galleryBannerDoc = await GalleryBannerModel.findOne();

    if (!galleryBannerDoc) {
      // Create new
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      galleryBannerDoc = new GalleryBannerModel({
        banner: bannerPath,
      });
    } else {
      if (bannerPath) {
        if (
          galleryBannerDoc.banner &&
          fs.existsSync(path.join(process.cwd(), galleryBannerDoc.banner))
        ) {
          fs.unlinkSync(path.join(process.cwd(), galleryBannerDoc.banner));
        }
        galleryBannerDoc.banner = bannerPath;
      }
    }

    await galleryBannerDoc.save();
    res.json({
      message: "Gallery Banner saved successfully",
      data: galleryBannerDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const getGalleryBanner = async (req, res, next) => {
  try {
    const galleryBannerDoc = await GalleryBannerModel.findOne();
    if (!galleryBannerDoc) {
      return res.status(404).json({ message: "No Gallery banner found" });
    }
    res.json(galleryBannerDoc);
  } catch (error) {
    next(error);
  }
};


export const upsertAdmissionProcess = async (req, res, next) => {
  try {
    const { academicYear, section } = req.body;

      let sectionData = [];
    if (section) {
      try {
        sectionData = typeof section === "string" ? JSON.parse(section) : section;
      } catch (err) {
        return res.status(400).json({ message: "Invalid section format" });
      }
    }

    let admissionDoc = await AdmissionProcessModel.findOne();
    let bannerPath;

    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    if (!admissionDoc) {
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      admissionDoc = new AdmissionProcessModel({
        academicYear,
        section: sectionData,
        banner: bannerPath,
      });
    } else {
      if (academicYear) admissionDoc.academicYear = academicYear;
      if (sectionData?.length) admissionDoc.section = sectionData;

      if (bannerPath) {
        if (admissionDoc.banner && fs.existsSync(admissionDoc.banner)) {
          fs.unlinkSync(admissionDoc.banner);
        }
        admissionDoc.banner = bannerPath;
      }
    }

    await admissionDoc.save();

    res.status(200).json({
      message: "Admission process saved successfully",
      data: admissionDoc,
    });
  } catch (error) {
    next(error);
  }
};


export const getAdmissionProcess = async (req, res, next) => {
  try {
    const admissionDoc = await AdmissionProcessModel.findOne();
    if (!admissionDoc) {
      return res.status(404).json({ message: "No admission process found" });
    }

    res.status(200).json({
      message: "Admission process fetched successfully",
      data: admissionDoc,
    });
  } catch (error) {
    next(error);
  }
};


export const upsertPhilosophy = async (req, res, next) => {
  try {
    const { description, section } = req.body;

    let bannerPath = null;
    if (req.file) {
      bannerPath = `public/uploads/${req.file.filename}`;
    }

    let philosophyDoc = await PhilosophyModel.findOne();

    if (!philosophyDoc) {
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      philosophyDoc = new PhilosophyModel({
        banner: bannerPath,
        description: description || "",
        section: Array.isArray(section) ? section : [],
      });
    } else {
      if (bannerPath) {
        if (philosophyDoc.banner && fs.existsSync(philosophyDoc.banner)) {
          fs.unlinkSync(philosophyDoc.banner);
        }
        philosophyDoc.banner = bannerPath;
      }
      if (description) philosophyDoc.description = description;
      if (section) philosophyDoc.section = Array.isArray(section) ? section : philosophyDoc.section;
    }

    await philosophyDoc.save();

    res.status(200).json({
      message: "Philosophy saved successfully",
      data: philosophyDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const getPhilosophy = async (req, res, next) => {
  try {
    const philosophyDoc = await PhilosophyModel.findOne();
    if (!philosophyDoc) {
      return res.status(404).json({ message: "No philosophy found" });
    }
    res.status(200).json({
      message: "Philosophy fetched successfully",
      data: philosophyDoc,
    });
  } catch (error) {
    next(error);
  }
};




export const getSportData = async (req, res) => {
  try {
    const sports = await SportModel.findOne();
    res.status(200).json(sports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const upsertSport = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    let bannerPath = null;
    if (req.files?.banner?.[0]) {
      bannerPath = `public/uploads/${req.files.banner[0].filename}`;
    }

    let imagesPaths = [];
    if (req.files?.images) {
      imagesPaths = req.files.images?.map(
        (file) => `public/uploads/${file.filename}`
      );
    }

    // Find existing sport by name
    let sportDoc = await SportModel.findOne({ name });

    if (!sportDoc) {
      // Create new document
      if (!bannerPath) {
        return res
          .status(400)
          .json({ message: "Banner image is required for new sport" });
      }

      sportDoc = new SportModel({
        name,
        description: description || "",
        banner: bannerPath,
        images: imagesPaths,
      });
    } else {
      // Update existing

      // Replace banner if new one uploaded
      if (bannerPath) {
        if (sportDoc.banner && fs.existsSync(sportDoc.banner)) {
          fs.unlinkSync(sportDoc.banner);
        }
        sportDoc.banner = bannerPath;
      }

      // Remove selected images
      if (req.body.removeImages) {
        const removeList = Array.isArray(req.body.removeImages)
          ? req.body.removeImages
          : [req.body.removeImages];

        sportDoc.images = sportDoc.images.filter((img) => {
          if (removeList.includes(img)) {
            if (fs.existsSync(img)) {
              fs.unlinkSync(img);
            }
            return false;
          }
          return true;
        });
      }

      // Add new images (if uploaded)
      if (imagesPaths.length) {
        sportDoc.images = [...sportDoc.images, ...imagesPaths];
      }

      if (description) sportDoc.description = description;
    }

    await sportDoc.save();

    res.status(200).json({
      message: "Sport saved successfully",
      data: sportDoc,
    });
  } catch (error) {
    next(error);
  }
};

export const upsertMandatory = async (req, res, next) => {
  try {
    const { body, files } = req;

    let mandatoryDoc = await MandatoryModel.findOne();

    // Banner handling
    const bannerFile = files.find((file) => file.fieldname === "banner");
    const bannerPath = bannerFile
      ? `public/uploads/${bannerFile.filename}`
      : mandatoryDoc?.banner;

    // Helper function to parse each document
    const parseDocument = (docKey) => {
      const docData = { heading: "", subHeading: [] };
      const doc = body[docKey];

      if (doc && typeof doc === "object") {
        docData.heading = doc.heading || "";

        docData.subHeading = doc.subHeading?.map((sub, idx) => {
          const subHeading = { key: sub.key || "" };

          // Determine if this doc type needs value, image, or both
          if (["documents1", "documents4", "documents5"].includes(docKey)) {
            subHeading.value = sub.value || "";
          } else if (["documents2", "documents6"].includes(docKey)) {
            // Check if a new image was uploaded
            const file = files.find(
              (f) => f.fieldname === `${docKey}[subHeading][${idx}][image]`
            );
            subHeading.image = file
              ? `public/uploads/${file.filename}`
              : sub.image || ""; // preserve old image if not replaced
          } else if (docKey === "documents3") {
            const file = files.find(
              (f) => f.fieldname === `${docKey}[subHeading][${idx}][image]`
            );
            if (file) subHeading.image = `public/uploads/${file.filename}`;
            if (sub.value) subHeading.value = sub.value;
          }

          return subHeading;
        }) || [];
      }
      return docData;
    };

    // Parse all documents
    const updatedData = {
      banner: bannerPath,
      documents1: parseDocument("documents1"),
      documents2: parseDocument("documents2"),
      documents3: parseDocument("documents3"),
      documents4: parseDocument("documents4"),
      documents5: parseDocument("documents5"),
      documents6: parseDocument("documents6"),
    };

    if (!mandatoryDoc) {
      // Create new document
      if (!bannerPath) {
        return res.status(400).json({ message: "Banner image is required" });
      }
      mandatoryDoc = new MandatoryModel(updatedData);
    } else {
      // Banner: remove old if replaced
      if (bannerFile && mandatoryDoc.banner && fs.existsSync(mandatoryDoc.banner)) {
        fs.unlinkSync(mandatoryDoc.banner);
      }

      // Handle subheadings: remove deleted images
      ["documents2", "documents3", "documents6"].forEach((docKey) => {
        const oldSubs = mandatoryDoc[docKey]?.subHeading || [];
        const newSubs = updatedData[docKey]?.subHeading || [];

        oldSubs.forEach((sub, idx) => {
          // If old subheading no longer exists in new data, remove image
          if (!newSubs[idx] && sub.image && fs.existsSync(sub.image)) {
            fs.unlinkSync(sub.image);
          }
        });

        // Preserve old images for subheadings that remain unchanged
        newSubs.forEach((sub, idx) => {
          if (!sub.image && oldSubs[idx]?.image) {
            sub.image = oldSubs[idx].image;
          }
        });
      });

      // Merge new data
      Object.assign(mandatoryDoc, updatedData);
    }

    await mandatoryDoc.save();

    // // Add imageUrl for frontend
    // const responseData = mandatoryDoc.toObject();
    // ["documents2", "documents3", "documents6"].forEach((docKey) => {
    //   if (responseData[docKey]?.subHeading) {
    //     responseData[docKey].subHeading = responseData[docKey].subHeading.map((sub) => ({
    //       ...sub,
    //       imageUrl: sub.image ? `${process.env.BASE_URL || import.meta.env.VITE_APP_URL}${sub.image}` : "",
    //     }));
    //   }
    // });

    res.status(200).json({
      message: "Mandatory data saved successfully",
      // data: responseData,
    });
  } catch (error) {
    console.error("Error in upsertMandatory:", error);
    next(error);
  }
};


export const getMandatory = async (req, res, next) => {
  try {
    const mandatoryData = await MandatoryModel.findOne();
    res.json(mandatoryData);
  } catch (error) {
    next(error);
  }
};