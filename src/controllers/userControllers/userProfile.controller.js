import { errorResponse, successResponse } from "../../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";

const userProfile = async (req, res) => {
  try {
    // Step 1: Fetch token from the cookies
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) return errorResponse(res, 401, "You are not logged in");

    // Step 2: Verify the token and get user data
    let userData;
    try {
      userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return errorResponse(res, 401, "Invalid or expired token");
    }

    // Step 3: Check if the user exists in the database
    const isExist = await User.findById(userData._id).select("-createdAt -password -refreshToken -updatedAt -_id");
    if (!isExist) return errorResponse(res, 404, "User not found");

    // Step 4: Send success response with user data
    return successResponse(res, "User profile fetched successfully", isExist);
  } catch (error) {
    console.error("Error in userProfile function:", error);
    return errorResponse(res, 500, "An error occurred while fetching the user profile");
  }
};

export default userProfile;
