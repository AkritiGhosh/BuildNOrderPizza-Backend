import { PIZZA_OPTION_CATEGORIES } from "../lib/constants.js";
import { throwNewError } from "../lib/core.js";
import PizzaOptions from "../model/pizzaOptions.js";

const restructurePizzaBaseJSON = (array) => {
  return array.map((ele) => {
    return {
      _id: ele?._id,
      name: ele?.name,
      price: ele?.price,
      isAvailable: ele?.isAvailable,
      description: ele?.description,
    };
  });
};

const restructurePizzaOptionJSON = (array) => {
  return array.map((ele) => {
    return {
      _id: ele?._id,
      name: ele?.name,
      price: ele?.price,
      isAvailable: ele?.isAvailable,
      imgSrc: ele?.imgSrc,
    };
  });
};

export const getAllPizzaOptions = async (req, res, next) => {
  try {
    const pizzaOptions = await PizzaOptions.find();

    if (!pizzaOptions || pizzaOptions.length === 0) {
      return res.status(300).json({ msg: "No data added yet" });
    }

    // Extract unique categories
    const categories = [...new Set(pizzaOptions.map((opt) => opt.category))];

    // Categorize options
    const toppings = categories.map((category) =>
      category == PIZZA_OPTION_CATEGORIES.VEG ||
      category == PIZZA_OPTION_CATEGORIES.NONVEG
        ? {
            category: category,
            data: restructurePizzaOptionJSON(
              pizzaOptions.filter((opt) => opt.category === category)
            ),
          }
        : null
    );

    return res.status(200).json({
      data: {
        size: restructurePizzaBaseJSON(
          pizzaOptions.filter(
            (opt) => opt.category == PIZZA_OPTION_CATEGORIES.SIZE
          )
        ),
        crust: restructurePizzaBaseJSON(
          pizzaOptions.filter(
            (opt) => opt.category == PIZZA_OPTION_CATEGORIES.CRUST
          )
        ),
        sauce: restructurePizzaOptionJSON(
          pizzaOptions.filter(
            (opt) => opt.category == PIZZA_OPTION_CATEGORIES.SAUCE
          )
        ),
        toppings: toppings.filter((topping) => topping != null),
        cheese: restructurePizzaOptionJSON(
          pizzaOptions.filter(
            (opt) => opt.category == PIZZA_OPTION_CATEGORIES.CHEESE
          )
        ),
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching the pizza options", error });
  }
};

export const getOptionsByCategory = async (req, res, next) => {
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
};

export const addNewOption = async (req, res, next) => {
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
};

export const editOption = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const pizzaOption = await PizzaOptions.findById(id);
    if (!pizzaOption) throwNewError("No option found | Invalid ID", 404);
    let newObject = { ...pizzaOption, ...updatedData };

    res.status(201).json(pizzaOption);
  } catch (error) {
    res.status(500).json({ message: "Error adding this pizza option", error });
  }
};

export const addMultipleOptions = async (req, res, next) => {
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
};
