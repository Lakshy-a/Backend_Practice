import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewsSchema);
