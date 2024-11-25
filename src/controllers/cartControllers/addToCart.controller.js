import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const addToCart = async (req, res) => {
  const { productData, quantity } = req.body;

  try {
    if (!productData || !quantity)
      return errorResponse(res, 400, "Product data and quantity are required");

    successResponse(res, "Product added to cart successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error adding product to cart");
  }
};

export default addToCart;
