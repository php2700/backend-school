import express from 'express'
import { admisssionEnquiry, contactUs, enquiry, listGallery, takeTour } from '../Controller/userController.js';
import upload from '../Middleware/upload.js';
import { getAbout, getActivity, getAdmissionProcess, getApplicationFormBanner, getArt, getBanner, getBlogBanner, getBlogs, getCbseSection, getClassRoomBanner, getClassRooms, getContactBanner, getCore, getCurriculum, getDifferentQuality, getEnvironment, getEveryChildren, getFacility, getFaqBanner, getGalleryBanner, getLeaders, getLeadershipBanner, getMandatory, getPhilosophy, getPrincipals, getPursuit, getScheduleBanner, getShriDifferentiator, getShriEducator, getSociety, getSportData, getStudentExperience, getVision, getWelcome, programList, steamList } from '../Controller/adminController.js';

const userRouter = express.Router();

/*----------------------------admission enquiry---------------------*/
userRouter.post("/admission-enquiry", upload.single("photo"), admisssionEnquiry);

/*---------------------tours-------------------------------*/
userRouter.post("/take-tour", takeTour)

/*-----------------contact-us----------------*/
userRouter.post("/contact-us", contactUs)

/*----------------banner-------------------*/
userRouter.get("/banner", getBanner)

/*-------------------------welcome ----------*/
userRouter.get('/welcome', getWelcome)

/*-------------------------every-child-learn ----------*/
userRouter.get('/every-child-learn', getEveryChildren)

/*-------------------------every-child-learn ----------*/
userRouter.get('/gallery-list', listGallery)

/*-----------------------------cbse section --------------------*/
userRouter.get("/get-cbse-section", getCbseSection)

/*-----------------steam ------------------------------*/
userRouter.get("/steam-list", steamList)

/*-----------------student experience list  ------------------------------*/
userRouter.get("/student-experience-list", getStudentExperience)

/*------------------------enquiry---------------*/
userRouter.post("/enquiry", enquiry)

/*---------------activity --------------------------*/
userRouter.get("/activity-list", getActivity)

/*----------------program------------------------*/
userRouter.get("/program-list", programList)

/*----------------get about------------------------*/
userRouter.get("/about", getAbout);

/*----------------get banner------------------------*/
userRouter.get("/leadership-banner", getLeadershipBanner);

/*--------leader--------------*/
userRouter.get("/leaders", getLeaders)

/*-----------principal----------*/
userRouter.get("/principals", getPrincipals);

/*----------vision-----------------*/
userRouter.get("/vision", getVision);

/*--------------------core ----------------*/
userRouter.get("/core", getCore);
userRouter.get("/mandatory", getMandatory);

/*---------------------doiffrent quality ---------------*/
userRouter.get("/diffrent-quality", getDifferentQuality);

/*-------------------------blog-banner-------------*/
userRouter.get("/blog-banner", getBlogBanner);
userRouter.get("/blogs", getBlogs);

/*----------------------shri way section ----------*/
userRouter.get("/shri-differentiator", getShriDifferentiator);
userRouter.get("/shri-educator", getShriEducator);
userRouter.get("/philosophy", getPhilosophy);


/*------------------facility---------*/
userRouter.get("/facility", getFacility);

/*-----------learning---------------------*/
userRouter.get("/curriculum", getCurriculum);
userRouter.get("/pursuit", getPursuit);
userRouter.get("/art", getArt);
userRouter.get("/society", getSociety);
userRouter.get("/classrooms", getClassRooms);
userRouter.get("/classroom-banner", getClassRoomBanner);
userRouter.get("/environment", getEnvironment);
userRouter.get("/sport", getSportData);


/*-------------------admission--------------*/
userRouter.get("/application-form-banner", getApplicationFormBanner);
userRouter.get("/faq-banner", getFaqBanner);
userRouter.get("/schedule-banner", getScheduleBanner);
userRouter.get("/schedule-banner", getAdmissionProcess);



/*------------gallery-----------*/
userRouter.get("/gallery-banner", getGalleryBanner);

/*------------contact-----------*/
userRouter.get("/contact-banner", getContactBanner);



export default userRouter;