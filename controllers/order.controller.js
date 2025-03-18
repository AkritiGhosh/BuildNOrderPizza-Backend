import { ORDER_DELIVERY_STATUS } from "../lib/constants.js";
import { throwNewError } from "../lib/core";
import PizzaOptions from "../model/options.model.js";
import Order from "../model/orderHistory.model.js";
import UserProfile from "../model/user.profile.model.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const id = req?.user?.profile;
    const profile = await UserProfile.findById(id);
    if (!profile) throwNewError("Profile doesn't exist", 404);

    const orders = profile.orderHistory;
    if (orders?.length == 0)
      res
        .status(200)
        .json({ success: true, message: "Order history is empty", data: [] });

    let orderList = [];
    orders.map(async (orderId) => {
      const order = await Order.findById(orderId);
      orderList.append({
        countItems: order?.items.length,
        items: order?.items?.map((item) => {
          return { name: item?.name, size: item?.size };
        }),
        status: order?.status,
        date: order?.createdAt,
      });
    });
    res.status(200).json({
      success: true,
      message: "Order history fetched successfully",
      data: orderList,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderByDuration = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getOrderByStatus = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getOrderDetails = async (req, res, next) => {
  try {
    const orderId = req?.params?.orderId;
    const order = await Order.findById(orderId);
    if (order) throwNewError("Invalid ID | No order placed with this ID", 404);

    const size = await PizzaOptions.findById(order?.size);
    const crust = await PizzaOptions.findById(order?.crust);
    const sauce = await PizzaOptions.findById(order?.sauce);

    const toppingsList = order?.toppings?.map(async (toppingItem) => {
      const topping = await PizzaOptions.findById(toppingItem?.id);
      return {
        name: topping?.name,
        category: topping.category,
        quantity: toppingItem?.quantity ?? 1,
      };
    });

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: {
        size: size,
        crust: crust,
        sauce: sauce,
        toppings: toppingsList,
        ...order,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const saveCartData = async (req, res, next) => {
  try {
    const newOrderData = req.body;
    const profileId = req.user.profile;
    const profile = await UserProfile.findById(profileId);
    let orders = profile.orderHistory;

    const orderInCart = await Order.create({
      ...newOrderData,
      userId: profileId,
      status: ORDER_DELIVERY_STATUS[0],
    });
    if (!orderInCart) throwNewError("Error saving the cart data", 400);

    if (orders?.length == 0) orders = [orderInCart];
    else
      orders = orders.filter((orderItem) =>
        orderItem?.status == ORDER_DELIVERY_STATUS[0] ? orderInCart : orderItem
      );

    await UserProfile.findByIdAndUpdate(
      profileId,
      { $set: { orderHistory: orders } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart data saved successfully",
      data: orderInCart,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = req.body;
    /*
    order = {items:[], totalAmount:100}
    */
    const profileId = req.user.profile;
    const profile = await UserProfile.findById(profileId);

    let orders = profile.orderHistory;
    const orderPlace = await Order.create({
      ...order,
      userId: profileId,
      status: ORDER_DELIVERY_STATUS[1],
    });

    if (!orderPlace) throwNewError("Error saving the cart data", 400);

    orders?.append(orderPlace);

    await UserProfile.findByIdAndUpdate(
      userId,
      { $set: { orderHistory: orders } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "New order was placed",
      data: orderInCart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const orderId = req?.params?.id;
    const status = req.body.status;

    const order = await Order.findById(orderId);
    if (!order)
      throwNewError("Invalid data | No such order in present in history");

    const updatedData = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: status } },
      { new: true }
    );
    if (!updatedData) throwNewError("Error in updating order status", 400);

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const orderId = req?.params?.id;

    const order = await Order.findById(orderId);
    if (!order)
      throwNewError("Invalid data | No such order in present in history");

    const updatedData = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: ORDER_DELIVERY_STATUS[5] } },
      { new: true }
    );
    if (!updatedData) throwNewError("Error in cancelling the order", 400);

    res.status(200).json({
      success: true,
      message: `Order was cancelled successfully`,
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};
