import { errorResponse } from "../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  // Access the token from cookies
  const token = req.cookies.accessToken;

  // console.log("Token from cookie:", token); // For debugging

  // Check if the token is present
  if (!token) {
    return errorResponse(res, 401, "You are not logged in");
  }

  try {
    // Verify the token
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach the decoded payload (user data) to the request object
    req.user = payload;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token errors
    if (error.name === "TokenExpiredError") {
      return errorResponse(
        res,
        401,
        "Your session has expired, please login again"
      );
    } else if (error.name === "JsonWebTokenError") {
      return errorResponse(res, 401, "Invalid token");
    } else {
      return errorResponse(res, 500, "Internal Server Error");
    }
  }
};

export default isLoggedIn;
