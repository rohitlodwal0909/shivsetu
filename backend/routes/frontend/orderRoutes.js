const express = require("express");
const router = express.Router();

const OrderController = require("../../controllers/frontend/OrderController");

router.post("/create", OrderController.createOrder);
router.get("/my-orders", OrderController.getMyOrders);

router.post("/create-order", OrderController.create);
router.post("/verify-payment", OrderController.verifyPayment);

module.exports = router;
