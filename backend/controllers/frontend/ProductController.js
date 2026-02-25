const { where } = require("sequelize");
const db = require("../../models");
const { Product, Category } = db;

/* ================= GET Marquee ================= */

exports.getProducts = async (req, res) => {
    try {
        const category = await Category.findAll({
            order: [["created_at", "DESC"]],
        });

        const products = await Product.findAll({
            include: [{ model: Category, as: "category" }],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            category: category,
            products: products,
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Product fetch failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.getProductWithSlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const product = await Product.findOne({
            where: { slug: slug },
            include: [{ model: Category, as: "category" }],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            product: product,
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Product fetch failed",
            error: error.original?.message || error.message,
        });
    }
};
