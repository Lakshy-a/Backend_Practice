import { errorResponse } from "../utils/apiResponse.utils.js";


export const whatRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return errorResponse(res, 500, "You are not authorized to access this resource.")
    }

    next();
  };
};