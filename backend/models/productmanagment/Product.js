module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },

      short_description: {
        type: DataTypes.STRING
      },

      full_description: {
        type: DataTypes.TEXT
      },

      price: {
        type: DataTypes.STRING,
        allowNull: false
      },

      mrp: {
        type: DataTypes.STRING,
        allowNull: false
      },

      discount_percent: {
        type: DataTypes.STRING,
        allowNull: false
      },

      stock_quantity: {
        type: DataTypes.STRING
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "image path"
      },
      gallery: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Multiple image paths"
      },

      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "products",
      timestamps: true,
      underscored: true,
      paranoid: true // soft delete
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category"
    });
    Product.hasMany(models.OrderItem, {
      foreignKey: "product_id"
    });
  };

  return Product;
};
