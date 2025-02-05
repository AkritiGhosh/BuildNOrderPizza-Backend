import mongoose from "mongoose";
import { ORDER_DELIVERY_STATUS } from "../lib/constants";

const { Schema, model } = mongoose;

const PizzaItem = new Schema({
  type: mongoose.Schema.Types.ObjectId,
  ref: "Pizza",
  required: true,
});

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [PizzaItem],
    baseAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    // discountsAvailable:[String],
    // discountApplied: [String],
    // instructions: [String],
    status: {
      type: String,
      enum: ORDER_DELIVERY_STATUS,
      default: ORDER_DELIVERY_STATUS[0],
    },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;
