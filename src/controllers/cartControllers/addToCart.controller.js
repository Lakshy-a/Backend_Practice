import { Cart } from "../../models/cart.model.js";
import { User } from "../../models/user.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const addToCart = async (req, res) => {
  const { productData, quantity } = req.body;

  try {
    if (!productData)
      return errorResponse(res, 400, "Product data is required");

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        products: [{
          productId: productData.productId,
          quantity: quantity || 1,
          productSize: productData.productSize,
          productPrice: productData.productPrice,
          productImage: productData.productImage,
          productTitle: productData.productTitle
        }],
      });
    } else {
      cart.products.push({
        productId: productData.productId,
        quantity: quantity || 1,
        productSize: productData.productSize,
        productPrice: productData.productPrice,
        productImage: productData.productImage,
        productTitle: productData.productTitle
      });
    }

    const savedCart = await cart.save();

    const fetchedUser = await User.findById(req.user._id);
    fetchedUser.cartId = savedCart._id;
    await fetchedUser.save();

    successResponse(res, "Product added to cart successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Error adding product to cart");
  }
};

export default addToCart;
