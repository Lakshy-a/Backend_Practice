import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const updateCartItemQuantity = (req, res) => {
  try {
    successResponse(res, "Cart item quantity updated successfully...");
  } catch (error) {
    return errorResponse(res, 500, "Error updating cart item quantity");
  }
};

export default updateCartItemQuantity;
