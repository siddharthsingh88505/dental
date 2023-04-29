import express from "express";
import { SiteController } from "../controllers/siteController.js";

const router = express.Router();

// routes
router.get("/", SiteController.homeController);
router.get("/about", SiteController.aboutController);
router.get("/services", SiteController.servicesController);
router.get("/contact", SiteController.contactController);
router.get("/login",SiteController.loginController);
// router.get("/getdata", SiteController.getData);
router.get("/jsontoexcel", SiteController.jsontoexcel);
// post data
router.post("/login",SiteController.adminLogin);
router.post("/insert", SiteController.insertData);

// export routes
export { router };