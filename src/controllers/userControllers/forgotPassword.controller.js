import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { User } from "../../models/user.model.js";
import { geenrateResetToken } from "../../utils/generateTokens.utils.js";

// yet to be implemented

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return errorResponse(res, 400, "Email is required...");

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 404, "User not found...");

    const resetTokenData = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    const resetToken = geenrateResetToken(resetTokenData);

    const resetLink = `${process.env.BASE_URL}/resetPassword?token=${resetToken}`;

    successResponse(
      res,
      "Mail sent successfully to your registered email.",
      resetLink,
    );
  } catch (error) {
    return errorResponse(res, "Error sending email to the registered email id");
  }
};

export default forgotPasswordController;
