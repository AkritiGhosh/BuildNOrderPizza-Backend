import { model, Schema } from "mongoose";

const PizzaOptionsSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    category: { type: String, required: true },
    description: String,
    imgSrc: String,
  },
  { timestamps: false }
);

const PizzaOptions = model("PizzaOptions", PizzaOptionsSchema);
export default PizzaOptions;
