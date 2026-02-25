const { where } = require("sequelize");
const db = require("../../models");
const { State, City } = db;

exports.getState = async (req, res, next) => {
    try {
        const states = await State.findAll();
        res.json(states);
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error.original || error);
        return res.status(500).json({
            message: "State failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.getCity = async (req, res, next) => {
    try {
        const state_id = req.params.stateId;

        const cities = await City.findAll({
            where: {
                state_id: state_id,
            },
        });
        res.json(cities);
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error.original || error);
        return res.status(500).json({
            message: "State failed",
            error: error.original?.message || error.message,
        });
    }
};
