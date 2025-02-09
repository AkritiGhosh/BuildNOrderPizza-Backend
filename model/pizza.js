import { PIZZA_SIZE } from "../lib/constants";

const PizzaToppingsSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" },
  quantity: { type: Number, default: 1 },
});

const PizzaSchema = new Schema({
  name: String,
  size: { type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" },
  base: { type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" },
  toppings: [PizzaToppingsSchema],
  basePrice: { type: Number, required: true },
});

const Pizza = model("Pizza", PizzaSchema);
export default Pizza;
