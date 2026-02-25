module.exports = (sequelize, DataTypes) => {
    const Marquee = sequelize.define(
        "Marquee",
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

            text: {
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
            tableName: "marquees",
            timestamps: true,
            underscored: true,
            paranoid: true, // soft delete enabled
        },
    );

    return Marquee;
};
