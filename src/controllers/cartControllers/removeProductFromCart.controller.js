import mongoose from "mongoose";
import { Cart } from "../../models/cart.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const removeProductFromCart = async (req, res) => {
  const { productId, productSize } = req.body;
  const userId = req.user._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return errorResponse(res, 400, "Invalid productId");
    }

    if (!productSize) {
      return errorResponse(res, 400, "productSize is required");
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: {
          products: {
            productId: new mongoose.Types.ObjectId(productId),
            productSize
          },
        },
      },
      { new: true }
    );

    successResponse(res, "Product removed from cart successfully...");
  } catch (error) {
    return errorResponse(res, 500, `Error removing product from quantity, ${error}`);
  }
};

export default removeProductFromCart;
