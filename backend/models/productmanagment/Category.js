module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "Category",
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

            icon: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "Banner image path",
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
            tableName: "categories",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete
        },
    );

    return Category;
};
