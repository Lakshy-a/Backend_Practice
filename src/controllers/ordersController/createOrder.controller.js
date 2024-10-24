import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const createOrder = (req, res) => {
  try {
    return successResponse(res, "Order Placed Successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, error.message);
  }
};

export default createOrder;
