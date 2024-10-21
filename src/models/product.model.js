import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCategory: {
      enum: ["Women", "Men", "Kids"],
      type: String,
      default: "Uncategorized",
    },
    productSubCategory: {
      type: String,
      enum: ["Topwear", "Bottomwear", "Winterwear"],
      default: "Uncategorized",
    },
    productPrice: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    productDiscountedPrice: {
      type: Number,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, "Stock can't be negative"],
    },
    images: {
      type: Array,
      default: [],
    },
    availableSizes: {
      type: Array,
      default: [],

      required: true,
    },
    availableColors: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewCollection: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.productDiscountedPrice > this.productPrice) {
    const error = new Error(
      "Discounted price cannot be greater than the original price."
    );
    return next(error);
  }
  next();
});

export const Product = mongoose.model("Product", productSchema);
