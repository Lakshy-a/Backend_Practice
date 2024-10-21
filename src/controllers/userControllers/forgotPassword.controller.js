import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { User } from "../../models/user.model.js";

// yet to be implemented

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  // 1. get the email from body
  // 2. check if email is not empty
  // 3. if not empty, check if the user with this email exists or not
  // 4. if exists,
  try {
    // check if email is not empty
    if (!email) return errorResponse(res, 400, "Email is required...");

    // check if user with the same email id exists or not
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "User not found...");

    res
      .status(200)
      .json({ message: "Mail sent successfully to your registered email." });
  } catch (error) {
    res.status(400).json({ message: "Error sending reset email" });
  }
};

export default forgotPasswordController;
