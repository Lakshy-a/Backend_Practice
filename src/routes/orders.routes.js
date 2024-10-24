import express from "express";
import createOrder from "../controllers/ordersController/createOrder.controller.js";
import deleteOrder from "../controllers/ordersController/deleteOrder.controller.js";
import updateOrderStatus from "../controllers/ordersController/updateOrderStatus.controller.js";
import updatePaymentStatus from "../controllers/ordersController/updatePaymentStatus.controller.js";
import getAllOrders from "../controllers/ordersController/getAllOrders.controller.js";
import getOrderById from "../controllers/ordersController/getOrderById.controller.js";
import getOrderByUser from "../controllers/ordersController/getOrderByUser.controller.js";

const router = express.Router();

router.get("/getAllOrders", getAllOrders);
router.get("/getOrderById/:orderId", getOrderById);
router.get("/getOrderByUser/:userId", getOrderByUser);
router.post("/createOrder", createOrder);
router.delete("/deleteOrder", deleteOrder);
router.put("/updateOrderStatus", updateOrderStatus);
router.put("/updatePaymentStatus", updatePaymentStatus);

export default router;
