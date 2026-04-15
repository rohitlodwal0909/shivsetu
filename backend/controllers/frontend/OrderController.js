const db = require("../../models");
const { Order, OrderItem } = db;

const { sequelize } = db;

/* ================= CREATE ORDER ================= */

exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      items,
      shipping_address,
      payment_method,
      total_amount,
      order_number
    } = req.body;

    if (!items || !items.length || !total_amount) {
      return res.status(400).json({
        success: false,
        message: "Items and total amount required"
      });
    }

    const user_id = req.user.id;

    // ✅ Step 1: Create Order
    const newOrder = await Order.create(
      {
        user_id,
        order_number,
        shipping_address: JSON.stringify(shipping_address),
        payment_method,
        total_amount,
        status: "pending"
      },
      { transaction }
    );

    // ✅ Step 2: Prepare OrderItems
    const orderItemsData = items.map((item) => ({
      order_id: newOrder.id,
      product_id: item.id,
      quantity: item.quantity
    }));

    // ✅ Step 3: Bulk insert into OrderItem table
    await OrderItem.bulkCreate(orderItemsData, { transaction });

    // ✅ Commit transaction
    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder
    });
  } catch (error) {
    await transaction.rollback();

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
