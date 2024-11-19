import mongoose from "mongoose";

const shippingSchema = mongoose.Schema({}, { timestamps: true });

export const Shipping = mongoose.model("Shipping", shippingSchema);
