import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { User } from "../../models/user.model.js";

const userProfile = async (req, res) => {
  try {
    // Step 1: Fetch user from the request
    const user = req.user;

    if (!user) {
      return errorResponse(res, 401, "You are not logged in");
    }

    // Step 2: Check if the user exists in the database
    const isExist = await User.findById(user._id).select(
      "-createdAt -password -refreshToken -updatedAt -_id"
    );

    if (!isExist) {
      return errorResponse(res, 404, "User not found");
    }

    // Step 3: Send success response with user data
    return successResponse(res, "User profile fetched successfully", isExist);
  } catch (error) {
    console.error("Error in userProfile function:", error);

    // Step 4: Handle unexpected errors
    return errorResponse(
      res,
      500,
      "An error occurred while fetching the user profile"
    );
  }
};

export default userProfile;
