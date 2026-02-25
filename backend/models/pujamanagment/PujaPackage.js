module.exports = (sequelize, DataTypes) => {
    const PujaPackage = sequelize.define(
        "PujaPackage",
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

            puja_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2), // STRING nahi, DECIMAL use karo
                allowNull: false,
            },
            persons: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("active", "inactive"),
                defaultValue: "active",
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
            tableName: "puja_packages",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete
        },
    );

    PujaPackage.associate = (models) => {
        PujaPackage.belongsTo(models.Puja, {
            foreignKey: "puja_id",
            as: "puja",
        });
    };

    return PujaPackage;
};
