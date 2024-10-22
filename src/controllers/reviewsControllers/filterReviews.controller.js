import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const filterReviews = (rea, res) => {
  try {
    successResponse(res, "Reviews Filtered successfully");
  } catch (error) {
    errorResponse(res, 500, "Error while filtering reviews");
  }
};

export default filterReviews;
