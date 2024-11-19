import express from "express";
import { getUserNotifications } from "../controllers/notificationsControllers/userNotifications.controller.js";
import { sendNotifications } from "../controllers/notificationsControllers/sendNotification.controller.js";

const router = express.Router();

router.get("/getUserNotifications", getUserNotifications);
router.post("/sendNotifications", sendNotifications);

export default router;
