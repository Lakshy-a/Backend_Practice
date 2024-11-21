import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { User } from "../../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("reviewsPosted");
    successResponse(res, "Fetched all users successfully", users);
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message, 500);
  }
};

export default getAllUsers;
