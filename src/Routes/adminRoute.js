import express from 'express'
import { addActivity, addBlog, addClassRoom, addFaq, addGallery, addLeaders, addProgram, addsteam, addStudentExperience, addTopBanner, admissionEnqList, contactReqList, deleteGallery, editActivity, editBlog, editClassRoom, editFaq, editGallery, editLeaders, editProgram, editSteam, editStudentExperience, getAbout, getActivity, getActivityById, getAdmissionProcess, getApplicationFormBanner, getArt, getBanner, getBlogBanner, getBlogById, getBlogs, getCbseSection, getClassRoomBanner, getClassRoomById, getClassRooms, getContactBanner, getCore, getCurriculum, getDifferentQuality, getEnquiryList, getEnvironment, getEveryChildren, getFacility, getFaq, getFaqBanner, getFaqById, getGallery, getGalleryBanner, getGalleryList, getLeaders, getLeadersById, getLeadershipBanner, getMandatory, getPhilosophy, getPrincipals, getProgramById, getPursuit, getScheduleBanner, getShriDifferentiator, getShriEducator, getSociety, getSportData, getSteamById, getStudentExperience, getStudentExperienceById, getVision, getWelcome, Login, programList, steamList, tourList, upsertAbout, upsertAdmissionProcess, upsertApplicationFormBanner, upsertArt, upsertBlogBanner, upsertCbseSection, upsertClassRoomBanner, upsertContactBanner, upsertCore, upsertCurriculum, upsertDifferentQuality, upsertEnvironment, upsertEveryChildLearn, upsertFacility, upsertFaqBanner, upsertGalleryBanner, upsertLeadershipBanner, upsertMandatory, upsertPhilosophy, upsertPrincipal, upsertPursuit, upsertScheduleBanner, upsertShriDifferentiator, upsertShriEducator, upsertSociety, upsertSport, upsertVision, upsertWelcome } from '../Controller/adminController.js';
import { authentication } from '../Middleware/authentication.js';
import { authorization } from '../Middleware/authorization.js';
import upload from '../Middleware/upload.js';


const adminRouter = express.Router();


adminRouter.post("/login", Login)

/*----------------------enquiry list-----------------------*/
adminRouter.get('/admission-enquiry-list', authentication, authorization(['admin']), admissionEnqList)

/*----------------------contact us req-----------*/
adminRouter.get('/contact-us-list', authentication, authorization(['admin']), contactReqList)

/* ---------------------------take tour list-----------------------*/
adminRouter.get('/take-tour-list', authentication, authorization(['admin']), tourList)

/*--------------------------- banner-------------------------- */
adminRouter.get("/get-banner", authentication, authorization(['admin']), getBanner)
adminRouter.post("/top-banner", authentication, authorization(['admin']), upload.single("imageUrl"), addTopBanner)


/* ----------------------------welcome ------------------------------ */
adminRouter.get('/welcome', authentication, authorization(['admin']), getWelcome)
adminRouter.post('/welcome', authentication, authorization(['admin']), upsertWelcome)

/*--------------------every-child-learn -----------------------*/
adminRouter.get("/every-child-learn", authentication, authorization(['admin']), getEveryChildren)
adminRouter.post("/every-child-learn", authentication, authorization(['admin']), upload.array("images", 4), upsertEveryChildLearn)

/*-------------------------gallery ------------------------*/
adminRouter.get("/gallery/:id", authentication, authorization(['admin']), getGallery)
adminRouter.get("/gallery-list", authentication, authorization(['admin']), getGalleryList)
adminRouter.post("/gallery", authentication, authorization(['admin']), upload.single("image"), addGallery)
adminRouter.patch("/gallery", authentication, authorization(['admin']), upload.single("image"), editGallery)
adminRouter.delete("/gallery/:id", authentication, authorization(['admin']), deleteGallery)


/*-------------------------cbse section -------------------*/
adminRouter.get("/cbse-section", authentication, authorization(['admin']), getCbseSection)
adminRouter.post("/cbse-section", authentication, authorization(['admin']), upsertCbseSection)

/*----------------------steam section----------------------------*/
adminRouter.get("/steam/:id", authentication, authorization(['admin']), getSteamById)
adminRouter.get("/steam-list", authentication, authorization(['admin']), steamList)
adminRouter.post("/steam", authentication, authorization(['admin']), upload.single('image'), addsteam)
adminRouter.patch("/steam", authentication, authorization(['admin']), upload.single('image'), editSteam)


