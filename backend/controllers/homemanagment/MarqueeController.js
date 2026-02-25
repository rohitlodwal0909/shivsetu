const db = require("../../models");
const { Marquee } = db;

/* ================= CREATE MARQUEE ================= */
exports.create = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Marquee text is required",
            });
        }

        const marquee = await Marquee.create({
            user_id: req.admin.id,
            text,
        });

        return res.status(201).json({
            success: true,
            message: "Marquee created successfully",
            data: marquee,
        });
    } catch (error) {
        console.error("Create Marquee Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

/* ================= UPDATE MARQUEE ================= */
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const marquee = await Marquee.findByPk(id);

        if (!marquee) {
            return res.status(404).json({
                success: false,
                message: "Marquee not found",
            });
        }

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Marquee text is required",
            });
        }

        await marquee.update({
            text,
        });

        return res.status(200).json({
            success: true,
            message: "Marquee updated successfully",
            data: marquee,
        });
    } catch (error) {
        console.error("Update Marquee Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

/* ================= GET ALL MARQUEES ================= */
exports.getMarquees = async (req, res) => {
    try {
        const marquees = await Marquee.findAll({
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: marquees,
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Marquee fetch failed",
            error: error.original?.message || error.message,
        });
    }
};

/* ================= DELETE MARQUEE ================= */
exports.deleteMarquee = async (req, res) => {
    try {
        const { id } = req.params;

        const marquee = await Marquee.findByPk(id);

        if (!marquee) {
            return res.status(404).json({
                success: false,
                message: "Marquee not found",
            });
        }

        await marquee.destroy();

        return res.status(200).json({
            success: true,
            message: "Marquee deleted successfully",
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Marquee delete failed",
            error: error.original?.message || error.message,
        });
    }
};
