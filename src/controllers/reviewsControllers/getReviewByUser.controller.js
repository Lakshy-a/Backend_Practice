import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const getReviewsByUser = (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) return errorResponse(res, 400, "User ID is required");

    successResponse(res, "Fetched reviews by user successfully");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal error occurred");
  }
};

export default getReviewsByUser;
