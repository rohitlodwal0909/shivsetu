const db = require("../../models");
const { PujaCategory } = db;

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
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const slug = generateSlug(name);

        const category = await PujaCategory.create({
            user_id: req.admin.id,
            name,
            slug,
            description,
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error) {
        console.error("Create Category Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const category = await PujaCategory.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const slug = name ? generateSlug(name) : category.slug;

        await category.update({
            name,
            slug,
            description,
        });

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
        });
    } catch (error) {
        console.error("Update Category Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const categories = await PujaCategory.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Category fetch failed",
            error: error.original?.message || error.message,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await PujaCategory.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        await category.destroy();
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Category delete failed",
            error: error.original?.message || error.message,
        });
    }
};
