import express from "express";
import * as orderController from "../controllers/order.js";
const orderRouter = express.Router();

// Get all orders of a user
orderRouter.get("/", orderController.getAllOrders);

// Get orders of a user from a particular duration
orderRouter.get("/:duration", orderController.getOrderByDuration);

// Get order summary
orderRouter.get("/details/:id", orderController.getOrderDetails);

// Place new order for a user
orderRouter.post("/new", orderController.postNewOrder);

// Update order status for a particular order
orderRouter.patch("/update-status", orderController.updateStatus);

// Cancel order
orderRouter.patch("/cancel", orderController.cancelOrder);

export default orderRouter