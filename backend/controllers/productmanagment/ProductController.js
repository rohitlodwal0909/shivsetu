const db = require("../../models");
const { Product, Category } = db;

function generateSlug(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

exports.create = async (req, res) => {
    try {
        const {
            category_id,
            product_name,
            short_description,
            full_description,
            price,
            mrp,
            discount_percent,
            stock_quantity,
        } = req.body;

        // Banner Image
        let bannerImage = null;
        if (req.files?.image) {
            bannerImage = req.files.image[0].filename;
        }

        // Gallery Images
        let galleryImages = [];
        if (req.files?.gallery) {
            galleryImages = req.files.gallery.map((file) => file.filename);
        }
        
        const slug = generateSlug(product_name);

        const product = await Product.create({
            user_id: req.admin.id,
            category_id,
            slug,
            product_name,
            short_description,
            full_description,
            price,
            mrp,
            discount_percent,
            stock_quantity,
            image: bannerImage,
            gallery: galleryImages,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Product creation failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: "category",
                },
            ],
        });

        return res.status(201).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Products find failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Product.destroy({
            where: { id },
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Product delete failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            category_id,
            product_name,
            short_description,
            full_description,
            price,
            mrp,
            discount_percent,
            stock_quantity,
        } = req.body;

        // 🔎 Find existing package
        const existingProduct = await Product.findByPk(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // 🖼 Banner Image (keep old if not uploaded)
        let bannerImage = existingProduct.image;
        if (req.files?.image?.length) {
            bannerImage = req.files.image[0].filename;
        }

        // 🖼 Gallery Images (keep old if not uploaded)
        let galleryImages = existingProduct.gallery || [];
        if (req.files?.gallery?.length) {
            galleryImages = req.files.gallery.map((file) => file.filename);
        }
        const slug = generateSlug(product_name);

        // 🔄 Update Product
        await existingProduct.update({
            category_id,
            product_name,
            slug,
            short_description,
            full_description,
            price,
            mrp,
            discount_percent,
            stock_quantity,
            image: bannerImage,
            gallery: galleryImages,
        });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: existingProduct,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Product update failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.updatestatus = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProduct = await Product.findByPk(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await existingProduct.update({
            status: req.body.status,
        });

        return res.status(200).json({
            success: true,
            message: "Product status successfully",
            data: existingProduct,
        });
    } catch (error) {
        console.error("🔥 MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Product update failed",
            error: error.original?.message || error.message,
        });
    }
};
