import { Cart } from "../../models/cart.model.js";
import { User } from "../../models/user.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

const addToCart = async (req, res) => {
  const { productData, quantity } = req.body;
  console.log(req.user._id);
  console.log(productData);
  console.log(quantity);

  try {
    if (!productData)
      return errorResponse(res, 400, "Product data is required");

    // Find the cart for the logged-in user
    let cart = await Cart.findOne({ userId: req.user._id });

    // If no cart exists, create a new cart
    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        products: [productData.productId],
      });
    } else {
      // If cart exists, add the new product to the existing cart's products
      cart.products.push(productData.productId);
    }

    // Save the cart (either newly created or updated)
    const savedCart = await cart.save();

    const fetchedUser = await User.findById(req.user._id);
    fetchedUser.cartId = savedCart._id;
    await fetchedUser.save();

    successResponse(res, "Product added to cart successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    return errorResponse(res, 500, "Error adding product to cart");
  }
};

export default addToCart;
