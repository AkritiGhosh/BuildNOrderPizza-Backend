import express from "express";
import * as orderController from "../controllers/order.controller.js";
const orderRouter = express.Router();

// Get all orders of a user
orderRouter.get("/", orderController.getAllOrders);

// Get orders of a user from a particular duration
orderRouter.get("/duration/:duration", orderController.getOrderByDuration);

// Get orders of a user from a particular status
orderRouter.get("/status/:status", orderController.getOrderByStatus);

// Get order summary
orderRouter.get("/details/:orderId", orderController.getOrderDetails);

// Place new order for a user
orderRouter.post("/save-cart", orderController.saveCartData);

// Place new order for a user
orderRouter.post("/new", orderController.createOrder);

// Update order status for a particular order
orderRouter.patch("/update-status", orderController.updateStatus);

// Cancel order
orderRouter.patch("/cancel", orderController.cancelOrder);

export default orderRouter