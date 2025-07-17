import mongoose from "mongoose";

const couponsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const Coupons = mongoose.model("Coupon", couponsSchema);
