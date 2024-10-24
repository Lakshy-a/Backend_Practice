import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import jwt, { decode } from "jsonwebtoken";
import { Admin } from "../../models/admin.model.js";

const adminLogout = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return errorResponse(res, 401, "You are not logged in");

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const adminEmail = decoded.adminEmail;

    const isExist = await Admin.findOne({ adminEmail });
    if (!isExist) return errorResponse(res, 401, "No such user found");

    isExist.refreshToken = "";
    await isExist.save();

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    });

    successResponse(res, "Admin Logout Successful");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error logout admin...");
  }
};

export default adminLogout;
