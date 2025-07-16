import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const logoutController = async (req, res) => {
  try {
    const userEmail = req.user.email;

    await User.updateOne(
      { email: userEmail },
      { $unset: { refreshToken: "" } }  // or use $set: { refreshToken: null }
    );
    successResponse(res, 200, "User logged out successfully...");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error occurring while logging out the user..." });
  }
};

export default logoutController;
