import express from "express";
import addReview from "../controllers/reviewsControllers/addReview.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";

const router = express.Router();

router.post("/addReview", isLoggedIn, addReview);

export default router;
