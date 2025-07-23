import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        productSize: { type: String, required: true },
        productImage: { type: String, required: true },
        productPrice: { type: Number, required: true },
        productTitle: { type: String, required: true }
      },
    ],
  },
  { timestamps: true },
);

export const Cart = mongoose.model("Cart", cartSchema);
