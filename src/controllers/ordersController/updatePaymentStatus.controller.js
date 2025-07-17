import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

const updatePaymentStatus = (req, res) => {
  try {
    successResponse(res, "Payment status updated successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, error.message);
  }
};

export default updatePaymentStatus;
