const db = require("../../models");
const { Blog } = db;

/* ================= CREATE BLOG ================= */
exports.create = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }

        if (!req.files?.image?.length) {
            return res.status(400).json({
                success: false,
                message: "Blog image is required",
            });
        }

        const image = req.files.image[0].filename;

        const blog = await Blog.create({
            user_id: req.admin.id,
            title,
            description,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog,
        });
    } catch (error) {
        console.error("Create Blog Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

/* ================= UPDATE BLOG ================= */
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        let image = blog.image;

        if (req.files?.image?.length) {
            image = req.files.image[0].filename;
        }

        await blog.update({
            title,
            description,
            image,
        });

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error) {
        console.error("Update Blog Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

/* ================= GET BLOGS ================= */
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: blogs,
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Blog fetch failed",
            error: error.original?.message || error.message,
        });
    }
};

/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        await blog.destroy();

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("MYSQL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Blog delete failed",
            error: error.original?.message || error.message,
        });
    }
};
