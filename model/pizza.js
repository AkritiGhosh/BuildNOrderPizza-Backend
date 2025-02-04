import { PIZZA_SIZE } from "../lib/constants";

const PizzaSchema = new Schema({
  name: String,
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "PizzaOptions" }],
  basePrice: { type: Number, required: true },
});

const Pizza = model("Pizza", PizzaSchema);
export default Pizza;
