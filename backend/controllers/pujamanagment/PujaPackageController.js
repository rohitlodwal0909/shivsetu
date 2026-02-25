const db = require("../../models");
const { Puja, PujaPackage } = db;

exports.create = async (req, res) => {
    try {
        const { name, slug, persons, price, description } = req.body;
        const puja = await Puja.findOne({
            where: { slug: slug },
        });

        if (!puja) {
            return res.status(404).json({
                success: false,
                message: "Puja not found",
            });
        }

        let bannerImage = null;

        if (req.files?.image) {
            bannerImage = req.files.image[0].filename;
        }

        const category = await PujaPackage.create({
            user_id: req.admin.id,
            puja_id: puja?.id,
            name,
            price,
            persons,
            description,
            image: bannerImage,
        });

        return res.status(201).json({
            success: true,
            message: "Puja Package created successfully",
            data: category,
        });
    } catch (error) {
        console.error("Create Puja Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { package_name, puja_id, persons, price, description } = req.body;
        const { id } = req.params;

        const pujapackage = await PujaPackage.findByPk(id);

        if (!pujapackage) {
            return res.status(404).json({
                success: false,
                message: "Puja Package not found",
            });
        }

        let bannerImage = pujapackage.image;
        if (req.files?.image?.length) {
            bannerImage = req.files.image[0].filename;
        }

        await pujapackage.update({
            puja_id,
            package_name,
            price,
            persons,
            description,
            image: bannerImage,
        });

        return res.status(200).json({
            success: true,
            message: "Puja Package updated successfully",
        });
    } catch (error) {
        console.error("Update Puja Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.getPujaPackage = async (req, res) => {
    try {
        const pujas = await PujaPackage.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: pujas,
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Puja fetch failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.deletePujaPackage = async (req, res) => {
    try {
        const { id } = req.params;

        const puja = await PujaPackage.findByPk(id);

        if (!puja) {
            return res.status(404).json({
                success: false,
                message: "Puja Package not found",
            });
        }

        await puja.destroy();
        return res.status(200).json({
            success: true,
            message: "Puja Package deleted successfully",
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Puja Package delete failed",
            error: error.original?.message || error.message,
        });
    }
};
