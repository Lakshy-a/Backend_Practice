import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import addReview from "../controllers/reviewsControllers/addReview.controller.js";
import getReviewsByProduct from "../controllers/reviewsControllers/getAllReviewsProductwise.controller.js";
import deleteReview from "../controllers/reviewsControllers/deleteReview.controller.js";
import getAllReviews from "../controllers/reviewsControllers/getAllReviews.controller.js";
import getReviewById from "../controllers/reviewsControllers/getReviewById.controller.js";
import getReviewsByUser from "../controllers/reviewsControllers/getReviewByUser.controller.js";
import updateReview from "../controllers/reviewsControllers/updateReview.controller.js";
import filterReviews from "../controllers/reviewsControllers/filterReviews.controller.js";

const router = express.Router();

router.get("/getReviewsByProduct/:productId", isLoggedIn, getReviewsByProduct);
router.get("/getReviewById/:reviewId", getReviewById);
router.get("/getUserReview/:userId", getReviewsByUser);
router.get("/getAlReviews", getAllReviews);
router.post("/addReview", addReview);
router.put("/updateReview/:reviewId", updateReview);
router.delete("/deleteReview/:reviewId", deleteReview);

export default router;
