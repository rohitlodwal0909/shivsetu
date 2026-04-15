module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "order_items",
      timestamps: true,
      underscored: true,
      paranoid: true // soft delete
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: "order_id"
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: "product_id"
    });
  };

  return OrderItem;
};
