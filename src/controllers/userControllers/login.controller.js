import handleError from "../../utils/errorHandler.js";
import { User } from "../../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens.utils.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import bcrypt from "bcryptjs";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return errorResponse(res, 401, "All the fields are required...");

    const existingUser = await User.findOne({ email });
    if (!existingUser) return handleError(res, 404, "User not found...");

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isValidPassword) return handleError(res, 400, "Incorrect password...");

    const accessTokenData = {
      _id: existingUser._id,
      email: existingUser.email,
      name: existingUser.fullName,
      role: existingUser.role,
    };
    const accessToken = generateAccessToken(accessTokenData);

    const refreshTokenData = { _id: existingUser._id };
    const refreshToken = generateRefreshToken(refreshTokenData);

    existingUser.refreshToken = refreshToken;
    await existingUser.save({ validateBeforeSave: false });

    const options = {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, options);

    successResponse(res, "User logged in successfully", accessToken);
  } catch (error) {
    console.log(error);
    errorResponse(res, 400, "Error logging in user!", error);
  }
};

export default loginController;
