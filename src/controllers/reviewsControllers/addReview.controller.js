import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";
import { Review } from "../../models/reviews.model.js";

const addReview = async (req, res) => {
  const { rating, review, productId } = req.body;
  try {
    const isEmpty = [rating, review, productId].some((item) => !item);
    if (isEmpty) return errorResponse(res, 400, "Please fill all fields");

    const token = req.cookies.accessToken;
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = userData._id;

    const savedReview = await Review.create({
      rating,
      review,
      productId,
      userId,
    });

    return successResponse(res, "Review added successfully...", savedReview);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Some internal error occurred");
  }
};

export default addReview;