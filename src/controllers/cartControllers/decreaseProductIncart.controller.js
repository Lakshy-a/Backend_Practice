import { Cart } from "../../models/cart.model.js";
import { errorResponse, successResponse } from "../../utils/apiResponse.utils.js"

export const decreaseProductItemIncart = async (req, res) => {
    const { productId, productSize } = req.body;
    const userId = req.user._id;

    try {
        const usercart = await Cart.findOne({ userId });

        const findProduct = usercart.products.find(item => item.productId == productId && item.productSize == productSize);

        findProduct.quantity -= 1;

        await usercart.save();

        successResponse(res, "Product quantity decresed successfully", findProduct);
    } catch (error) {
        return errorResponse(res, 500, "Internal Server Error");
    }
}

