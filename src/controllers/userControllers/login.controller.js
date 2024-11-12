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
  // 1. Collect data from req.body
  // 2. Check if all the fields are coming or not
  // 3. Find the user exists with entered email or username
  // 4. Verify if password is same or not
  // 5. If yes, generate the access token and refresh token
  // 6. Send the access token in cookies
  // 7. Send the response as OK is everything goes ok

  const { email, password } = req.body;

  try {
    // checking email and password are there or not
    if (!email || !password)
      return errorResponse(res, 401, "All the fields are required...");

    // check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) return handleError(res, 404, "User not found...");

    // check the password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) return handleError(res, 400, "Incorrect password...");
    // console.log(isValidPassword)

    // generate the access token
    const accessTokenData = {
      _id: existingUser._id,
      email: existingUser.email,
      name: existingUser.fullName,
    };
    const accessToken = generateAccessToken(accessTokenData);

    // generate the refresh token
    const refreshTokenData = { _id: existingUser._id };
    const refreshToken = generateRefreshToken(refreshTokenData);

    // save the refresh token to db so that I do not require user to login again and again
    existingUser.refreshToken = refreshToken;
    await existingUser.save({ validateBeforeSave: false });

    const options = {
      httpOnly: false, // prevents client-side JavaScript from accessing the cookie.
      secure: true, // ensures that the cookie is only sent over HTTPS connections.
      sameSite: "none",
      secure: true,
    };

    // set access token as cookies
    res.cookie("accessToken", accessToken, options);
    // console.log(req.cookies.accessToken)

    // send the success message
    successResponse(res, "User logged in successfully");
  } catch (error) {
    console.log(error);
    errorResponse(res, 400, "Error logging in user!", error);
  }
};

export default loginController;
