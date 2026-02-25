module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define(
        "State",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            paranoid: true,
            tableName: "states",
            underscored: true,
        }
    );

    return State;
};
