import express from "express";
import adminLogin from "../controllers/adminControllers/adminLogin.controller.js";
import adminLogout from "../controllers/adminControllers/adminLogout.controller.js";
import adminRegister from "../controllers/adminControllers/adminRegister.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import getAllUsers from "../controllers/adminControllers/getAllUsers.js";

const router = express.Router();

router.post("/adminRegister", adminRegister);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", isLoggedIn, adminLogout);
router.get("/getAllUsers", getAllUsers);

export default router;
