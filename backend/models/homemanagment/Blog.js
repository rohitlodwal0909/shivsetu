module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define(
        "Blog",
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

            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
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
            tableName: "blogs",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete enabled
        },
    );

    return Blog;
};
