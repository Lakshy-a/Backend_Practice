import { errorResponse } from "../utils/apiResponse.utils.js";
import jwt, { decode } from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  const getTokenFromRequest = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer "))
      return authHeader.split(" ")[1];
    return null;
  };

  const accessToken = getTokenFromRequest(req);

  if (!accessToken) return errorResponse(res, 500, "Unauthorized");

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

  } catch (error) {
    console.log(error);
    return errorResponse(res, 403, "Invalid or expired token");
  }
  next();
};

export default isLoggedIn;
