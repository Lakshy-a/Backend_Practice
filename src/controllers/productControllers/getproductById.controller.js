import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { Product } from "../../models/product.model.js";

const getProductsById = async (req, res) => {
  const id = req.params;
  try {
    // if id is not present in req params respond with error
    if (!id) return errorResponse(res, "Product id is required", 400);

    // find product with give id, if not dound then respond with error
    const product = await Product.findById(id);
    if (!product) return errorResponse(res, "Product not found", 404);

    // success response
    successResponse(res, "Getting products by Id is successfull", product);
  } catch (error) {
    errorResponse(res, 400, "Error getting products by id");
  }
};

export default getProductsById;
