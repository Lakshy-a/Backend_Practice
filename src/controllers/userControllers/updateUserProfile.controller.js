import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

export const updateUserProfile = (req, res) => {
  try {
    successResponse(res, "User profile updated successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error in updating the user profile");
  }
};
