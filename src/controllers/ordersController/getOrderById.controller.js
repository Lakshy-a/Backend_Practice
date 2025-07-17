import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const getOrderById = (req, res) => {
  try {
    successResponse(res, "Fetched order by id successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error in getting order by id");
  }
};

export default getOrderById;
