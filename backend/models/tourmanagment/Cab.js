module.exports = (sequelize, DataTypes) => {
    const Cab = sequelize.define(
        "Cab",
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

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            seating: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "Example: 6+1",
            },

            price_per_km: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },

            ac_type: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "AC / Non-AC",
            },

            music_system: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "Yes / No",
            },

            icon: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "Cab image path",
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
            tableName: "cabs",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete enabled
        },
    );

    Cab.associate = (models) => {
        Cab.belongsTo(models.Admin, {
            foreignKey: "user_id",
            as: "admin",
        });
    };

    return Cab;
};
