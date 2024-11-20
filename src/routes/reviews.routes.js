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

router.get("/getReviewsByProduct/:productId",  getReviewsByProduct);
router.get("/getReviewById/:reviewId", isLoggedIn, getReviewById);
router.get("/getUserReview/:userId", isLoggedIn, getReviewsByUser); 
router.get("/getAlReviews", isLoggedIn, getAllReviews);
router.post("/addReview", isLoggedIn, addReview);
router.put("/updateReview/:reviewId", isLoggedIn, updateReview);
router.delete("/deleteReview/:reviewId", isLoggedIn, deleteReview);

export default router;
