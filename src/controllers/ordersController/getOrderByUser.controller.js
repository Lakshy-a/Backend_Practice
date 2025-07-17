import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

const getOrderByUser = (req, res) => {
  try {
    successResponse(res, "Fetched orders by users successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Unable to fetch orders by users");
  }
};

export default getOrderByUser;
