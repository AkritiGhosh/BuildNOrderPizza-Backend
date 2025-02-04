const PizzaOptionsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  category: { type: String, required: true },
});

const PizzaOptions = model("PizzaOptions", PizzaOptionsSchema);
export default PizzaOptions;
