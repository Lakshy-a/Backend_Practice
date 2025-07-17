import {
  errorResponse,
  successResponse,
} from "../../utils/apiResponse.utils.js";
import { Product } from "../../models/product.model.js";

const restoreProduct = async (req, res) => {
  const { _id } = req.params;
  //   console.log(_id)
  try {
    if (!_id) return errorResponse(res, 401, "Id is required");

    const product = await Product.findById({ _id });
    if (!product) return errorResponse(res, 404, "Product not found");

    product.isDeleted = false;
    await product.save();

    successResponse(res, "Product Restored Successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Error restoring product");
  }
};

export default restoreProduct;
