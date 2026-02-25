module.exports = (sequelize, DataTypes) => {
    const Puja = sequelize.define(
        "Puja",
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

            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            puja_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            description: {
                type: DataTypes.TEXT, // STRING se better TEXT
                allowNull: false,
            },

            puja_duration: {
                type: DataTypes.STRING(50), // ex: 2 Hours / 1 Day
                allowNull: false,
            },

            price: {
                type: DataTypes.DECIMAL(10, 2), // STRING nahi, DECIMAL use karo
                allowNull: false,
            },

            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            date: {
                type: DataTypes.DATE, // STRING nahi, proper DATE
                allowNull: false,
            },

            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            gallery: {
                type: DataTypes.JSON, // Multiple images ke liye JSON
                allowNull: true,
            },

            status: {
                type: DataTypes.ENUM("active", "inactive"),
                defaultValue: "active",
            },
        },
        {
            tableName: "pujas",
            timestamps: true,
            underscored: true,
            paranoid: true,
        },
    );

    Puja.associate = (models) => {
        Puja.belongsTo(models.PujaCategory, {
            foreignKey: "category_id",
            as: "puja_category",
        });

        Puja.hasMany(models.PujaPackage, {
            foreignKey: "puja_id",
            as: "packages",
        });
    };

    return Puja;
};
