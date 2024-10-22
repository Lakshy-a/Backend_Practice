import express from "express";
import forgotPasswordController from "../controllers/userControllers/forgotPassword.controller.js";
import loginController from "../controllers/userControllers/login.controller.js";
import registerController from "../controllers/userControllers/register.controller.js";
import logoutController from "../controllers/userControllers/logout.controller.js";
import upload from "../middlewares/upload.middleware.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), registerController);
router.post("/login", loginController);
router.post("/forgotPassword", isLoggedIn, forgotPasswordController);
router.post("/logout", isLoggedIn, logoutController);

export default router;
