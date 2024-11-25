import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const getUsersCart = (req, res) => {
  try {
    successResponse(res, "Cart fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error fetching cart ");
  }
};

export default getUsersCart;
