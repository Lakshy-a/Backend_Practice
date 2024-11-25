import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const removeProductFromCart = (req, res) => {
  try {
    successResponse(res, "Product removed from cart successfully...");
  } catch (error) {
    return errorResponse(res, 500, "Error removing product from quantity");
  }
};

export default removeProductFromCart;
