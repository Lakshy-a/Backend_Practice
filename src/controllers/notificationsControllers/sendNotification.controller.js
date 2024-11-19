import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

export const sendNotifications = (req, res) => {
  try {
    successResponse(res, "Notification sent successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error sending notification");
  }
};
