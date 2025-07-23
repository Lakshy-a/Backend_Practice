import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { Product } from "../../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    // find all the products
    const allProducts = await Product.find().lean();

    successResponse(res, "Successfully fetched all products", allProducts);
  } catch (error) {
    errorResponse(400, "Error getting all products", error);
  }
};

export default getAllProducts;
