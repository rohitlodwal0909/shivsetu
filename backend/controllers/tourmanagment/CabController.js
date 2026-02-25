const db = require("../../models");
const { Cab } = db;

/* ================= CREATE CAB ================= */
exports.createCab = async (req, res) => {
    try {
        const { name, seating, price_per_km, ac_type, music_system } = req.body;

        let iconImage = null;
        if (req.files?.icon?.length) {
            iconImage = req.files.icon[0].filename;
        }

        const cabData = await Cab.create({
            user_id: req.admin.id,
            name,
            seating,
            price_per_km,
            ac_type,
            music_system,
            icon: iconImage,
            status: 1,
        });

        return res.status(201).json({
            success: true,
            message: "Cab created successfully",
            data: cabData,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Cab creation failed",
            error: error.original?.message || error.message,
        });
    }
};

/* ================= GET ALL CABS ================= */
exports.getCab = async (req, res) => {
    try {
        const cabs = await Cab.findAll({
            order: [["id", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            cabs,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Cab fetch failed",
            error: error.original?.message || error.message,
        });
    }
};

/* ================= DELETE CAB ================= */
exports.deleteCab = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Cab.destroy({
            where: { id },
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Cab not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cab deleted successfully",
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Cab delete failed",
            error: error.original?.message || error.message,
        });
    }
};

/* ================= UPDATE CAB ================= */
exports.updateCab = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCab = await Cab.findByPk(id);

        if (!existingCab) {
            return res.status(404).json({
                success: false,
                message: "Cab not found",
            });
        }

        const { name, seating, price_per_km, ac_type, music_system } = req.body;

        let iconImage = existingCab.icon;
        if (req.files?.icon?.length) {
            iconImage = req.files.icon[0].filename;
        }

        await existingCab.update({
            name,
            seating,
            price_per_km,
            ac_type,
            music_system,
            icon: iconImage,
        });

        return res.status(200).json({
            success: true,
            message: "Cab updated successfully",
            data: existingCab,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Cab update failed",
            error: error.original?.message || error.message,
        });
    }
};

/* ================= UPDATE CAB STATUS ================= */
exports.updateCabStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCab = await Cab.findByPk(id);

        if (!existingCab) {
            return res.status(404).json({
                success: false,
                message: "Cab not found",
            });
        }

        await existingCab.update({
            status: req.body.status,
        });

        return res.status(200).json({
            success: true,
            message: "Cab status updated successfully",
            data: existingCab,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Cab status update failed",
            error: error.original?.message || error.message,
        });
    }
};
