import { throwNewError } from "../lib/core";
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
        items: order.items.length,
        status: order.status,
        date: order.createdAt,
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

export const getOrderDetails = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (order) throwNewError("Invalid ID | No order placed with this ID", 404);
    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const postNewOrder = async (req, res, next) => {
    
  try {
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
