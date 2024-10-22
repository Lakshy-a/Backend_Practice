import mongoose from "mongoose";

const orderSchema = mongoose.Schema({}, { timestamps: true });

export const Orders = mongoose.model("Order", orderSchema);
