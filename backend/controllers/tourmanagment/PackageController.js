const db = require("../../models");
const { Package, State, City } = db;

exports.create = async (req, res) => {
    try {
        const {
            package_name,
            tour_type,
            state_id,
            start_city,
            duration_days,
            price,
            max_person,
            start_date,
            end_date,
            inclusions,
            exclusions,
            highlights,
        } = req.body;

        // Banner Image
        let bannerImage = null;
        if (req.files?.banner_image) {
            bannerImage = req.files.banner_image[0].filename;
        }

        // Gallery Images
        let galleryImages = [];
        if (req.files?.gallery) {
            galleryImages = req.files.gallery.map((file) => file.filename);
        }

        const packageData = await Package.create({
            user_id: req.admin.id,
            package_name,
            tour_type,
            state_id,
            start_city,
            duration_days,
            price,
            max_person,
            start_date,
            end_date,
            inclusions,
            exclusions,
            highlights,
            banner_image: bannerImage,
            gallery: galleryImages,
        });

        return res.status(201).json({
            success: true,
            message: "Package created successfully",
            data: packageData,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Package creation failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.getPackage = async (req, res) => {
    try {
        const packages = await Package.findAll({
            include: [
                {
                    model: State,
                    as: "states",
                },
                {
                    model: City,
                    as: "cities",
                },
            ],
        });

        return res.status(201).json({
            success: true,
            packages,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Package find failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Package.destroy({
            where: { id },
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Package deleted successfully",
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Package delete failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            package_name,
            tour_type,
            state_id,
            start_city,
            duration_days,
            price,
            max_person,
            start_date,
            end_date,
            inclusions,
            exclusions,
            highlights,
        } = req.body;

        // 🔎 Find existing package
        const existingPackage = await Package.findByPk(id);

        if (!existingPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        // 🖼 Banner Image (keep old if not uploaded)
        let bannerImage = existingPackage.banner_image;
        if (req.files?.banner_image?.length) {
            bannerImage = req.files.banner_image[0].filename;
        }

        // 🖼 Gallery Images (keep old if not uploaded)
        let galleryImages = existingPackage.gallery || [];
        if (req.files?.gallery?.length) {
            galleryImages = req.files.gallery.map((file) => file.filename);
        }

        // 🔄 Update package
        await existingPackage.update({
            package_name,
            tour_type,
            state_id,
            start_city,
            duration_days,
            price,
            max_person,
            start_date,
            end_date,
            inclusions,
            exclusions,
            highlights,
            banner_image: bannerImage,
            gallery: galleryImages,
        });

        return res.status(200).json({
            success: true,
            message: "Package updated successfully",
            data: existingPackage,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Package update failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.updatestatus = async (req, res) => {
    try {
        const { id } = req.params;

        const existingPackage = await Package.findByPk(id);

        if (!existingPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        await existingPackage.update({
            status: req.body.status,
        });

        return res.status(200).json({
            success: true,
            message: "Package status  successfully",
            data: existingPackage,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Package update failed",
            error: error.original?.message || error.message,
        });
    }
};
