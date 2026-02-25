const db = require("../../models");
const { Marquee, Slider, Category, Product, Cab, Blog, Puja, PujaCategory } =
    db;

/* ================= GET Marquee ================= */

exports.getMarquee = async (req, res) => {
    try {
        const marquee = await Marquee.findAll({
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: marquee,
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

exports.getAllHomedata = async (req, res) => {
    try {
        const sliders = await Slider.findAll({
            attributes: ["id", "image"],
            order: [["created_at", "DESC"]],
        });

        const categories = await Category.findAll({
            attributes: ["id", "name", "icon", "slug", "description"],
            order: [["created_at", "DESC"]],
        });

        const products = await Product.findAll({
            order: [["created_at", "DESC"]],
        });

        const cabs = await Cab.findAll({
            order: [["created_at", "DESC"]],
        });

        const blogs = await Blog.findAll({
            order: [["created_at", "DESC"]],
        });

        const pujas = await Puja.findAll({
            include: [{ model: PujaCategory, as: "puja_category" }],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            sliders: sliders,
            categories: categories,
            products: products,
            cabs: cabs,
            blogs: blogs,
            pujas: pujas,
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
