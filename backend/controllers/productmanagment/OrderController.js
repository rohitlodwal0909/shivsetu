const db = require("../../models");
const { Order, OrderItem, Product, User } = db;

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: OrderItem,
          as: "order_items", // 👈 same alias as association
          attributes: ["id", "product_id", "quantity"],
          include: [
            {
              model: Product,
              attributes: ["product_name", "price"]
            }
          ]
        },
        {
          model: User,
          as: "user", // 👈 same alias as association
          attributes: ["name", "email"]
        }
      ]
    });

    // ✅ Optional: parse JSON fields
    const formattedOrders = orders.map((order) => {
      const data = order.toJSON();

      return {
        ...data,
        shipping_address: data.shipping_address
          ? JSON.parse(data.shipping_address)
          : null
      };
    });

    return res.status(200).json({
      success: true,
      orders: formattedOrders
    });
  } catch (error) {
    console.error("🔥 MYSQL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Orders fetch failed",
      error: error.original?.message || error.message
    });
  }
};