/*--------------------------student experience ----------------------*/
adminRouter.get("/student-experience/:id", authentication, authorization(['admin']), getStudentExperienceById)
adminRouter.get("/student-experience-list", authentication, authorization(['admin']), getStudentExperience)
adminRouter.post("/student-experience", authentication, authorization(['admin']), upload.single('image'), addStudentExperience)
adminRouter.patch("/student-experience", authentication, authorization(['admin']), upload.single('image'), editStudentExperience)


/*--------------------------faq ----------------------*/
adminRouter.get("/faq/:id", authentication, authorization(['admin']), getFaqById)
adminRouter.get("/faq-list", authentication, authorization(['admin']), getFaq)
adminRouter.post("/faq", authentication, authorization(['admin']), addFaq)
adminRouter.patch("/faq", authentication, authorization(['admin']), editFaq)

/*-----------------------------enquiry----------------------*/
adminRouter.get("/enquiry-list", authentication, authorization(['admin']), getEnquiryList)

/*---------------------activities -------------------------*/
adminRouter.get("/activity/:id", authentication, authorization(['admin']), getActivityById)
adminRouter.get("/activity-list", authentication, authorization(['admin']), getActivity)
adminRouter.post("/activity", authentication, authorization(['admin']), upload.single('image'), addActivity)
adminRouter.patch("/activity", authentication, authorization(['admin']), upload.single('image'), editActivity)


/*---------------------------program ----------------*/
adminRouter.get("/program/:id", authentication, authorization(['admin']), getProgramById)
adminRouter.get("/program-list", authentication, authorization(['admin']), programList)
adminRouter.post("/program", authentication, authorization(['admin']), addProgram)
adminRouter.patch("/program", authentication, authorization(['admin']), editProgram)




/*-----------------********************----------about us section ---------**************************-------*/


/*------------------about school--------------------*/
adminRouter.get("/about", authentication, authorization(['admin']), getAbout);
adminRouter.post("/about", authentication, authorization(['admin']), upload.single("image"), upsertAbout);

/*------------------------leadership-banner --------------*/
adminRouter.get("/leadership-banner", authentication, authorization(['admin']), getLeadershipBanner);
adminRouter.post("/leadership-banner", authentication, authorization(['admin']), upload.single("bannerImage"), upsertLeadershipBanner);

/*------------------------leadership-leaders --------------*/
adminRouter.get("/leaders/:id", authentication, authorization(['admin']), getLeadersById);
adminRouter.get("/leaders", authentication, authorization(['admin']), getLeaders)
adminRouter.post("/leaders", authentication, authorization(['admin']), upload.single("profileImage"), addLeaders)
adminRouter.patch("/leaders", authentication, authorization(['admin']), upload.single("profileImage"), editLeaders)

/*--------------------------principal message ------------------------*/
adminRouter.get("/principals", authentication, authorization(["admin"]), getPrincipals);
adminRouter.post("/principals", authentication, authorization(["admin"]), upload.fields([{ name: "image", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }]), upsertPrincipal);

/*-----------------------------vision-mission-------------------*/
adminRouter.get("/vision", authentication, authorization(["admin"]), getVision);
adminRouter.post("/vision", authentication, authorization(["admin"]), upload.single("image"), upsertVision);


/*----------------------------core ---------------------*/
adminRouter.get("/core", authentication, authorization(["admin"]), getCore);
adminRouter.post("/core", authentication, authorization(["admin"]), upload.single("image"), upsertCore)

/*------------------------what makes diffrent ---------------*/
adminRouter.get("/diffrent-quality", authentication, authorization(["admin"]), getDifferentQuality);
adminRouter.post("/diffrent-quality", authentication, authorization(["admin"]), upload.single("image"), upsertDifferentQuality)

/*-------------------------------blog-banner ------------------*/
adminRouter.get("/blog-banner", authentication, authorization(["admin"]), getBlogBanner);
adminRouter.post("/blog-banner", authentication, authorization(["admin"]), upload.single("banner"), upsertBlogBanner);

/*-----------------------------------blog---------------------*/
adminRouter.post("/blogs", authentication, authorization(["admin"]), upload.single("image"), addBlog);
adminRouter.patch("/blogs", authentication, authorization(["admin"]), upload.single("image"), editBlog);
adminRouter.get("/blogs", authentication, authorization(["admin"]), getBlogs);
adminRouter.get("/blogs/:id", authentication, authorization(["admin"]), getBlogById);


adminRouter.post("/mandatory", authentication, authorization(["admin"]),
upload.any(),
 upsertMandatory);
adminRouter.get("/mandatory", authentication, authorization(["admin"]), getMandatory);


/*-----------------********************----------about us section ---------**************************-------*/

/*-----------------********************---------------shri way start-------------********************-----*/



