import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import { Review } from "../../models/reviews.model.js";
import { Product } from "../../models/product.model.js";

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    // check if reviewId is there in req or not
    if (!reviewId) return errorResponse(res, 400, "Review ID is required");

    // find the review with this Id and check if review with this id exists or not
    const review = await Review.findById(reviewId);
    if (!review) return errorResponse(res, 404, "No such review exists");

    // take out the product id from review, find product with this productId, remove the review Id from the reviews array of product
    const productId = review.productId;
    const findProduct = await Product.findById(productId);

    if (!findProduct) return errorResponse(res, 404, "Product not found");

    // filtering the reviews array
    findProduct.reviews = findProduct.reviews.filter(
      (revId) => revId.toString() !== reviewId,
    );

    // saving the changes
    await findProduct.save();

    // finally deleting the review from review collection
    await Review.deleteOne({ _id: reviewId });

    // sending the success response
    successResponse(res, "Review Deleted Successfully");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internal error occurred");
  }
};

export default deleteReview;
