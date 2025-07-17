import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { User } from "../../models/user.model.js";

const getReviewsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) return errorResponse(res, 400, "User ID is required");

    const user = await User.findById(userId).populate("reviewsPosted");
    if (!user) return errorResponse(res, 404, "User not found");

    const reviewsOfThisUser = user.reviewsPosted;

    successResponse(
      res,
      "Fetched reviews by user successfully",
      reviewsOfThisUser,
    );
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal error occurred");
  }
};

export default getReviewsByUser;
