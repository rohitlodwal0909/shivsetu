const db = require("../../models");
const { Product, Category } = db;

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
