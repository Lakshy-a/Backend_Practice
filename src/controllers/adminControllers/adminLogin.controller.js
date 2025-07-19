import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { Admin } from "../../models/admin.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens.utils.js";

const adminLogin = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  try {
    if (!adminEmail || !adminPassword)
      return errorResponse(res, 400, "Please enter both email and password");

    const isExist = await Admin.findOne({ adminEmail });
    if (!isExist) return errorResponse(res, 400, "Admin not found");

    const isPasswordCorrect = await bcrypt.compare(
      adminPassword,
      isExist.adminPassword,
    );
    if (!isPasswordCorrect) return errorResponse(res, 400, "Invalid password");

    const accessTokenData = {
      _id: isExist._id,
      email: isExist.email,
      name: isExist.fullName,
      role: isExist.role,
    };

    const accessToken = generateAccessToken(accessTokenData);
    const refreshToken = generateRefreshToken({
      adminEmail,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: true,
    });

    isExist.refreshToken = refreshToken;
    await isExist.save();

    successResponse(res, "Admin Login Successful");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error login admin...");
  }
};

export default adminLogin;
