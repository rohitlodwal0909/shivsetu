module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      order_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      items: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "JSON string of ordered items"
      },

      shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "JSON string of shipping address"
      },

      payment_method: {
        type: DataTypes.STRING,
        allowNull: false
      },

      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },

      payment_status: {
        type: DataTypes.STRING,
        defaultValue: "pending"
      },

      order_status: {
        type: DataTypes.STRING,
        defaultValue: "processing"
      }
    },
    {
      tableName: "orders",
      timestamps: true,
      underscored: true,
      paranoid: true // soft delete
    }
  );

  return Order;
};
