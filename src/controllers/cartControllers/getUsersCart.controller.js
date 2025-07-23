import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const getUsersCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const fetchedCart = await Cart.findOne({ userId });
    
    if (!fetchedCart) {
      fetchedCart = {
        userId,
        cartItems: [],
        cartCount: 0,
      };
    }

    successResponse(res, "Cart fetched successfully", fetchedCart);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return errorResponse(res, 500, "Error fetching cart");
  }
};

export default getUsersCart;
