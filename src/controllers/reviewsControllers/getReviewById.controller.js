import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { Review } from "../../models/reviews.model.js";

const getReviewBuId = async (req, res) => {
  const { reviewId } = req.params;
  try {
    if (!reviewId) return errorResponse(res, 400, "Review id is required");

    const review = await Review.findById(reviewId);
    if (!review) return errorResponse(res, 404, "No such review exists");

    successResponse(res, "Fetched review by id successfully", review);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal error occurred");
  }
};

export default getReviewBuId;
