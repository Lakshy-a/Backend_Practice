import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import jwt, { decode } from "jsonwebtoken";
import { Admin } from "../../models/admin.model.js";

const adminLogout = async (req, res) => {
  try {
    const isExist = await Admin.findOne({ adminEmail: req.user.email });
    if (!isExist) return errorResponse(res, 401, "No such user found");

    isExist.refreshToken = "";
    await isExist.save();

    successResponse(res, "Admin Logout Successful");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error logout admin...");
  }
};

export default adminLogout;
