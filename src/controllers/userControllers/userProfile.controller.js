import { errorResponse, successResponse } from "../../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";

const userProfile = async (req, res) => {
  try {
    const isExist = await User.findById(req.user._id).select("-createdAt -password -refreshToken -updatedAt -_id");
    if (!isExist) return errorResponse(res, 404, "User not found");

    return successResponse(res, "User profile fetched successfully", isExist);
  } catch (error) {
    console.error("Error in userProfile function:", error);
    return errorResponse(res, 500, "An error occurred while fetching the user profile");
  }
};

export default userProfile;