/*----------------------diffrentiatior---------------*/
adminRouter.post("/shri-differentiator", authentication, authorization(["admin"]), upload.single("banner"), upsertShriDifferentiator);
adminRouter.get("/shri-differentiator", authentication, authorization(["admin"]), getShriDifferentiator);

/*------------------------------shri educator------------------*/
adminRouter.post("/shri-educator", authentication, authorization(["admin"]), upload.single("banner"), upsertShriEducator);
adminRouter.get("/shri-educator", authentication, authorization(["admin"]), getShriEducator);


/*-------------------------philosphy--------------------*/
adminRouter.post("/philosophy", upload.single("banner"), upsertPhilosophy);
adminRouter.get("/philosophy", getPhilosophy);

/*-----------------********************---------------shri way end-------------********************-----*/


/*-----------------********************---------------facility-------------********************-----*/
adminRouter.post("/facility", authentication, authorization(["admin"]), upload.single("banner"), upsertFacility);
adminRouter.get("/facility", authentication, authorization(["admin"]), getFacility);

/*-----------------********************---------------facility-------------********************-----*/

/*---------------------------learning ---------------------***--*/

/*-----------------------curriculum------------------*/
adminRouter.post("/curriculum", authentication, authorization(["admin"]), upload.single("banner"), upsertCurriculum);
adminRouter.get("/curriculum", authentication, authorization(["admin"]), getCurriculum);


/*-----------------------pursuit----------------*/
adminRouter.post("/pursuit", authentication, authorization(["admin"]), upload.single("banner"), upsertPursuit);
adminRouter.get("/pursuit", authentication, authorization(["admin"]), getPursuit);

/*-----------------------art----------------*/
adminRouter.post("/art", authentication, authorization(["admin"]), upload.single("banner"), upsertArt);
adminRouter.get("/art", authentication, authorization(["admin"]), getArt);

/*-----------------------clubs and social----------------*/
adminRouter.post("/society", authentication, authorization(["admin"]), upload.single("banner"), upsertSociety);
adminRouter.get("/society", authentication, authorization(["admin"]), getSociety);

/*-----------------------classroom----------------*/
adminRouter.post("/classroom", authentication, authorization(["admin"]), upload.single("image"), addClassRoom);
adminRouter.patch("/classroom", authentication, authorization(["admin"]), upload.single("image"), editClassRoom);
adminRouter.get("/classroom", authentication, authorization(["admin"]), getClassRooms);
adminRouter.get("/classroom/:id", authentication, authorization(["admin"]), getClassRoomById);

adminRouter.post("/classroom-banner", authentication, authorization(["admin"]), upload.single("banner"), upsertClassRoomBanner);
adminRouter.get("/classroom-banner", authentication, authorization(["admin"]), getClassRoomBanner);

/*-------------------------------environment------------------------ */
adminRouter.post("/environment", authentication, authorization(["admin"]), upload.fields([{ name: "banner", maxCount: 1 }, { name: "profile", maxCount: 1 },]), upsertEnvironment);
adminRouter.get("/environment", authentication, authorization(["admin"]), getEnvironment);

/*---------------------------learning ---------------------***--*/

/*--------------------------admission---------------------*/
/*------------------faq banner--------------*/
adminRouter.post("/faq-banner", upload.single("banner"), upsertFaqBanner);
adminRouter.get("/faq-banner", getFaqBanner);

/*-----------------application form banner----------*/
adminRouter.post("/application-form-banner", upload.single("banner"), upsertApplicationFormBanner);
adminRouter.get("/application-form-banner", getApplicationFormBanner);

/*-----------------shedule visist----------*/
adminRouter.post("/schedule-visit-banner", upload.single("banner"), upsertScheduleBanner);
adminRouter.get("/schedule-visit-banner", getScheduleBanner);

/*-----------------apadmission process----------*/
adminRouter.post("/admission-process", upload.single("banner"), upsertAdmissionProcess);
adminRouter.get("/admission-process", getAdmissionProcess);

adminRouter.post("/sport", upload.fields([{ name: "banner", maxCount: 1 }, { name: 'images', maxCount: 4 }]), upsertSport);
adminRouter.get("/sport", getSportData);
/*--------------------------close admission---------------------*/

/*---------------contact----------------------*/
adminRouter.post("/contact-banner", upload.single("banner"), upsertContactBanner)
adminRouter.get("/contact-banner", getContactBanner);

/*---------------gallery----------------------*/
adminRouter.post("/gallery-banner", upload.single("banner"), upsertGalleryBanner);
adminRouter.get("/gallery-banner", getGalleryBanner);



export default adminRouter;