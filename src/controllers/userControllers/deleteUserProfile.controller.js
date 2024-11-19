import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

export const deleteUserProfile = (req, res) => {
  try {
    successResponse(res, "User profile deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error in deleting the user profile");
  }
};
