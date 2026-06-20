module.exports = (sequelize, DataTypes) => {
  const Pandit = sequelize.define(
    "Pandit",
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

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      puja_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      exprience: {
        type: DataTypes.STRING(50)
      },

      price: {
        type: DataTypes.DECIMAL(10, 2), // STRING nahi, DECIMAL use karo
        allowNull: false
      },

      language: {
        type: DataTypes.STRING,
        allowNull: false
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },

      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
      }
    },
    {
      tableName: "pandits",
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  );

  return Pandit;
};
