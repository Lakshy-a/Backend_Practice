import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const logoutController = async (req, res) => {
  // 1. fetch the access token from the cookies
  // 2. verify the access token using access token secret
  // 3. get the _id from there
  // 4. search if the refresh token is not empty of the user with this _id
  // 5. if it is not empty, delete the refresh token from the   user also clear the cookies
  // 6. return a response with a success message

  try {
    // get the access token from the cookies
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      return errorResponse(res, 401, "You are not logged in...");

    // verify the access token using secret and get the _id from there
    const userId = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!userId) return errorResponse(res, 401, "Invalid access token");

    // now find the user with given _id
    const user = await User.findById(userId._id);
    if (!user) return errorResponse(res, 401, "User not found");

    // set the refresh token of user with _id to empty and save the user with empty refresh token
    user.refreshToken = "";
    await user.save();

    // clear the cookies
    // res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.cookie("accessToken", "");
    // localStorage.clear();

    // send the success message
    successResponse(res, 200, "User logged out successfully...");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error occurring while logging out the user..." });
  }
};

export default logoutController;
