import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.utils.js";
import jwt from "jsonwebtoken";
import { Review } from "../../models/reviews.model.js";
import { Product } from "../../models/product.model.js";
import { User } from "../../models/user.model.js";

const addReview = async (req, res) => {
  const { rating, review, productId } = req.body;
  try {
    if(!rating || !review || !productId){
      return errorResponse(res, 400, "Please fill all the fields");
    }
    // const isEmpty = [rating, review, productId].some((item) => !item);
    // if (isEmpty) return errorResponse(res, 400, "Please fill all fields");

    const token = req.cookies.accessToken;
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = userData._id;

    const savedReview = await Review.create({
      rating,
      review,
      productId,
      userId,
    });

    const findProduct = await Product.findById(productId).populate("reviews");
    if (!findProduct) return errorResponse(res, 404, "Product not found");

    const totalReviews = findProduct.reviews.length + 1;
    const totalRating =
      findProduct.reviews.reduce((sum, review) => sum + review.rating, 0) +
      rating;
    const averageRating = totalRating / totalReviews;

    // Step 2: Push the new review's ID into the product's reviews array
    await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: savedReview._id }, averageRating: averageRating },
      { new: true } // Return the updated product
    );

    // push the review id into the reviewsPosted array os user
    await User.findByIdAndUpdate(
      userId,
      { $push: { reviewsPosted: savedReview._id } },
      { new: true }
    );

    return successResponse(res, "Review added successfully...");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Some internal error occurred");
  }
};

export default addReview;
