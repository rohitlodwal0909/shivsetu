const db = require("../../models");
const { Order } = db;

/* ================= CREATE ORDER ================= */

exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shipping_address,
      payment_method,
      total_amount,
      order_number
    } = req.body;

    // Basic validation
    if (!items || !total_amount) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const newOrder = await Order.create({
      user_id: 1,
      order_number,
      items: JSON.stringify(items),
      shipping_address: JSON.stringify(shipping_address),
      payment_method,
      total_amount,
      status: "pending"
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.original?.message || error.message
    });
  }
};

/* ================= GET MY ORDERS ================= */

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.original?.message || error.message
    });
  }
};
