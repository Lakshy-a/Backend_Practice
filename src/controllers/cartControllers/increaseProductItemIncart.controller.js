import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const increaseProductItemIncart = async (req, res) => {
  const { productSize, productId } = req.body;
  try {
    const userId = req.user._id;

    const userCart = await Cart.findOne({userId});
    const findProduct = userCart.products.find(item => item.productId == productId && item.productSize == productSize);

    findProduct.quantity += 1;
    await userCart.save();

    successResponse(res, "Cart item quantity updated successfully...", findProduct);
  } catch (error) {
    return errorResponse(res, 500, "Error updating cart item quantity");
  }
};

export default increaseProductItemIncart;
