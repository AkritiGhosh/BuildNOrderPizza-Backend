import { PIZZA_OPTION_CATEGORIES } from "../lib/constants.js";
import { throwNewError } from "../lib/core.js";
import PizzaOptions from "../model/options.model.js";

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

    // If no options in DB
    if (!pizzaOptions || pizzaOptions.length === 0)
      throwNewError("There are no pizza options in the database", 404);

    // Extract unique categories
    const categories = [...new Set(pizzaOptions.map((opt) => opt.category))];

    // If there are no categories
    if (!categories || categories?.length === 0)
      throwNewError("No categories added for pizza options", 500);

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
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
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
    next();
  } catch (error) {
    next(error);
  }
};

export const getOptionsByCategory = async (req, res, next) => {
  try {
    const category = req?.params?.category;
    if (!Object.values(PIZZA_OPTION_CATEGORIES).includes(category))
      throwNewError("There is no such category", 400);

    const pizzaOptions = await PizzaOptions.find({ category: category });

    if (!pizzaOptions || pizzaOptions.length === 0)
      throwNewError("There are no pizza option of this category", 404);

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: restructurePizzaOptionJSON(pizzaOptions),
    });
    next();
  } catch (error) {
    next(error);
  }
};

export const addNewOption = async (req, res, next) => {
  try {
    const { name, price, isAvailable, category, imgSrc, description } =
      req.body;
    if (!name || !price || !category)
      throwNewError("Not enough data to add a new option", 400);

    let newObj = { name, price, isAvailable, category };
    if (imgSrc) newObj.imgSrc = imgSrc;
    if (description) newObj.description = description;

    const pizzaOptions = new PizzaOptions(newObj);
    await pizzaOptions.save();
    res.status(201).json({
      success: true,
      message: "Option added successfully",
      data: pizzaOptions,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export const editOption = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pizzaOption = await PizzaOptions.findById(id);

    if (!pizzaOption) throwNewError("No option found | Invalid ID", 404);

    const updatedData = await PizzaOptions.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedData) throwNewError("Unable to update value", 400);

    res.status(200).json({
      success: true,
      message: "Options updated successfully!",
      data: updatedData,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export const addMultipleOptions = async (req, res, next) => {
  try {
    const options = req?.body?.options; // Expecting an array of options

    if (!Array.isArray(options) || options?.length === 0) {
      throwNewError("Invalid input: Expecting an array of options", 400);
    }

    const insertedoptions = await PizzaOptions.insertMany(options);
    res.status(201).json({
      success: true,
      message: "Options added successfully!",
      data: insertedoptions,
    });
  } catch (error) {
    next(error);
  }
};

export const editMultipleOptions = async (req, res, next) => {
  try {
    const options = req?.body; // Expecting an array of options

    if (!Array.isArray(options) || options?.length === 0)
      throwNewError("Invalid input: Expecting an array of options", 400);

    options.forEach(async (element) => {
      if (!element.id) throwNewError("Invalid data" + element.id, 400);
      const pizzaOption = await PizzaOptions.findById(element.id);

      if (!pizzaOption) throwNewError("No option found | Invalid ID", 404);

      const updatedData = await PizzaOptions.findByIdAndUpdate(
        element.id,
        { $set: element.data },
        { new: true, runValidators: true }
      );
      if (!updatedData) throwNewError("Unable to update value", 400);
    });

    res.status(200).json({
      success: true,
      message: "Options added successfully!",
    });
  } catch (error) {
    next(error);
  }
};
