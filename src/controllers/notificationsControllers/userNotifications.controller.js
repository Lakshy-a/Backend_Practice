import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

export const getUserNotifications = (req, res) => {
  try {
    successResponse(res, "Notifications fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error fetching notifications");
  }
};
