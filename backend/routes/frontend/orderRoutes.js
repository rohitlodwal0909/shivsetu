const express = require("express");
const router = express.Router();

const OrderController = require("../../controllers/frontend/OrderController");

router.post("/create", OrderController.createOrder);
router.get("/my-orders", OrderController.getMyOrders);

module.exports = router;
