import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    billingAddress: {
      type: String,
      default: "",
    },
    shippingAddress: {
      type: String,
      default: "",
    },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    refreshToken: {
      type: String,
      default: "",
    },
    reviewsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

// hash the password before saving it to db and hash it only if it is modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);
