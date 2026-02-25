const db = require("../../models");
const { Slider } = db;

/* ================= CREATE SLIDER ================= */
exports.create = async (req, res) => {
    try {
        if (!req.files?.image?.length) {
            return res.status(400).json({
                success: false,
                message: "Slider image is required",
            });
        }

        const image = req.files.image[0].filename;

        const slider = await Slider.create({
            user_id: req.admin.id,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Slider created successfully",
            data: slider,
        });
    } catch (error) {
        console.error("Create Slider Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

/* ================= UPDATE SLIDER ================= */
exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const slider = await Slider.findByPk(id);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Slider not found",
            });
        }

        let image = slider.image;

        if (req.files?.image?.length) {
            image = req.files.image[0].filename;
        }

        await slider.update({
            image,
        });

        return res.status(200).json({
            success: true,
            message: "Slider updated successfully",
            data: slider,
        });
    } catch (error) {
        console.error("Update Slider Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

/* ================= GET ALL SLIDERS ================= */
exports.getSliders = async (req, res) => {
    try {
        const sliders = await Slider.findAll({
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: sliders,
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Slider fetch failed",
            error: error.original?.message || error.message,
        });
    }
};

/* ================= DELETE SLIDER ================= */
exports.deleteSlider = async (req, res) => {
    try {
        const { id } = req.params;

        const slider = await Slider.findByPk(id);

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Slider not found",
            });
        }

        await slider.destroy(); // soft delete (paranoid true)

        return res.status(200).json({
            success: true,
            message: "Slider deleted successfully",
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Slider delete failed",
            error: error.original?.message || error.message,
        });
    }
};
