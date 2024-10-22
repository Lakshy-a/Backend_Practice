import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { Review } from "../../models/reviews.model.js";

const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, review, productId } = req.body;

  try {
    if (!reviewId) return errorResponse(res, 400, "Review ID is required");

    const findReview = await Review.findById(reviewId);
    if (!findReview) return errorResponse(res, 404, "Review not found");

    const isEmpty = [rating, review, productId].some((item) => !item);
    if (isEmpty) return errorResponse(res, 400, "Every field is required");

    findReview.rating = rating;
    findReview.review = review;
    findReview.productId = productId;

    await findReview.save();

    successResponse(res, "ReviewUpdated successfully", findReview);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal error occurred");
  }
};

export default updateReview;
