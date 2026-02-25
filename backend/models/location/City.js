module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define(
        "City",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            paranoid: true,
            tableName: "cities",
            underscored: true,
        }
    );

    return City;
};
