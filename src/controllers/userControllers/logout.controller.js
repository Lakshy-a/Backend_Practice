import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const logoutController = async (req, res) => {
  try {
    const fetchUser = await User.findById(req.user._id);

    if (!fetchUser) {
      return errorResponse(res, "User not found");
    }

    const refreshToken = fetchUser.refreshToken;
    if (!refreshToken) {
      return errorResponse(res, "Refresh token not found");
    }

    // delete the refresh token from the user
    fetchUser.refreshToken = "";
    await fetchUser.save();

    successResponse(res, 200, "User logged out successfully...");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error occurring while logging out the user..." });
  }
};

export default logoutController;
