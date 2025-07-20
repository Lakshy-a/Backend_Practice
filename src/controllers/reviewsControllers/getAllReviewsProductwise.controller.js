import { Review } from "../../models/reviews.model.js";
import { Product } from "../../models/product.model.js";
import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";

const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!productId) return errorResponse(res, 400, "Product ID is required");

    const product = await Review.find({ productId })
      .populate("productId")
      .populate("userId");

    if (!product) return errorResponse(res, 404, "Product not found");

    return successResponse(res, "Operation successful", product);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export default getReviewsByProduct;
