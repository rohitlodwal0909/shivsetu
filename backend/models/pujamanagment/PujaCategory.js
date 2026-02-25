module.exports = (sequelize, DataTypes) => {
    const PujaCategory = sequelize.define(
        "PujaCategory",
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

            slug: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
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
            tableName: "puja_categories",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete
        },
    );

    PujaCategory.associate = (models) => {
        PujaCategory.hasMany(models.Puja, {
            foreignKey: "category_id",
            as: "pujas",
        });
    };

    return PujaCategory;
};
