import mongoose from "mongoose";
import { ORDER_DELIVERY_STATUS } from "../lib/constants.js";

const { Schema, model } = mongoose;

const PizzaToppingsSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" },
  quantity: { type: Number, default: 1 },
});

const PizzaSchema = new Schema({
  name: String,
  size: { type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" },
  base: { type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" },
  sauce:{ type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" },
  toppings: [PizzaToppingsSchema],
  basePrice: { type: Number, required: true },
});

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [PizzaSchema],
    totalAmount: { type: Number, required: true },
    // discountsAvailable:[String],
    // discountApplied: [String],
    // instructions: [String],
    status: {
      type: String,
      enum: ORDER_DELIVERY_STATUS,
      default: ORDER_DELIVERY_STATUS[1],
    },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;
