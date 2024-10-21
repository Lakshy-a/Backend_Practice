import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { Product } from "../../models/product.model.js";

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    if (!category) return errorResponse(res, "Category is required", 400);

    const products = await Product.find({ productCategory: category });

    if (!products || products.length == 0)
      return errorResponse(res, "No products found in this category", 404);

    successResponse(res, "fetched product by category successfully", products);
  } catch (error) {
    errorResponse(res, 400, "error getting products by category");
  }
};

export default getProductsByCategory;
