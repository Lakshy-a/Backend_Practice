import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { errorResponse } from "../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return errorResponse(res, 401, "You are not logged in");
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (payload.role === "customer") {
      const isUserLoggedOut = await User.findOne({ email: payload.email });

      if (!isUserLoggedOut.refreshToken) {
        return errorResponse(res, 403, "Forbidden");
      }
    } else {
      const isAdminLoggedOut = await Admin.findOne({ adminEmail: payload.email });

      if (!isAdminLoggedOut.refreshToken) {
        return errorResponse(res, 403, "Forbidden");
      }
    }

    req.user = payload;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(
        res,
        401,
        "Your session has expired, please login again",
      );
    } else if (error.name === "JsonWebTokenError") {
      return errorResponse(res, 401, "Invalid token");
    } else {
      return errorResponse(res, 500, "Internal Server Error");
    }
  }
};

export default isLoggedIn;
