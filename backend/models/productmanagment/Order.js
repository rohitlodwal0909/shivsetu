module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            order_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            total_amount: {
                type: DataTypes.STRING,
            },

            qty: {
                type: DataTypes.STRING,
            },

            shipping_charge: {
                type: DataTypes.STRING,
            },

            payment_status: {
                type: DataTypes.STRING,
            },

            delivery_address: {
                type: DataTypes.STRING,
            },
            invoice_no: {
                type: DataTypes.STRING,
            },

            order_status: {
                type: DataTypes.ENUM("placed", "shipped", "delivered"),
                defaultValue: "placed",
            },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "orders",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete
        },
    );

    Order.associate = (models) => {
        Order.belongsTo(models.Category, {
            foreignKey: "category_id",
            as: "category",
        });
    };

    return Order;
};
