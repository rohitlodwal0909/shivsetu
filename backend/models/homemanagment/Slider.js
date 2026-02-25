module.exports = (sequelize, DataTypes) => {
    const Slider = sequelize.define(
        "Slider",
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

            image: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "Slider image path",
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
            tableName: "sliders",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete enabled
        },
    );

    return Slider;
};
