import { Cart } from "../../models/cart.model.js";
import {successResponse, errorResponse} from "../../utils/apiResponse.utils.js"

const clearCart = (req, res) => {
    try {
        successResponse(res, "Cart cleared successfully...")
    } catch (error) {
        return errorResponse(res, 500, "Error clearing cart")
    }
}

export default clearCart;