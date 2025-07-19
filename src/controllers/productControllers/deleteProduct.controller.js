import { Product } from "../../models/product.model.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";

// deleting the product on the basis of id
// search the product
// mark isDeleted field as true
// on UI show only those products which have isDeleted false

const deleteProduct = async (req, res) => {
  const { _id } = req.params;
  try {
    // checking if id is coming in request or not
    if (!_id) return errorResponse(res, 400, "Product id is required");

    // find the product with this id
    const existingProduct = await Product.findById({ _id });

    //check if the product exists
    if (!existingProduct) return errorResponse(res, 404, "Product not found");

    // is yes then mark it as deleted
    existingProduct.isDeleted = true;

    // save the changes
    await existingProduct.save();

    // send success response
    return successResponse(res, "Product deleted successfully...");
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message);
  }
};

export default deleteProduct;
