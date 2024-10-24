import { errorResponse } from "../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return errorResponse(res, 401, "You are not logged in");
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("Token is valid", payload);

    req.user = payload;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return errorResponse(
        res,
        401,
        "Your session has expired, please login again"
      );
    else if (error.name === "JsonWebTokenError")
      return errorResponse(res, 401, "Invalid token");
    else return errorResponse(res, 500, "Internal Server Error");
  }
};

export default isLoggedIn;
