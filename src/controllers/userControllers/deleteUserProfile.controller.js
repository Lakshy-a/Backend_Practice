import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";

export const deleteUserProfile = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return errorResponse(res, 400, "Email and password are required");

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Incorrect password");
    }

    await User.deleteOne({ _id: user._id });

    successResponse(res, "User profile deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error in deleting the user profile");
  }
};
