module.exports = (sequelize, DataTypes) => {
    const Package = sequelize.define(
        "Package",
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

            package_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            tour_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            state_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            start_city: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            duration_days: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },

            max_person: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            start_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            end_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },

            inclusions: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            exclusions: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            highlights: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            banner_image: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "Banner image path",
            },

            gallery: {
                type: DataTypes.JSON,
                allowNull: true,
                comment: "Multiple image paths",
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
            tableName: "packages",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete
        },
    );

    Package.associate = (models) => {
        Package.belongsTo(models.State, {
            foreignKey: "state_id",
            as: "states",
        });
        Package.belongsTo(models.City, {
            foreignKey: "start_city",
            as: "cities",
        });
    };

    return Package;
};
