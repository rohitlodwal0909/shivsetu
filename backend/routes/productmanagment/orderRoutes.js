const express = require("express");
const router = express.Router();

const OrderController = require("../../controllers/productmanagment/OrderController");

router.get("/find", OrderController.getOrders);

module.exports = router;
