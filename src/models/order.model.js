import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  shippingCharges: {
    type: Number,
    min: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productDetails: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    transactionDetails: {
      paymentStatus: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending",
      },
      transactionId: {
        type: String,
      },
    },
    orderDetails: orderDetailsSchema,
    deliveryInfo: {
      estimatedDelivery: {
        type: Date,
      },
      deliveredAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Order", orderSchema);
