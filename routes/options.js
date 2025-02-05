import express from "express";
import PizzaOptions from "../model/pizzaOptions.js";

const optionRouter = express.Router();

const restructurePizzaOptionJSON = (array) => {
  return array.map((ele) => {
    return {
      name: ele?.name,
      price: ele?.price,
      isAvailable: ele?.isAvailable,
    };
  });
};

optionRouter.get("/", async (req, res) => {
  try {
    const pizzaOptions = await PizzaOptions.find();

    if (!pizzaOptions || pizzaOptions.length === 0) {
      return res.status(300).json({ msg: "No data added yet" });
    }

    // Extract unique categories
    const categories = [...new Set(pizzaOptions.map((opt) => opt.category))];

    // Categorize options
    const categorizedOptions = categories.map((category) => ({
      category: category,
      data: restructurePizzaOptionJSON(
        pizzaOptions.filter((opt) => opt.category === category)
      ),
    }));

    return res.status(200).json({ data: categorizedOptions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching the pizza options", error });
  }
});

optionRouter.get("/:category", async (req, res) => {
  try {
    const category = req?.params?.category;
    const pizzaOptions = await PizzaOptions.find({ category: category });

    if (!pizzaOptions || pizzaOptions.length === 0) {
      return res.status(300).json({ msg: "No data added yet" });
    }

    // Categorize options
    const categorizedOptions = {
      category: category,
      data: restructurePizzaOptionJSON(pizzaOptions),
    };

    return res.status(200).json({ data: categorizedOptions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching the pizza options", error });
  }
});

// Add a new pizza option
optionRouter.post("/add", async (req, res) => {
  try {
    const { name, price, isAvailable } = req.body;
    const pizzaOptions = new PizzaOptions({
      name,
      price,
      isAvailable,
      category,
    });
    await pizzaOptions.save();
    res.status(201).json(pizzaOptions);
  } catch (error) {
    res.status(500).json({ message: "Error adding this pizza option", error });
  }
});

optionRouter.post("/addMultiple", async (req, res) => {
  try {
    const options = req?.body?.options; // Expecting an array of options

    if (!Array.isArray(options) || options?.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid input: Expecting an array of options" });
    }

    const insertedoptions = await PizzaOptions.insertMany(options);
    res
      .status(201)
      .json({ message: "options added successfully!", data: insertedoptions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding options", error: error.message });
  }
});

export default optionRouter;
