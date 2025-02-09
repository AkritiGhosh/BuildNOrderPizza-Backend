import PizzaOptions from "../model/pizzaOptions.js";

const restructurePizzaCrustJSON = (array) => {
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

export const getAllPizzaOptions = async (req, res) => {
  try {
    const pizzaOptions = await PizzaOptions.find();

    if (!pizzaOptions || pizzaOptions.length === 0) {
      return res.status(300).json({ msg: "No data added yet" });
    }

    // Extract unique categories
    const categories = [...new Set(pizzaOptions.map((opt) => opt.category))];

    // Categorize options
    const toppings = categories.map((category) =>
      category != "Crust" && category != "Size"
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
        size: restructurePizzaCrustJSON(
          pizzaOptions.filter((opt) => opt.category == "Size")
        ),
        crust: restructurePizzaCrustJSON(
          pizzaOptions.filter((opt) => opt.category == "Crust")
        ),
        toppings: toppings.filter((topping) => topping != null),
      },
    });
    
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching the pizza options", error });
  }
};

export const getOptionsByCategory = async (req, res) => {
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

export const addNewOption = async (req, res) => {
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

export const addMultipleOptions = async (req, res) => {
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
