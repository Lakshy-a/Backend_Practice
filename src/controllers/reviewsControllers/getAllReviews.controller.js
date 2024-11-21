import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { Review } from "../../models/reviews.model.js";

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId").populate("productId");

    successResponse(res, "Fetched all reviews successfully", reviews);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal error occurred");
  }
};

export default getAllReviews;
