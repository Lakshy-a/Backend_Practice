import { errorResponse } from "../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";

// Middleware to check if the user is logged in
// 1. Get the accessToken from cookies
// 2. if token is not there then user is not logged in
// 3. if it is there, check if the access token is valid
// 4. if valid, send the payload to next middleware with request
// 5. if it is not valid it can be in any of three caese:
//    a. token is expired
//    b. token is invalid
//    c. token is blacklisted

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
