import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

const updateOrderStatus = (req, res) => {
  try {
    successResponse(res, "Order status updated successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, error.message);
  }
};

export default updateOrderStatus;
