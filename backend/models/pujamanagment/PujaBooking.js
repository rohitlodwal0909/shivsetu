module.exports = (sequelize, DataTypes) => {
    const PujaBooking = sequelize.define(
        "PujaBooking",
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

            puja_package_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            mobile_no: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            gotra: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            rashi: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },

            payment_status: {
                type: DataTypes.ENUM("pending", "success", "failed"),
                defaultValue: "pending",
            },

            payment_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "puja_bookings",
            timestamps: true,
            underscored: true,
            paranoid: true, // enables deleted_at
        },
    );

    return PujaBooking;
};
