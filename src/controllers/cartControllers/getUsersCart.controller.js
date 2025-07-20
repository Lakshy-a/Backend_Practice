import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const getUsersCart = async (req, res) => {
  const userId = req.user._id; // Assumes req.user contains authenticated user details
  try {
    const fetchedCart = await Cart.findOne({ userId }).populate("products");
    if (!fetchedCart) {
      return errorResponse(res, 404, "Cart not found");
    }

    successResponse(res, "Cart fetched successfully", fetchedCart);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return errorResponse(res, 500, "Error fetching cart");
  }
};

export default getUsersCart;
